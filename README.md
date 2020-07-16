# django-monaco-editor

## Features
- Integrated with monaco-editor

- Integrated with marked.js 

- Github-style markdown

- Support markdown live preview and shortcuts

  
## Requirements
- Django>=3.0


## Usage
**Installed Apps**
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #
    'django_monaco_editor',
    'app',
]

```

**Admin**
```python
from django.db import models
from django.contrib import admin
from django_monaco_editor.widgets import AdminMonacoEditorWidget
from app.models import AppModel

# Register your models here.

@admin.register(Post)
class AppModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminMonacoEditorWidget}
    }

```

**Model**
```python
from django.db import models
from django_monaco_editor.models import MonacoEditorModelField


# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=16)
    content = MonacoEditorModelField()

```