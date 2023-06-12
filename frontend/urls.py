from django.urls import path
import frontend.views as frontend_views

app_name = 'website'
urlpatterns = [
    path('', frontend_views.home, name='base'),
]