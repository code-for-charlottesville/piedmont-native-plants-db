import knox.views as knox_views
from django.contrib.auth import login, logout
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiRequest, inline_serializer
from knox.auth import TokenAuthentication
from rest_framework import generics, permissions, status
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from backend.serializers.account_serializers import *


class SignUp(knox_views.LoginView, generics.GenericAPIView):
    """Signs the user up for the API and returns a token to be used in subsequent requests."""
    serializer_class = SignUpRequestSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(operation_id='user_signup', responses={200: OpenApiResponse(response=UserResponseSerializer)})
    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = serializer.instance
        login(request, user, backend='django.contrib.auth.ModelBackend')
        response = super().post(request, format=None)
        response.data = UserResponseSerializer(
            instance=user,
            token_key=response.data['token'],
            token_expiry=response.data['expiry']
        ).data
        return response


class SignIn(knox_views.LoginView, generics.GenericAPIView):
    """Signs the user into the API and returns a token to be used in subsequent requests."""
    serializer_class = SignInRequestSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

    @extend_schema(operation_id='user_signin', responses={200: OpenApiResponse(response=UserResponseSerializer)})
    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user, backend='django.contrib.auth.ModelBackend')
        response = super().post(request, format=None)
        response.data = UserResponseSerializer(
            instance=user,
            token_key=response.data['token'],
            token_expiry=response.data['expiry']
        ).data
        return response


class Account(generics.GenericAPIView):
    """Retrieves a user tied to the token header given by `Authorization: Token '%s'`"""
    serializer_class = AccountResponseSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, BasicAuthentication, SessionAuthentication]

    @extend_schema(operation_id='user_account')
    def get(self, request):
        return Response(
            self.get_serializer(instance=request.user).data,
            status=status.HTTP_200_OK
        )


class SignOut(knox_views.LogoutView):
    """Deletes the current token within the `Authorization` header.
    Effectively, this logs the user out of the application.

    __Note__: This does not delete _all_ tokens, only the one currently in the header.
    To delete all tokens (sign the user out of all sessions), one should use `sign_out_all`."""
    authentication_classes = [TokenAuthentication, BasicAuthentication, SessionAuthentication]

    @extend_schema(operation_id='user_signout', request=None, responses={204: None})
    def post(self, request, format=None):
        return super().post(request, format)


class SignOutAll(knox_views.LogoutAllView):
    """Deletes all authentication tokens tied to the user.
    The post request must have a valid token within the `Authorization` header.
    This is used to specify the user to logout.
    Effectively, this view logs the user out of all active sessions.

    __Note__: To logout of a _single_ session, one can use the `sign_out` operation."""
    authentication_classes = [TokenAuthentication, BasicAuthentication, SessionAuthentication]

    @extend_schema(operation_id='user_signout_all', request=None, responses={204: None})
    def post(self, request, format=None):
        return super().post(request, format)
