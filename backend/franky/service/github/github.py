import json
import operator
import os
from datetime import datetime, timedelta
from functools import reduce
from typing import Optional

import jwt
import requests

from model import UserData
from service import Service


class GitHubException(RuntimeError):
    pass


class GitHub(Service):

    def __init__(self, rest_endpoint='https://api.github.com', graphql_endpoint='https://api.github.com/graphql',
                 app_id=None, installation_id=None, private_path=None):
        self._rest_endpoint = rest_endpoint
        self._graphql_endpoint = graphql_endpoint
        self._app_id = app_id or os.environ['GITHUB_APP_ID']
        self._installation_id = installation_id or os.environ['GITHUB_INSTALLATION']
        self._private_path = private_path or os.environ['GITHUB_PRIVATE_PATH']
        self._token = None

    def user(self, user_name) -> Optional[UserData]:
        cursor = None
        page_size = 10
        datas = []
        while True:
            request_payload = {
                'query': '''
                    query { 
                      user(login: "%(user_name)s") {
                        name
                        login
                        repositories(after: %(cursor)s, first: %(page_size)s) {
                          totalCount
                          pageInfo {
                            endCursor
                          }
                          nodes {
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
                    'user_name': user_name,
                    'cursor': ('\"%s\"' % cursor) if cursor else 'null',
                    'page_size': page_size
                }
            }
            response_data = self._call(request_payload)
            response_user = response_data['user']
            login = response_user['login']
            name = response_user['name']
            languages = list(set(language['name']
                                 for repository in response_user['repositories']['nodes']
                                 for language in repository['languages']['nodes']))
            datas.append(UserData(login=login, name=name, languages=languages))
            cursor = response_user['repositories']['pageInfo']['endCursor']
            if not cursor:
                break
        if datas:
            languages = reduce(operator.add, [data.languages for data in datas])
            return UserData(login=datas[0].login, name=datas[0].name, languages=languages)
        else:
            return None

    def _call(self, request_payload):
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
        return self._token or self._generate_token()

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
