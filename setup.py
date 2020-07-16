from setuptools import setup, find_packages
from django_monaco_editor import (__VERSION__, __AUTHOR__, __AUTHOR_EMAIL__)


def get_long_description():
    with open('README.md', 'r') as f:
        long_description = f.read()
    return long_description


def get_install_requires():
    with open('requirements.txt', 'r') as f:
        install_requires = f.readlines()
    return install_requires


setup(
    name='django-monaco-editor',
    version=__VERSION__,
    author=__AUTHOR__,
    author_email=__AUTHOR_EMAIL__,
    license='MIT',
    description='A extra widget for django',
    long_description=get_long_description(),
    long_description_content_type='text/markdown',
    packages=find_packages(exclude=['demo']),
    include_package_data=True,

    url='https://github.com/noteby/django-monaco-editor',
    keywords=['django monaco editor', 'monaco editor', 'django widget', 'django markdown'],
    install_requires=get_install_requires(),
    classifiers=[
        'Framework :: Django :: 3.0',
        'Operating System :: OS Independent',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3',
    ],
)
