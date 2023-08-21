from dataclasses import field, fields
from rest_framework.serializers import ModelSerializer

from locations.models import Location, TuristicPoint


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = (
            "id",
            "name",
            "resume",
            "location_link",
            "map_link",
            "description",
            "coordinates_lat",
            "coordinates_long",
            "slug_field",
            "locations_photo",
            "photo_1",
            "photo_2",
            "photo_3",
        )

class TuristicPointSerializer(ModelSerializer):
    class Meta:
        model = TuristicPoint
        fields = (
            "id",
            "name",
            'description',
            'numbers_qrcode',
            'qr_code',
            'location',
            'coordinates_lat',
            'coordinates_long',
            'points',
            'photo'
        )