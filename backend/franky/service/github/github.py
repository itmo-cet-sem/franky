import json
import os
from datetime import datetime, timedelta
from typing import Optional, List

import jwt
import requests

from model import UserData
from model.project import ProjectData
from service import Service


class GitHubException(RuntimeError):
    pass


class GitHub(Service):

    def __init__(self, rest_endpoint='https://api.github.com', graphql_endpoint='https://api.github.com/graphql',
                 app_id=None, installation_id=None, private_path=None):
        """
        GitHub integrated service.

        :param rest_endpoint: GitHub REST API endpoint.
        :param graphql_endpoint: GitHub GraphQL API endpoint.
        :param app_id: Associated GitHub App id.
        :param installation_id: Associated GitHub App installation id.
        :param private_path: Associated GitHub App private key path.
        """
        self._rest_endpoint = rest_endpoint
        self._graphql_endpoint = graphql_endpoint
        self._app_id = app_id or os.environ['GITHUB_APP_ID']
        self._installation_id = installation_id or os.environ['GITHUB_INSTALLATION']
        self._private_path = private_path or os.environ['GITHUB_PRIVATE_PATH']
        self._token = None
        self._page_size = 100
        self._date_format = '%Y-%m-%dT%H:%M:%SZ'
        self._active_projects_period = timedelta(weeks=2)

    def user(self, username) -> Optional[UserData]:
        cursor = None
        datas = []
        while True:
            request_payload = {
                'query': '''
                    query { 
                      user(login: "%(user_name)s") {
                        name
                        login
                        repositories(after: %(cursor)s, first: %(page_size)s) {
                          pageInfo {
                            endCursor
                          }
                          nodes {
                            languages(first: %(page_size)s) {
                              edges {
                                size
                              }
                              nodes {
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                ''' % {
                    'user_name': username,
                    'cursor': ('\"%s\"' % cursor) if cursor else 'null',
                    'page_size': self._page_size
                }
            }
            response_data = self._call(request_payload)
            response_user = response_data['user']
            login = response_user['login']
            name = response_user['name']
            languages = {}
            for repository_node in response_user['repositories']['nodes']:
                languages_node = repository_node['languages']
                for index, language_node in enumerate(languages_node['nodes']):
                    language_name = language_node['name']
                    bytes_of_code = int(languages_node['edges'][index]['size'])
                    languages[language_name] = languages.get(language_name, 0) + bytes_of_code
            datas.append(UserData(login=login, name=name, tags=languages))
            cursor = response_user['repositories']['pageInfo']['endCursor']
            if not cursor:
                break
        if datas:
            all_tags = {}
            for data in datas:
                for tag, bytes_of_code in data.tags.items():
                    all_tags[tag] = all_tags.get(tag, 0) + bytes_of_code
            total_bytes = sum(all_tags.values())
            tags = {tag: bytes_of_code / total_bytes for tag, bytes_of_code in all_tags.items()}
            return UserData(login=datas[0].login, name=datas[0].name, tags=tags)
        else:
            return None

    def projects(self, username: str) -> List[ProjectData]:
        cursor = None
        datas = []
        while True:
            request_payload = {
                'query': '''
                    query { 
                      user(login: "%(user_name)s") {
                        repositories(after: %(cursor)s, first: %(page_size)s) {
                          pageInfo {
                            endCursor
                          }
                          nodes {
                            name
                            createdAt
                            pushedAt
                            languages(first: %(page_size)s) {
                              nodes {
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                ''' % {
                    'user_name': username,
                    'cursor': ('\"%s\"' % cursor) if cursor else 'null',
                    'page_size': self._page_size
                }
            }
            response_data = self._call(request_payload)
            response_user = response_data['user']
            repositories = response_user['repositories']['nodes']
            for repository in repositories:
                raw_creation_date = repository['createdAt']
                raw_latest_push_date = repository['pushedAt']
                latest_push_date = self._parse_datetime(raw_latest_push_date)
                if latest_push_date + self._active_projects_period > datetime.utcnow():
                    raw_latest_push_date = None
                tags = list(set(language['name'] for language in repository['languages']['nodes']))
                datas.append(ProjectData(name=repository['name'], start=raw_creation_date, end=raw_latest_push_date,
                                         tags=tags))
            cursor = response_user['repositories']['pageInfo']['endCursor']
            if not cursor:
                break
        return datas

    def _parse_datetime(self, datetime_string) -> datetime:
        return datetime.strptime(datetime_string, self._date_format)

    def _call(self, request_payload) -> dict:
        response_json = self._call_graphql(request_payload)
        if 'errors' in response_json:
            raise GitHubException('GraphQL call ended up in an error: %s'
                                  % json.dumps(response_json['errors'], indent=4))
        if 'data' not in response_json:
            raise GitHubException('GraphQL response does not have a body: %s'
                                  % json.dumps(response_json, indent=4))
        return response_json['data']

    def _call_graphql(self, data) -> dict:
        response = requests.post(self._graphql_endpoint, data=json.dumps(data), headers=self._headers())
        return response.json()

    def _headers(self) -> dict:
        return {'Authorization': 'bearer %s' % self.token}

    @property
    def token(self) -> str:
        if not self._token:
            self._token = self._generate_token()
        return self._token

    def _generate_token(self) -> str:
        jwt_token = self._generate_jwt()
        response = requests.post(
            '%s/app/installations/%s/access_tokens' % (self._rest_endpoint, self._installation_id),
            headers={
                'Authorization': 'Bearer %s' % jwt_token,
                'Accept': 'application/vnd.github.machine-man-preview+json'
            })
        return response.json()['token']

    def _generate_jwt(self) -> str:
        jwt_payload = {
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(minutes=5),
            'iss': self._app_id
        }
        private_key = self._read_private_key()
        encoded_jwt = jwt.encode(jwt_payload, private_key, algorithm='RS256')
        return str(encoded_jwt, encoding='utf-8')

    def _read_private_key(self) -> str:
        with open(self._private_path) as f:
            return ''.join(f.readlines())
