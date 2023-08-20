from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash

from django.contrib.auth.models import User

@login_required(login_url='base:sign-in')
def update(request):
    type = 'Update Profile'
    user = request.user
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if password != '' and len(password) >= 8:
            user.password = make_password(password)
            update_session_auth_hash(request, user)
        
        if username != '' and username != user.username:
            try:
                user = User.objects.get(username=username)
                messages.error(request, 'Username already in use')
                return redirect('/settings')
            except:
                user.username = username
            
        user.save()
        
        messages.success(request, 'User updated successfully')
        return redirect('base:index')
    
    return render(request, 'base/settings.html', {
      'type': type
    })
    
@login_required(login_url='base:sign-in')
def delete_account(request):
    type = 'Delete Account'
    user = request.user
    
    if request.method == 'POST':
        user.delete()
        
        messages.success(request, 'User deleted successfully')
        return redirect('base:sign-in')
    
    return render(request, 'base/settings.html', {
      'type': type
    })