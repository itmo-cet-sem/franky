import json


from model.user import UserData
from model.project import ProjectData
from service import Service


class DockerHub(Service):

    def __init__(self, rest_endpoint = 'https://hub.docker.com'):
        '''

        '''