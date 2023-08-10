from dataclasses import field, fields
from rest_framework.serializers import ModelSerializer

from locations.models import Location

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ('id','name','resume')
