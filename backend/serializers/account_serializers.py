import datetime

import rest_framework.exceptions as rest_exceptions
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers


class SignUpRequestSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(SignUpRequestSerializer, self).create(validated_data)


class UserResponseSerializer(serializers.ModelSerializer):
    token_key = serializers.SerializerMethodField(method_name='get_token_key')
    token_expiry = serializers.SerializerMethodField(method_name='get_token_expiry')

    def get_token_key(self, _) -> str:
        return self.token_key

    def get_token_expiry(self, _) -> datetime.datetime:
        return self.token_expiry

    def __init__(self, token_key=None, token_expiry=None, **kwargs):
        self.token_key = token_key
        self.token_expiry = token_expiry
        super(UserResponseSerializer, self).__init__(**kwargs)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'token_key', 'token_expiry')


class SignInRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        else:
            raise rest_exceptions.AuthenticationFailed()


class AccountResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
