from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer

# Se você só precisa criar objetos usando uma rota dedicada, CreateAPIView é mais específico e pode ser apropriado para esse caso.

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

class CustomVerifyEmailView(CreateAPIView):

    def get_queryset(self):
        return 