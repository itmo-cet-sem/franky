import json
import requests

from model.user import UserData
from model.project import ProjectData
from service import Service


class DockerHubException(Exception):
    pass


class DockerHub(Service):

    def __init__(self, url = None, version = 'v2'):
        self._version = version
        self._url = '%s/%s' % (url or 'https://hub.docker.com', self.version)
        self._session = requests.Session()
        self._token = None

    def user(self, user_name: str) -> UserData:
        user_id = self._get_user_id(user_name)
        user_tags = {}
        return UserData(login=user_id, name=user_name, tags=user_tags)

    def _api_url(self, path):
        return '%s/%s/' % (self._url, path)

    @property
    def version(self):
        return self._version