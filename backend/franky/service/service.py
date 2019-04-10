from abc import ABC, abstractmethod

from model import UserData


class Service(ABC):

    @abstractmethod
    def user(self, username: str) -> UserData:
        pass
