from django.test import TestCase
from rest_framework.test import APIClient


class ApiTestCase(TestCase):
    client: APIClient

    def setUp(self) -> None:
        self.client = APIClient()

    def set_client_credentials(self, token_key):
        """Specifies the auth token necessary to access `TokenAuthentication` based views"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')

    def assertAllIn(self, obj, *members):
        for member in members:
            self.assertTrue(member in obj, msg=f'Error! {member} is not in {obj}')

    def assertNoneIn(self, obj, *members):
        for member in members:
            self.assertFalse(member in obj, msg=f'Error! {member} is in {obj}')
