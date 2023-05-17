from django.urls import path
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import routers

import website.views as wv

app_name = 'piedmont_plants'
urlpatterns = [
    path('', wv.detail, name='home'),
    path('hello', TemplateView.as_view(template_name='hello_webpack.html')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='piedmont_plants:schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='piedmont_plants:schema'), name='redoc'),
]

router = routers.DefaultRouter()
router.register('api/plants', wv.PlantViewSet, basename='Plants')
router.register('api/identifiers', wv.PlantIdentifierViewSet, basename='Identifier')
router.register('api/information', wv.PlantInformationViewSet, basename='Information')


urlpatterns += router.urls
