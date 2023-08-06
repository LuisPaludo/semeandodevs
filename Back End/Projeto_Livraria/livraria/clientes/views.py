from rest_framework import viewsets, serializers
# from rest_framework.permissions import IsAuthenticated

from clientes.models import Cliente
from clientes.models import Endereco

# from utils.utils import valida_cpf, mascara_cpf

# Create your views here.


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = "__all__"


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ("id", "cliente", "cep", "rua", "numero", "cidade", "uf")
        read_only_fields = ("rua", "cidade", "uf")

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.preencher_endereco()
        return instance

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.preencher_endereco()
        return instance


class ClienteView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    http_method_names = ["get", "post", "put", "delete"]


class EnderecoView(viewsets.ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer
    http_method_names = ["get", "post", "put", "delete"]
