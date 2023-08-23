from rest_framework.serializers import ModelSerializer, StringRelatedField

from prize.models import Prizes, RedeemedPrizes

class PrizesSerializer(ModelSerializer):
    category = StringRelatedField()
    generated_by = StringRelatedField()

    class Meta:
        model = Prizes
        fields = ('name','id','description','cost_in_points','category','generated_by','discount_value','logo')

class RedeemedPrizesSerializer(ModelSerializer):
    class Meta:
        model = RedeemedPrizes
        fields = ('prize',)
