from django.test import TestCase
from ..models import Project

# class ProjectModelTestCase(TestCase):
#     def test_project_creation(self):
#         project = Project.objects.create(
#             title="Test Project",
#             user='null',
#             content=None,
#             is_pinned=False
#         )
#         self.assertEqual(project.title, "Test Project")