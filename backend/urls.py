import knox.views
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import routers

import backend.views as backend
from backend.views import *
import backend.views.account_views as account_redo

app_name = 'website'
urlpatterns = [
    path('', backend.detail, name='home'),
    path('api/auth/signup/', account_redo.SignUp.as_view(), name='signup'),
    path('api/auth/signin/', account_redo.SignIn.as_view(), name='signin'),
    path('api/auth/signout/', account_redo.SignOut.as_view(), name='signout'),
    path('api/auth/signoutall/', account_redo.SignOutAll.as_view(), name='signoutall'),
    path('api/auth/account/', account_redo.Account.as_view(), name='account'),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='website:schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='website:schema'), name='redoc'),
]

router = routers.DefaultRouter()
router.register('api/plants', backend.PlantViewSet, basename='Plants')
router.register('api/identifiers', backend.PlantIdentifierViewSet, basename='Identifier')
router.register('api/information', backend.PlantInformationViewSet, basename='Information')


urlpatterns += router.urls
