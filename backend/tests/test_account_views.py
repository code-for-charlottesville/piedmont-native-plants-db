from django.contrib.auth.models import User
from django.urls import reverse
from knox.models import AuthToken
from rest_framework import status
from rest_framework.exceptions import ErrorDetail

from backend.tests.ApiTestCase import ApiTestCase
from backend.tests.ApiTestUtilities import assemble_payload, extract_error_details


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


class TestAccountViews(ApiTestCase):
    user = None
    client = None

    def setUp(self) -> None:
        super().setUp()
        self.user = User.objects.create_user(
            username=TestUser.username,
            password=TestUser.password,
            email=TestUser.email
        )

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
        response = self.client.post(path=reverse('backend:signout'))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signout__double_tokens(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        token2, key2 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key1)
        response = self.client.post(path=reverse('backend:signout'))
        self.assertIsNotNone(AuthToken.objects.get(pk=token2.pk))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token1.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signout__invalid_token(self):
        token, key = AuthToken.objects.create(user=self.user)
        self.set_client_credentials('InvalidToken')
        response = self.client.post(path=reverse('backend:signout'))
        self.assertIsNotNone(AuthToken.objects.get(pk=token.pk))
        self.assertEquals(status.HTTP_401_UNAUTHORIZED, response.status_code)

    # View: SignOutAll
    def test_signoutall__single_token(self):
        token, key = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key)
        response = self.client.post(path=reverse('backend:signoutall'))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signoutall__double_token(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        token2, key2 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials(key1)
        response = self.client.post(path=reverse('backend:signoutall'))
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token1.pk)
        self.assertRaises(AuthToken.DoesNotExist, AuthToken.objects.get, pk=token2.pk)
        self.assertEquals(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_signoutall__invalid_token(self):
        token1, key1 = AuthToken.objects.create(user=self.user)
        token2, key2 = AuthToken.objects.create(user=self.user)
        self.set_client_credentials('InvalidToken')
        response = self.client.post(path=reverse('backend:signoutall'))
        self.assertIsNotNone(AuthToken.objects.get(pk=token1.pk))
        self.assertIsNotNone(AuthToken.objects.get(pk=token2.pk))
        self.assertEquals(status.HTTP_401_UNAUTHORIZED, response.status_code)

    # View: Account
    def test_account__valid_token(self):
        self.set_client_credentials()
        response = self.client.get(path=reverse('backend:account'))
        self.assertTrue('id' in response.data)
        self.assertUser(TestUser, response.data, 'email', 'username')
        self.assertEquals(status.HTTP_200_OK, response.status_code)

    def test_account__invalid_token(self):
        self.set_client_credentials('InvalidToken')
        response = self.client.get(path=reverse('backend:account'))
        self.assertNoneIn(response.data, 'id', 'email', 'username')
        self.assertEquals(status.HTTP_401_UNAUTHORIZED, response.status_code)

    # View: SignUp
    def test_signup__valid_credentials(self):
        response = self.client.post(
            path=reverse('backend:signup'),
            data=assemble_payload(TestCreateUser, 'username', 'password', 'email')
        )
        self.assertAllIn(response.data, 'token_key', 'token_expiry', 'id', 'username', 'email')
        self.assertUser(TestCreateUser, response.data, 'username', 'email')
        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertTrue(User.objects.get(pk=int(response.data['id'])))

    def test_signup__invalid_credentials_duplicate_username(self):
        response = self.client.post(
            path=reverse('backend:signup'),
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
            path=reverse('backend:signin'),
            data=assemble_payload(TestUser, 'username', 'password')
        )
        self.refresh_user()
        self.assertIsNotNone(self.user.last_login)
        self.assertAllIn(response.data, 'token_key', 'token_expiry', 'id', 'username', 'email')
        self.assertUser(TestUser, response.data, 'username', 'email')
