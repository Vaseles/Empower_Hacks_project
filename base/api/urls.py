from django.urls import path
from . import views

urlpatterns = [
    path('projects', views.project_list_create, name='project-list-create'),
    
    path('projects/<str:id>', views.project_get_update, name='project-get-update'),
    path('projects/<str:id>/content', views.project_content, name='project-content'),
    path('projects/<str:id>/delete', views.project_delete, name='project-delete'),
]
