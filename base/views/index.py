from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

from ..models import Project


@login_required(login_url='base:sign-in')
def index(request):
    projects = Project.objects.filter(user=request.user).order_by('-created')
    
    return render(request, 'base/index.html', {
        'projects': projects,
    } )
    