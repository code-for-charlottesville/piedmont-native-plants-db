import os
import shutil
import subprocess

from django.core.management import BaseCommand
from rest_framework.utils.formatting import dedent

from ._settings import *


class Command(BaseCommand):
    help = dedent(f'''
        Generates an OpenAPI client according to the following specifications:
            * Client Location: "{API_CLIENT_URL}"
            * Schema: "{API_SCHEMA_URL}"
            * Config: "{API_CONFIG_URL}"
            * Generated Language/Libraries: "{API_CLIENT_LANGUAGE}"
        To edit these settings, access {API_SETTINGS}. 
        Note, the schema is not generated during this step; therefore, one should run:
                                    'manage.py apischema'
        for changes in the schema to appear.
    ''')

    def handle(self, *args, **options):
        shutil.rmtree(f'{API_CLIENT_URL}', ignore_errors=True)
        os.makedirs(API_CLIENT_URL, exist_ok=False)
        subprocess.run(
            'openapi-generator-cli generate '
            f'-i {API_SCHEMA_URL} '  # schema.yml Location
            f'-g {API_CLIENT_LANGUAGE} '  # Generation Type
            f'-o {API_CLIENT_URL} '  # Generated Client Location
            f'-c {API_CONFIG_URL}',  # Config.yml Location
            shell=True)
