import json
import os
from datetime import datetime, timedelta

import jwt
import requests

from model import UserData
from service import Service


class GitHub(Service):

    def __init__(self, rest_endpoint='https://api.github.com', graphql_endpoint='https://api.github.com/graphql',
                 app_id=None, installation_id=None, private_path=None):
        self._rest_endpoint = rest_endpoint
        self._graphql_endpoint = graphql_endpoint
        self._app_id = app_id or os.environ['GITHUB_APP_ID']
        self._installation_id = installation_id or os.environ['GITHUB_INSTALLATION']
        self._private_path = private_path or os.environ['GITHUB_PRIVATE_PATH']
        self._token = None

    def user(self, user_name) -> UserData:
        request_payload = {
            'query': '''
                query { 
                  user(login: "%s") {
                    name
                    login
                    repositories(last: 10) {
                      nodes {
                        languages(last: 10) {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
            ''' % user_name
        }
        response_json = self._call_graphql(request_payload)
        response_user = response_json['data']['user']
        login = response_user.get('login')
        name = response_user.get('name')
        languages = list(set(language['name']
                             for repository in response_user['repositories']['nodes']
                             for language in repository['languages']['nodes']))
        return UserData(login=login, name=name, languages=languages)

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
