from abc import ABC, abstractmethod
from typing import Optional, List

from model import UserData
from model.project import ProjectData


class Service(ABC):
    """
    Common abstract class for all Franky integrated service which can be used to aggregate different user profile data.
    """

    @abstractmethod
    def user(self, username: str) -> Optional[UserData]:
        """
        Returns a user metadata.

        :param username: User to get data for.
        :return: User metadata.
        """
        pass

    @abstractmethod
    def projects(self, username: str) -> List[ProjectData]:
        """
        Returns a list of user projects.

        :param username: User to list projects for.
        :return: A list of user projects.
        """
        pass
