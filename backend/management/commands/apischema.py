from django.core.management import BaseCommand
from rest_framework.utils.formatting import dedent

from ._settings import API_SCHEMA_URL, API_SETTINGS
from django.core.management import call_command


class Command(BaseCommand):
    help = dedent(f'''
        Generates the OpenAPI schema.yml at {API_SCHEMA_URL}.
        To edit these settings, access {API_SETTINGS}
    ''')

    def handle(self, *args, **options):
        call_command('spectacular', file=API_SCHEMA_URL)
