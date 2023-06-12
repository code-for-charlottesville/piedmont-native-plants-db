import django.contrib.auth.views
from django.urls import path, include
import frontend.views as frontend_views

app_name = 'frontend'
urlpatterns = [
    path('', frontend_views.home, name='base'),
    path('plants/', frontend_views.plant_list, name='plant_list'),
    path('plants/<int:plant_id>', frontend_views.plant_detail, name='plant_detail'),
    path('account/', include('django.contrib.auth.urls'))
]