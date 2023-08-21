from django.urls import path
from .views import auth, index, user

app_name = 'base'

urlpatterns = [
    path('sign-in', auth.sign_in, name='sign-in'),
    path('sign-up', auth.sign_up, name='sign-up'),
    path('sign-out', auth.sign_out, name='sign-out'),
    
    path('', index.index, name='index'),
    path('projects/<str:id>', index.constructor, name='constructor'),
    
    path('settings', user.update, name='update'),
    path('delete-account', user.delete_account, name='delete-account'),
]
