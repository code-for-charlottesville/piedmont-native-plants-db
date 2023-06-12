from django.urls import path
import frontend.views as frontend_views

app_name = 'frontend'
urlpatterns = [
    path('', frontend_views.home, name='base'),
    path('list/', frontend_views.plant_list, name='list')
]