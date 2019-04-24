from typing import Optional, List


class UserData:

    def __init__(self, login: str, name: Optional[str], languages: List[str]):
        """
        User metadata.

        :param login: Unique user login. Such as john_johnson.
        :param name: Non unique user name. Such as John Johnson.
        :param languages: A list of languages that user is associated with.
        """
        self.login = login
        self.name = name
        self.languages = languages or []
