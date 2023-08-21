from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    title = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE )
    content = models.JSONField(default=None)
    is_pinned = models.BooleanField(default=False)
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title