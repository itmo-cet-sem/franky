from typing import Optional, Dict


class UserData:


    def __init__(self, login: str, name: Optional[str], tags: Dict[str, str]):
        """
        User metadata.

        :param login: Unique user login. Such as john_johnson.
        :param name: Non unique user name. Such as John Johnson.
        :param tags: User tag probabilities dictionary.
        """
        self.login = login
        self.name = name
        self.tags = tags or {}
