from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User


# Se você só precisa criar objetos usando uma rota dedicada, CreateAPIView é mais específico e pode ser apropriado para esse caso.
