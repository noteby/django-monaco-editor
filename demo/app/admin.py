from django.db import models
from django.contrib import admin
from django_monaco_editor.widgets import AdminMonacoEditorWidget
from .models import Post


# Register your models here.

@admin.register(Post)
class PostModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminMonacoEditorWidget}
    }
