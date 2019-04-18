from typing import Dict, List
from urllib.parse import urljoin

import requests

from model import UserData
from service import Service


class StackOverflow(Service):

    def __init__(self):
        self._rest_endpoint = 'https://api.stackexchange.com/2.2'
        self._service_name = 'stackoverflow'
        self._user_url = 'users'
        self._tags_url = 'tags'

    def user(self, user_name):
        user_id = self._get_user_id(user_name)
        user_tags = self._get_user_tags(user_id)
        user = UserData(login=user_id, name=user_name, tags=user_tags)
        return user

    def _get_user_id(self, user_name) -> str:
        payload = {'inname': user_name}
        response_data = self._call(self._user_url, payload)
        user_id = response_data['items'][0]['user_id']

        if len(response_data['items']) > 1:
            raise Exception('Username is not unique!')
        return str(user_id)

    def _get_user_tags(self, user_id: str) -> List:
        payload = {'order': 'desc', 'sort': 'popular'}
        request_url = f'{self._user_url}/{user_id}/{self._tags_url}'
        response_data = self._call(request_url, payload)
        tags = response_data['items']
        tags_name = [tag['name'] for tag in tags]
        return tags_name

    def _call(self, request_url: str, payload: Dict) -> Dict:
        url = urljoin(self._rest_endpoint, request_url)
        payload['site'] = self._service_name
        response = requests.get(url, payload)
        return response.json()
