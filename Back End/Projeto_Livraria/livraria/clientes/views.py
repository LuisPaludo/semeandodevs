from django.shortcuts import render
from rest_framework import viewsets, serializers

from clientes.models import Cliente
from utils.utils import valida_cpf, mascara_cpf

# Create your views here.

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'



class ClienteView(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    http_method_names = ['get','post','put','delete']