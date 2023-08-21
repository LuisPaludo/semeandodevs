from django.utils import timezone
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime, timedelta
from rest_framework import status
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import UserDetailsView

from user_data.models import History

from .serializers import CustomRegisterSerializer, CustomUserSerializer, HistorySerializer

# Se você só precisa criar objetos usando uma rota dedicada, CreateAPIView é mais específico e pode ser apropriado para esse caso.

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

class HistoryViewSet(ModelViewSet):
    serializer_class = HistorySerializer
    http_method_names = ["get","post"]
    permission_classes = [IsAuthenticated]  # Garante que o usuário está autenticado para acessar a view

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return History.objects.filter(user=self.request.user)
        return History.objects.none()  # Retorna um queryset vazio quando o usuário não está autenticado.

    def create(self, request, *args, **kwargs):
        user = request.user
        five_minutes_ago = timezone.now() - timedelta(minutes=1)
        
        # Verificar se uma entrada foi criada nos últimos 5 minutos
        recent_entry = History.objects.filter(user=user, date__gte=five_minutes_ago).first()

        if recent_entry:
            return Response({
                'error': 'Você só pode criar uma entrada a cada 1 minutos.'
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

        response = super().create(request, *args, **kwargs)

        # Verificar se os pontos foram ajustados
        if response.status_code == status.HTTP_201_CREATED:
            added_points = response.data.get('points', 0)
            if added_points < request.data.get('points'):
                response.data['message'] = 'Os pontos foram ajustados com base no limite diário.'

        return response

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CustomVerifyEmailView(CreateAPIView):

    def get_queryset(self):
        return 
    
class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserSerializer
