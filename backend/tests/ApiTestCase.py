from django.contrib.auth.models import User
from django.test import TestCase
from knox.models import AuthToken
from rest_framework.test import APIClient


class ApiTestCase(TestCase):
    client: APIClient
    user: User

    def setUp(self) -> None:
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testUser',
            password='qwerty',
            email='testUser@gmail.com'
        )

    def set_client_credentials(self, token_key=None):
        """Sets the auth token needed to access `TokenAuthentication` based views.
        If the token_key is not provided, the function will automatically authenticate the client."""
        if token_key:
            self.client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')
        else:
            token, key = AuthToken.objects.create(user=self.user)
            self.client.credentials(HTTP_AUTHORIZATION=f'Token {key}')

    def assertAllIn(self, obj, *members):
        for member in members:
            self.assertTrue(member in obj, msg=f'Error! {member} is not in {obj}')

    def assertNoneIn(self, obj, *members):
        for member in members:
            self.assertFalse(member in obj, msg=f'Error! {member} is in {obj}')
