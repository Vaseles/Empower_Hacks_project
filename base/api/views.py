from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

import json

from ..models import Project

@csrf_exempt
def project_list_create(request):
    if request.method == 'GET':
        projects = Project.objects.filter(user=request.user)
        
        print(projects)
        data = [{
                'id': project.id, 
                'title': project.title, 
                'user': project.user.username,
                'content': project.content,
                'is_pinned': project.is_pinned,
                
                'created': project.created,
                'updated': project.updated,
            } for project in projects]
        
        return JsonResponse(data, safe=False, status=200)
        
    if request.method == 'POST':
        title = request.POST.get('title')
        
        project = Project.objects.create(
            title = title,
            user = request.user,
            content = '',
            is_pinned = False,
        )
        
        return JsonResponse({
            'status': 'success',
        }, status=201)
        

@csrf_exempt
def project_get_update(request, id):
    project = Project.objects.get(id=id)
    
    if request.method == 'GET':
        return JsonResponse({
            'id': project.id,
            'title': project.title,
            'user': project.user.username,
            'content': project.content,
        }, status=200)
    elif request.method == 'POST':
        title = request.POST.get('title')
        
        project.title = title
        project.save()
        return JsonResponse({
            'status': 'success',
        }, status=200)
    
@csrf_exempt
def project_content(request, id):
    project = Project.objects.get(id=id)
    
    if request.method == 'GET':
        return JsonResponse({
            'content': project.content
        }, status=200)
        
    if request.method == 'POST':
        print(request)
        
        content_data = json.loads(request.body.decode('utf-8'))
        project.content = content_data
        project.save()
        
        return JsonResponse({
            'status': 'success',
            'content': project.content
        }, status=200)
        
@csrf_exempt
def project_delete(request, id):
    project = Project.objects.get(id=id)
    
    if request.method == 'POST':
        project.delete()
        return JsonResponse({
            'status': 'success',
        }, status=200)