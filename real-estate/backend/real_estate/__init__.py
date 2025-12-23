from django import setup
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'real_estate.settings')
django.setup()

