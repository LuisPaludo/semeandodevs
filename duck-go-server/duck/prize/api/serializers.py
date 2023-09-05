from rest_framework.serializers import ModelSerializer, StringRelatedField, ValidationError
from datetime import date, timedelta

from prize.models import Prizes, RedeemedPrizes

class PrizesSerializer(ModelSerializer):
    category = StringRelatedField()
    generated_by = StringRelatedField()

    class Meta:
        model = Prizes
        fields = ('name','id','description','cost_in_points','category','generated_by','discount_value','logo','times_to_be_used','expiry_date')

    def validate_expiry_date(self, value):
        today = date.today()
        one_week_from_today = today + timedelta(weeks=1)

        if value <= today:
            raise ValidationError("The expiry date can't be today or in the past.")
        
        if value <= one_week_from_today:
            raise ValidationError("The expiry date must be at least one week from today.")
        
        return value

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