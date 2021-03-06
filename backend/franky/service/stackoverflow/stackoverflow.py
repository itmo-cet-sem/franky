import operator
from typing import Dict, List
from urllib.parse import urljoin
from functools import reduce

import requests

from model import UserData
from service import Service


class StackoverflowServiceException(Exception):
    pass


class StackOverflow(Service):

    def __init__(self, rest_endpoint='https://api.stackexchange.com/2.2'):
        self._rest_endpoint = rest_endpoint
        self._service_name = 'stackoverflow'
        self._user_url = 'users'
        self._tags_url = 'tags'

    def user(self, user_name: str) -> UserData:
        user_id = self._get_user_id(user_name)
        user_tags = self._get_user_tags(user_id)
        user = UserData(login=user_id, name=user_name, tags=user_tags)
        return user

    def projects(self, user_name: str):
        pass

    def _get_user_id(self, user_name: str) -> str:
        payload = {'inname': user_name}
        response_data = self._call(self._user_url, payload)
        try:
            data = response_data['items']
        except KeyError:
            raise StackoverflowServiceException('User not found')

        if len(data) >= 1:
            user_id = self._get_unique_user(data, user_name)
        else:
            raise StackoverflowServiceException('User not found')
        return str(user_id)

    def _get_user_tags(self, user_id: str) -> Dict:
        payload = {'order': 'desc', 'sort': 'popular'}
        request_url = f'{self._user_url}/{user_id}/{self._tags_url}'
        response_data = self._call(request_url, payload)
        if len(response_data['items']) == 0:
            tags = {}
        else:
            tags = self._calculate_tags_weight(response_data['items'])
        return tags

    def _calculate_tags_weight(self, response_data: List) -> Dict:
        sum_tags = reduce(operator.add, [tag['count'] for tag in response_data])
        tags = {tag['name']: tag['count'] / sum_tags for tag in response_data}
        return tags

    def _call(self, request_url: str, payload: Dict) -> Dict:
        url = urljoin(self._rest_endpoint, request_url)
        full_payload = dict(payload)
        full_payload['site'] = self._service_name
        response = requests.get(url, full_payload)
        return response.json()

    def _get_unique_user(self, data: List, user_name: str) -> int:
        uid = [u['user_id'] for u in data if u['display_name'] == user_name]
        if uid:
            return uid[0]
        else:
            raise StackoverflowServiceException('User not found')
