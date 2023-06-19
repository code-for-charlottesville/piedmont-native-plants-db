from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.shortcuts import render

from frontend.forms import SignupForm


def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(user.password)
            user.save()
            user = authenticate(request, username=user.username, password=user.password)
            login(request, user)
            return HttpResponseRedirect(redirect_to='/')
    else:
        form = SignupForm()
    return render(request=request,
                  template_name='registration/signup.html',
                  context={'form': form})