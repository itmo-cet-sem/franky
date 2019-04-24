from typing import Optional, List


class UserData:

    def __init__(self, login: str, name: Optional[str], languages: List[str]):
        self.login = login
        self.name = name
        self.languages = languages
