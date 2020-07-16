from django import forms
from django.contrib.admin import widgets
from django.template.loader import get_template


class MonacoEditorWidget(forms.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        custom_template = 'django-monaco-editor/editor.html'
        ace_attrs = {
            'use-monaco-editor': 'true',
        }
        attrs = self.build_attrs(attrs, ace_attrs)
        textarea_widget = super(MonacoEditorWidget, self).render(name, value, attrs, renderer)
        template = get_template(custom_template)
        return template.render({'textarea_widget': textarea_widget})

    class Media:
        css = {
            'all': (
                'external/css/github-markdown.css',
                'django_monaco_editor/css/editor.css',
            ),
        }

        js = (
            'external/js/marked.min.js',
            'external/monaco-editor/min/vs/loader.js',
            'django_monaco_editor/js/editor.js',
        )


class AdminMonacoEditorWidget(MonacoEditorWidget, widgets.AdminTextareaWidget):
    pass
