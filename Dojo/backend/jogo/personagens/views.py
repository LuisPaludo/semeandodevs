from rest_framework import serializers
from rest_framework import viewsets

from personagens.models import Jogador


class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = '__all__'


class JogadorView(viewsets.ModelViewSet):
    queryset = Jogador.objects.all()
    serializer_class = JogadorSerializer
