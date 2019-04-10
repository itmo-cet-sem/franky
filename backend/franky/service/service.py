from abc import ABC, abstractmethod
from typing import Optional

from model import UserData


class Service(ABC):

    @abstractmethod
    def user(self, username: str) -> Optional[UserData]:
        pass
