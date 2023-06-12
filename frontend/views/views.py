from django.http import HttpResponseBadRequest
from django.shortcuts import render, get_object_or_404

from backend.models import Plant
from frontend.forms import PlantSearchForm


# Create your views here.
def home(request):
    return render(request, 'frontend/components/base.html')


def plant_list(request):
    plants = Plant.objects.all()
    form = PlantSearchForm(request.GET or request.POST or None)
    if form.is_valid():
        if latin_name := form.cleaned_data['latin_name']:
            plants = plants.filter(identifier__latin_name__icontains=latin_name)
        if common_name := form.cleaned_data['common_name']:
            plants = plants.filter(identifier__common_name__icontains=common_name)
    context = {
        'form': form,
        'plants': plants
    }
    return render(request, 'frontend/plant_list.html', context)


def plant_detail(request, plant_id):
    return render(request, 'frontend/plant_detail.html', context={'plant': get_object_or_404(Plant, id=plant_id)})


