from django.urls import reverse
from drf_spectacular.extensions import OpenApiAuthenticationExtension
from rest_framework import permissions
from knox.auth import TokenAuthentication
from rest_framework.utils.formatting import dedent

'''This file defines permission classes to be used in the API views'''


class PrivilegedOrReadOnlyAuthenticated(permissions.IsAuthenticated):
    PRIVILEGED_ACTIONS = ('create', 'update', 'partial_update', 'destroy')
    AUTHENTICATED_ACTIONS = ('list', 'retrieve')

    def has_permission(self, request, view):
        if view.action in self.AUTHENTICATED_ACTIONS:
            return bool(super().has_permission(request, view))
        elif view.action in self.PRIVILEGED_ACTIONS:
            user = request.user
            is_privileged = user and (user.is_staff or user.is_superuser)
            return bool(super().has_permission(request, view) and is_privileged)
        else:
            return False

    @staticmethod
    def get_description():
        """This method returns a string to be used in the OpenAPI online documentation"""
        return dedent('''
        __Uses PrivilegedOrReadOnlyAuthenticated Permissions__: 
        If the user is an admin or staff member, then _all_ operations are available to them; 
        otherwise, the api defaults to _readonly_ operations. The user must be _authenticated_ in _both_ cases.
        * If the user is privileged (`is_staff or is_superuser == True`), then they can use: __all operations__
        * If the user is not privileged (`is_staff or is_superuser == False`), then they can use: __list__ or __retrieve__ operations
        ''')


class KnoxTokenAuthentication(OpenApiAuthenticationExtension):
    """This class allows drf-spectacular to automatically annotate the online api documentation.
    This gives users more information on how to properly authenticate with the api.
    The doc strings use commonmark to render.
    Docs: https://drf-spectacular.readthedocs.io/en/latest/customization.html?highlight=openapiauthenticationextension#specify-authentication-with-openapiauthenticationextension
    """
    target_class = 'knox.auth.TokenAuthentication'
    name = 'KnoxTokenAuthentication'

    @staticmethod
    def __get_token_producing_urls__():
        return f'[`user_signin`]({reverse("website:signin")}), '\
               f'[`user_signup`]({reverse("website:signup")}), and '\
               f'[`user_account`]({reverse("website:account")})'

    @staticmethod
    def __get_logout_url():
        return f'[`user_signout`]({reverse("website:signout")})'

    @staticmethod
    def __get_logoutall_url():
        return f'[`user_signout_all`]({reverse("website:signoutall")})'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            'description': dedent(f"""
            This enables token-based authentication through the django knox library.
            * __Example__: `Authorization: Token 6cd0e864497d6c0f7d27...`
            * __Getting Tokens__: Tokens are returned from {self.__get_token_producing_urls__()}
            * __Deleting Tokens__: 
                - Individual tokens can be deleted at {self.__get_logout_url()}. 
                (I.e., the user is logged out of the current session.) 
                - All tokens for a user can be cleared at {self.__get_logoutall_url()}. 
                (I.e., the user is logged out of all sessions.)
            """)
        }
