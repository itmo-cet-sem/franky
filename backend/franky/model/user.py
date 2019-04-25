from typing import Optional, List


class UserData:

    def __init__(self, login: str, name: Optional[str], tags: List[str]):
        """
        User metadata.

        :param login: Unique user login. Such as john_johnson.
        :param name: Non unique user name. Such as John Johnson.
        :param tags: A list of languages and tags that user is associated with.
        """
        self.login = login
        self.name = name
        self.tags = tags or []
