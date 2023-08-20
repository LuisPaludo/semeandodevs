from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
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

    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CustomVerifyEmailView(CreateAPIView):

    def get_queryset(self):
        return 
    
class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserSerializer
