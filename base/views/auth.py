from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User


def sign_in(request):
    type = 'Sign In'
    
    if request.user.is_authenticated:
      return redirect('base:index')
  
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
      
        try: 
            user = User.objects.get(username=username)
            
        except:
            messages.error(request, 'Username or password incorrect')
            
        user = authenticate(username=username, password=password)
            
        if user is not None:
            login(request, user)
            return redirect('base:index')
            

    return render(request, 'base/auth.html', {
      'page_type': type
    })
         
def sign_up(request):
    type = 'Sign Up'
    
    if request.user.is_authenticated:
      return redirect('base:index')
  
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
      
        try: 
            user = User.objects.get(username=username)
            
            messages.error(request, 'Username already in use')
            return redirect('base:sign-in')
        except:
            user = User.objects.create(
              username = username,
              email = '',
              password = make_password(password)   
            )
            
            if user:
              login(request, user)
              return redirect('base:index')
            
    return render(request, 'base/auth.html', {
      'page_type': type
    })
       
@login_required(login_url='base:sign-in')
def sign_out(request):
   logout(request)
   return redirect('base:sign-in')