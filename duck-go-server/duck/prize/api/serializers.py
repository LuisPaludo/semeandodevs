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

    def to_representation(self, instance):
            data = super().to_representation(instance)

            # Se estiver em um request GET, serializamos o 'prize' completamente
            if self.context['request'].method == 'GET':
                data['prize'] = PrizesSerializer(instance.prize).data
            return data
    
class RedeemedPrizesQrCodeSerializer(ModelSerializer):

    class Meta:
        model = RedeemedPrizes
        fields = ('qr_code',)