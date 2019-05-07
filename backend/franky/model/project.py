from typing import List, Optional


class ProjectData:

    def __init__(self, name: str, start: Optional[str], end: Optional[str], tags: List[str],
                 url: str, size: Optional[int], pull_count: Optional[int], star_count: Optional[int]):
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
        self.size = size or None
        self.pull_count = pull_count or None
        self.star_count = star_count or None
