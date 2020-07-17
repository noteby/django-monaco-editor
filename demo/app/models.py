from django.db import models
from django_monaco_editor.models import MonacoEditorModelField


# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=16)
    content = MonacoEditorModelField()
