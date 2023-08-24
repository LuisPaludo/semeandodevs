from sqlite3 import IntegrityError
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.utils import IntegrityError

from prize.models import Prizes, RedeemedPrizes
from .serializers import PrizesSerializer, RedeemedPrizesSerializer, RedeemedPrizesQrCodeSerializer
from user_data.models import History

class PrizesViewSet(viewsets.ModelViewSet):
    queryset = Prizes.objects.all()
    serializer_class = PrizesSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Verificar se o usuário é uma empresa parceira
        if not request.user.is_partner:
            return Response({"detail": "Only partners can create coupons."}, status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request, *args, **kwargs)
        
class RedeemedPrizesViewSet(viewsets.ModelViewSet):
    queryset = RedeemedPrizes.objects.all()
    serializer_class = RedeemedPrizesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return RedeemedPrizes.objects.filter(user=self.request.user)
        return RedeemedPrizes.objects.none()  # Return an empty queryset for unauthenticated users

    
    def create(self, request, *args, **kwargs):
        # Verificar se o usuário é uma empresa parceira
        if self.request.user.is_partner:
            return Response({"detail": "Only users can redeem coupons."}, status=status.HTTP_403_FORBIDDEN)
        
        prize_id = request.data.get("prize")  # Note que troquei 'request.get' por 'request.data.get'

        try:
            prize = Prizes.objects.get(id=prize_id)
        except Prizes.DoesNotExist:
            return Response({"detail": "Prize not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Incrementar a contagem no Prizes
        prize.times_used += 1        

        try:
            last_total_points = History.objects.filter(user=self.request.user).latest('date').total_points
        except History.DoesNotExist:
            last_total_points = 0

        try:
            response = super().create(request, *args, **kwargs)
            # Criar uma instância de History
            history = History(user=self.request.user, 
                            points=-prize.cost_in_points,  # Você precisa definir 'some_points_value'
                            total_points=last_total_points - prize.cost_in_points,  # Você precisa definir 'some_total_points'
                            description=f'Prêmio Resgatado -> {prize.name}')  # Altere a descrição conforme necessário
                
            if(last_total_points < prize.cost_in_points):
                return Response({'Usuário não possui pontos suficientes'}, status=status.HTTP_402_PAYMENT_REQUIRED)
                
            
            history.save()
            prize.save()
                
            return response
           
        except IntegrityError:
            return Response({"detail": "Este prêmio já foi resgatado pelo usuário."}, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

class RedeemedPrizesQrCodeViewSet(viewsets.ModelViewSet):
    queryset = RedeemedPrizes.objects.all()
    serializer_class = RedeemedPrizesQrCodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            prize_filter = self.request.query_params.get('prize', None)

            if prize_filter is None or prize_filter == '':
                return RedeemedPrizes.objects.none()  # Return an empty queryset if prize filter is not provided or empty

            queryset = RedeemedPrizes.objects.filter(user=self.request.user)

            if prize_filter:
                queryset = queryset.filter(prize=prize_filter)
            return queryset
        
        return RedeemedPrizes.objects.none()  # Return an empty queryset for unauthenticated users
