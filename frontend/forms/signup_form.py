from django.contrib.auth.models import User
from django import forms
from django.core.exceptions import ValidationError


class SignupForm(forms.ModelForm):
    password_confirmation = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ['password',
                  'first_name',
                  'last_name',
                  'username',
                  'email']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password_confirmation = cleaned_data.get('password_confirmation')
        if password != password_confirmation:
            self.add_error('password_confirmation', ValidationError('The passwords must match'))
        print(password, password_confirmation)
