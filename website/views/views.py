from django.http import HttpResponse
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import viewsets
from website.permissions import AdminOrReadOnly

from website.serializers import *


def detail(request):
    return HttpResponse("This is a test page.")

'''
    API Views:
        @extend_schema_view(
            api_action_name=extend_schema(
                operation_id='overrides_openAPI_auto_generated_method_name',
                description='redoc/swagger visible description'
            )
        )
        class ViewSet(...):
            serializer_class:
                determines what object the view is tied to
            queryset:
                defines the default set of objects to be filtered against for the api view
                can override get_queryset method to have a more complex filtering based on request
            permission_classes:
                defines what permissions are necessary to access each action
            filterset_fields:
                defines url query parameters for filtering
'''
@extend_schema_view(
    create=extend_schema(
        operation_id='plant_inf_create',
        description=AdminOrReadOnly.get_description()
    ),
    list=extend_schema(
        operation_id='plant_inf_list',
        description=AdminOrReadOnly.get_description()
    ),
    retrieve=extend_schema(
        operation_id='plant_inf_retrieve',
        description=AdminOrReadOnly.get_description()
    ),
    update=extend_schema(
        operation_id='plant_inf_update',
        description=AdminOrReadOnly.get_description()
    ),
    partial_update=extend_schema(
        operation_id='plant_inf_partial_update',
        description=AdminOrReadOnly.get_description()
    ),
    destroy=extend_schema(
        operation_id='plant_inf_destroy',
        description=AdminOrReadOnly.get_description()
    ),
)
class PlantInformationViewSet(viewsets.ModelViewSet):
    serializer_class = PlantInformationSerializer
    queryset = PlantInformation.objects.all()
    permission_classes = (AdminOrReadOnly,)
    filterset_fields = {
        'bloom_start': ['exact'],
        'bloom_end': ['exact'],
        'height_min': ['lt', 'gt', 'exact'],
        'height_max': ['lt', 'gt', 'exact'],
    }


@extend_schema_view(
    create=extend_schema(
        operation_id='plant_ident_create',
        description=AdminOrReadOnly.get_description()
    ),
    list=extend_schema(
        operation_id='plant_ident_list',
        description=AdminOrReadOnly.get_description()
    ),
    retrieve=extend_schema(
        operation_id='plant_ident_retrieve',
        description=AdminOrReadOnly.get_description()
    ),
    update=extend_schema(
        operation_id='plant_ident_update',
        description=AdminOrReadOnly.get_description()
    ),
    partial_update=extend_schema(
        operation_id='plant_ident_partial_update',
        description=AdminOrReadOnly.get_description()
    ),
    destroy=extend_schema(
        operation_id='plant_ident_destroy',
        description=AdminOrReadOnly.get_description()
    ),
)
class PlantIdentifierViewSet(viewsets.ModelViewSet):
    serializer_class = PlantIdentifierSerializer
    queryset = PlantIdentifier.objects.all()
    permission_classes = (AdminOrReadOnly,)
    filterset_fields = {
        'latin_name': ['icontains', 'iexact'],
        'common_name': ['icontains', 'iexact']
    }


@extend_schema_view(
    create=extend_schema(
        operation_id='plant_create',
        description=AdminOrReadOnly.get_description()
    ),
    list=extend_schema(
        operation_id='plant_list',
        description=AdminOrReadOnly.get_description()
    ),
    retrieve=extend_schema(
        operation_id='plant_retrieve',
        description=AdminOrReadOnly.get_description()
    ),
    update=extend_schema(
        operation_id='plant_update',
        description=AdminOrReadOnly.get_description()
    ),
    partial_update=extend_schema(
        operation_id='plant_partial_update',
        description=AdminOrReadOnly.get_description()
    ),
    destroy=extend_schema(
        operation_id='plant_destroy',
        description=AdminOrReadOnly.get_description()
    ),
)
class PlantViewSet(viewsets.ModelViewSet):
    serializer_class = PlantSerializer
    queryset = Plant.objects.all()
    permission_classes = (AdminOrReadOnly,)
    filterset_fields = {
        'datetime_added': ['lt', 'gt', 'exact', 'year', 'month', 'day', 'hour', 'in'],
        'description': ['icontains']
    }
