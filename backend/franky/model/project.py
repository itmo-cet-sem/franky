from typing import List, Optional


class ProjectData:

    def __init__(self, name: str, start: str, end: Optional[str], tags: List[str], url: str):
        """
        User project data.

        :param name: Project name.
        :param start: Project start date.
        :param end: Project end date.
        :param url: Url to project
        :param tags: A list of tags that project is associated with.
        """
        self.name = name
        self.start = start
        self.end = end
        self.url = url
        self.tags = tags or []
