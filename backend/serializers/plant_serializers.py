from rest_framework import serializers
from backend.models import *
from django.utils.timezone import now

'''
    Official Documentation: https://www.django-rest-framework.org/api-guide/serializers/
    This file defines how the models are converted into JSON for the API.
    class Meta:
        model: [model name]
            specifies which model the serializer corresponds to.
        fields: [tuple of field names]
            specifies which fields should be represented in the JSON.
            Can be replaced with 'exclude' which provides a list of fields to ignore.
        depth: [integer]
            determines how nested relationships are serialized.
            If greater than 0, nested relationships are followed until 'depth'.
'''


class PlantInformationSerializer(serializers.ModelSerializer):
    plant = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PlantInformation
        fields = '__all__'


class PlantSerializer(serializers.ModelSerializer):
    info = PlantInformationSerializer()

    class Meta:
        model = Plant
        fields = '__all__'

    def create(self, validated_data):
        info_data = validated_data.pop('info')
        info = PlantInformation.objects.create(**info_data)
        return Plant.objects.create(**validated_data, info=info)

    def update(self, instance: Plant, validated_data):
        info_data = validated_data.pop('info')
        info = instance.info
        super().update(instance, validated_data)

        for attr, val in info_data.items():
            setattr(info, attr, val)
        info.save()
        return instance
