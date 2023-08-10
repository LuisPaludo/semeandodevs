from dataclasses import field, fields
from rest_framework.serializers import ModelSerializer

from prize.models import Prizes

class PrizeSerializer(ModelSerializer):
    class Meta:
        model = Prizes
        fields = ('id','name','code')