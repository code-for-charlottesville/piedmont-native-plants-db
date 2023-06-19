from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import routers

import backend.views as backend
import backend.views.account_views as account_redo

app_name = 'backend'
urlpatterns = [
    path('auth/signup/', account_redo.SignUp.as_view(), name='signup'),
    path('auth/signin/', account_redo.SignIn.as_view(), name='signin'),
    path('auth/signout/', account_redo.SignOut.as_view(), name='signout'),
    path('auth/signoutall/', account_redo.SignOutAll.as_view(), name='signoutall'),
    path('auth/account/', account_redo.Account.as_view(), name='account'),

    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='backend:schema'), name='swagger'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='backend:schema'), name='redoc'),
]

router = routers.DefaultRouter()
router.register('plants', backend.PlantViewSet, basename='Plants')
router.register('information', backend.PlantInformationViewSet, basename='Information')

urlpatterns += router.urls
