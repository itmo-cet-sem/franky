import logging
from urllib.parse import urljoin
from typing import Optional, List, Dict
from datetime import datetime, timedelta

import requests

from model.user import UserData
from model.project import ProjectData
from service import Service


class DockerHubException(Exception):
    pass


def user_cleaner(username: str) -> str:
    """
    Makes username lowercase

    :param username: user login
    :return: cleaned username
    """
    return username.lower()


class DockerHub(Service):

    def __init__(self, rest_endpoint='https://hub.docker.com'):
        self._version = 'v2'
        self._rest_endpoint = rest_endpoint
        self._url = '%s/%s' % (self._rest_endpoint, self._version)
        self._user_url = 'users'
        self._tag_url = 'tags'
        self._repository_url = 'repositories'
        self._tag_indexes = ['os', 'architecture']
        self._date_format = '%Y-%m-%dT%H:%M:%S.%fZ'
        self._active_projects_period = timedelta(weeks=2)
        self._page_size = 25

    def user(self, username: str) -> UserData:
        login = user_cleaner(username)
        full_name = self._get_user_full_name(username)
        tags = self._get_user_tags(username)
        return UserData(login=login, name=full_name, tags=tags)

    def _get_user_full_name(self, username) -> str:
        username = user_cleaner(username)
        request_url = self._api_url('%s/%s' % (self._user_url, username))
        response_data = self._call(request_url)
        return response_data['full_name']

    def _get_user_tags(self, username: str) -> Dict:
        username = user_cleaner(username)
        request_url = self._api_url('%s/%s' % (self._repository_url, username))
        payload = {'page': 1}
        all_tags = {}
        while True:
            response_data = self._call(request_url, payload)
            repositories = response_data['results']
            for repository in repositories:
                image_name = repository['name']
                tags = self._get_tags(username, image_name)
                if tags:
                    for tag, byte_of_code in tags.items():
                        all_tags[tag] = all_tags.get(tag, 0) + byte_of_code
            if not response_data['next']:
                break
            else:
                payload['page'] += 1
        total_bytes = sum(all_tags.values())
        return {tag: byte_of_code / total_bytes for tag, byte_of_code in all_tags.items()}

    def _get_tags(self, username, image_name: str) -> Optional[Dict]:
        request_url = self._api_url('%s/%s/%s/%s' % (self._repository_url, username, image_name, self._tag_url))
        payload = {'page': 1}
        tags = {}
        while True:
            response_data = self._call(request_url, payload)
            results = response_data['results']
            for result in results:
                images = result['images']
                for image in images:
                    for index in self._tag_indexes:
                        if index in image and image[index]:
                            tag = image[index]
                            tags[tag] = tags.get(tag, 0) + 1
            if not response_data['next']:
                break
            else:
                payload['page'] += 1
        return tags

    def projects(self, username: str) -> List[ProjectData]:
        username = user_cleaner(username)
        request_url = self._api_url('%s/%s' % (self._repository_url, username))
        payload = {'page': 1}
        datas = []
        while True:
            response_data = self._call(request_url, payload)
            repositories = response_data['results']
            for repository in repositories:
                image_name = repository['name']
                image = self._get_image(username, image_name)
                raw_creation_date = size = tags = None
                if image:
                    raw_creation_date = image['creation_date']
                    size = image['size']
                    tags = list(image['tags'])
                raw_latest_push_date = repository['last_updated']
                if not raw_latest_push_date:
                    logging.warn('Empty repository "%s" is skipped for "%s" user.' % (image_name, username))
                    continue
                latest_push_date = self._parse_datetime(raw_latest_push_date)
                if latest_push_date + self._active_projects_period > datetime.utcnow():
                    raw_latest_push_date = None
                downloads = repository['pull_count']
                stars = repository['star_count']
                url_to_repository = self._get_url_repository(username, image_name)
                datas.append(
                    ProjectData(name=image_name, start=raw_creation_date, end=raw_latest_push_date, tags=tags,
                                url=url_to_repository, size=size, pull_count=downloads, star_count=stars))
            if not response_data['next']:
                break
            else:
                payload['page'] += 1
        return datas

    def _get_image(self, username, image_name: str) -> Dict:
        request_url = self._api_url('%s/%s/%s/%s' % (self._repository_url, username, image_name, self._tag_url))
        payload = {'page': 1}
        datas = []
        tags_list = set()
        while True:
            response_data = self._call(request_url, payload)
            results = response_data['results']
            for result in results:
                images = result['images']
                for image in images:
                    for index in self._tag_indexes:
                        if index in image and image[index]:
                            tags_list.add(image[index])
                datas.append({'last_updated': result['last_updated'], 'size': result['full_size']})
            if not response_data['next']:
                break
            else:
                payload['page'] += 1
        return {'creation_date': datas[-1]['last_updated'], 'size': datas[0]['size'], 'tags': tags_list}

    def _call(self, request_url: str, payload=None) -> dict:
        try:
            url = urljoin(self._url, request_url)
            if payload is None:
                payload = dict()
            else:
                payload['page_size'] = self._page_size
                payload['ordering'] = 'last_updated'
            response = requests.get(url, payload)
        except requests.exceptions.Timeout as e:
            raise DockerHubException('Connection Timeout. Download failed: %s' % e)
        except requests.exceptions.RequestException as e:
            raise DockerHubException('Connection Error. Download failed: %s' % e)
        else:
            try:
                response.raise_for_status()
            except requests.exceptions.HTTPError as e:
                raise DockerHubException(e)
            return response.json()

    def _get_url_repository(self, username: str, image_name: str) -> str:
        return '%s/r/%s/%s/' % (self._rest_endpoint, username, image_name)

    def _api_url(self, path: str) -> str:
        return '%s/%s/' % (self._url, path)

    def _parse_datetime(self, datetime_string) -> datetime:
        return datetime.strptime(datetime_string, self._date_format)
