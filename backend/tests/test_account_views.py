import re

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from knox.models import AuthToken
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient


def assemble_payload(obj, *fields):
    """Assemble a dictionary from the given object and field names."""
    payload = {}
    for field in fields:
        payload[field] = getattr(obj, field)
    return payload


def extract_error_details(error_field) -> list[ErrorDetail]:
    """When an error occurs during the processing of a request,
    django will store the string representations of `ErrorDetail`s in
    the field that caused the error.
    This function extracts these errors to easily assert against."""
    regex = r"""ErrorDetail\(string=['"](?P<string>.*)['"], code=['"](?P<code>.*)['"]\)"""
    matches = re.findall(regex, str(error_field))
    errors = []
    for match in matches:
        string, code = match
        errors.append(ErrorDetail(string=string, code=code))
    return errors


class TestUser:
    username = 'JohnDoe'
    password = "HelloI'mAPassword"
    email = 'johnDoe@gmail.com'


class TestCreateUser:
    username = 'JohnDoe2'
    password = "HelloI'mASecondPassword"
    email = 'johnDoe2@gmail.com'


class TestCreateUserSameName:
    username = 'JohnDoe'
    password = 'duplicate@gmail.com'
    email = 'duplicate@gmail.com'


class TestAccountViews(TestCase):
    user = None
    client = None

    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username=TestUser.username,
            password=TestUser.password,
            email=TestUser.email
        )
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

    def refresh_user(self):
        """The attribute `self.user` may not be immediately updated by requests.
        Therefore, it may be necessary to refresh the user instance
        in order to have the new data available within the tests."""
        self.user = User.objects.get(id=self.user.id)

    def assertUser(self, expected_user, actual_user, *fields_to_inspect):
        """Takes in a `TestUser` and a `response.data` dictionary.
        The function then asserts that the fields given in `fields_to_inspect` are equivalent"""
        for field in fields_to_inspect:
            self.assertEquals(
                getattr(expected_user, field), actual_user[field],
                msg=f'Expected {getattr(expected_user, field)} '
                    f'but received {actual_user[field]}'
            )

    def test_user_exists(self):
        query_set = User.objects.filter(
            username=TestUser.username,
            email=TestUser.email)
        self.assertTrue(query_set.exists())

    # View: SignOut
    def test_signout__single_token(self):
        token, key = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key)
        response = self.client.post(path=reverse('website:signout'))
        self.assertEquals(0, len(AuthToken.objects.all()))
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signout__double_tokens(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        token2, key2 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key1)
        response = self.client.post(path=reverse('website:signout'))
        self.assertIsNotNone(AuthToken.objects.get(pk=token2.pk))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token1.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signout__invalid_token(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials('InvalidToken')
        response = self.client.post(path=reverse('website:signout'))
        self.assertIsNotNone(AuthToken.objects.get(pk=token1.pk))
        self.assertEquals(status.HTTP_401_UNAUTHORIZED, response.status_code)

    # View: SignOutAll
    def test_signoutall__single_token(self):
        token, key = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key)
        response = self.client.post(path=reverse('website:signoutall'))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signoutall__double_token(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        token2, key2 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key1)
        response = self.client.post(path=reverse('website:signoutall'))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token1.pk)
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token2.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signoutall__invalid_token(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials('InvalidToken')
        response = self.client.post(path=reverse('website:signoutall'))
        self.assertIsNotNone(AuthToken.objects.get(pk=token1.pk))
        self.assertEquals(status.HTTP_401_UNAUTHORIZED, response.status_code)

    # View: Account
    def test_account__valid_token(self):
        token, key = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key)
        response = self.client.get(path=reverse('website:account'))
        self.assertTrue('id' in response.data)
        self.assertUser(TestUser, response.data, 'email', 'username')
        self.assertEquals(status.HTTP_200_OK, response.status_code)

    def test_account__invalid_token(self):
        self.set_client_credentials('InvalidToken')
        response = self.client.get(path=reverse('website:account'))
        self.assertNoneIn(response.data, 'id', 'email', 'username')
        self.assertEquals(status.HTTP_401_UNAUTHORIZED, response.status_code)

    # View: SignUp
    def test_signup__valid_credentials(self):
        response = self.client.post(
            path=reverse('website:signup'),
            data=assemble_payload(TestCreateUser, 'username', 'password', 'email')
        )
        self.assertAllIn(response.data, 'token_key', 'token_expiry', 'id', 'username', 'email')
        self.assertUser(TestCreateUser, response.data, 'username', 'email')
        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertTrue(User.objects.get(pk=int(response.data['id'])))

    def test_signup__invalid_credentials_duplicate_username(self):
        response = self.client.post(
            path=reverse('website:signup'),
            data=assemble_payload(TestCreateUserSameName, 'username', 'password', 'email')
        )
        self.assertNoneIn(response.data, 'token_key', 'token_expiry', 'id', 'email')
        errors = extract_error_details(response.data['username'])
        self.assertEquals(1, len(errors))
        self.assertEquals(ErrorDetail('A user with that username already exists.', 'unique'), errors[0])
        self.assertEquals(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertRaises(
            User.DoesNotExist,
            User.objects.get,
            **assemble_payload(TestCreateUserSameName, 'username', 'email')
        )

    # View: SignIn
    def test_signin__valid_credentials(self):
        self.assertIsNone(self.user.last_login)
        response = self.client.post(
            path=reverse('website:signin'),
            data=assemble_payload(TestUser, 'username', 'password')
        )
        self.refresh_user()
        self.assertIsNotNone(self.user.last_login)
        self.assertAllIn(response.data, 'token_key', 'token_expiry', 'id', 'username', 'email')
        self.assertUser(TestUser, response.data, 'username', 'email')
