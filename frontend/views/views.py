from django.shortcuts import render

from backend.models import Plant


# Create your views here.
def home(request):
    return render(request, 'components/base.html')


def plant_list(request):
    return render(request, 'plant_list.html', context={'plants': Plant.objects.all()})
