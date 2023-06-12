import django.contrib.auth.views
from django.shortcuts import render, get_object_or_404

from backend.models import Plant


# Create your views here.
def home(request):
    return render(request, 'frontend/components/base.html')


def plant_list(request):
    return render(request, 'frontend/plant_list.html', context={'plants': Plant.objects.all()})


def plant_detail(request, plant_id):
    return render(request, 'frontend/plant_detail.html', context={'plant': get_object_or_404(Plant, id=plant_id)})

