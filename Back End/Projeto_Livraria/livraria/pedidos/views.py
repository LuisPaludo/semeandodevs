from rest_framework import viewsets, serializers
from rest_framework.permissions import  SAFE_METHODS

from pedidos.models import Pedido, PedidoLivro, Cupom
from livros.views import LivroReadSerializer
from clientes.views import ClienteSerializer
# from utils.utils import valida_cpf, mascara_cpf

# Create your views here.

# class PedidoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pedido
#         fields = ('id','cliente','livros')

class PedidoLivroWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoLivro
        fields = ('livro','quantidade')

class PedidoLivroReadSerializer(serializers.ModelSerializer):
    livro = LivroReadSerializer()
    class Meta:
        model = PedidoLivro
        fields = ('livro','quantidade')

class PedidoReadSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()
    livros = PedidoLivroReadSerializer(many=True, source='pedidolivro_set')
    class Meta:
        model = Pedido
        fields = ('id','cliente','livros','total','cupom')

class PedidoWriteserializer(serializers.ModelSerializer):
    livros = PedidoLivroWriteSerializer(many=True, source='pedidolivro_set')
    cupom = serializers.CharField(max_length=15, required = False)
    
    class Meta:
        model = Pedido
        fields = ('id','cliente','livros', 'cupom')
        
    def validate_cupom(self,value):
        # value = value.upper()
        cupom = Cupom.objects.filter(nome=value).first()
        if not cupom:
            raise serializers.ValidationError('Cupom Inválido')
        
        if not self.instance or self.instance.cupom != cupom:
            if cupom.quantidade_utilizada >= cupom.quantidade_maxima:
                raise serializers.ValidationError('Cupom Expirado')
        
        return cupom

    def create(self, validated_data):
        livros = validated_data.pop('pedidolivro_set')
        instance = Pedido.objects.create(**validated_data)
        for livro in livros:
            PedidoLivro.objects.create(pedido=instance, livro=livro['livro'], quantidade = livro['quantidade'])  # noqa: E501
        instance.total = instance.calcular_total()
        instance.save()
        
        if cupom:= validated_data.get('cupom'):
            cupom.quantidade_utilizada += 1
            cupom.save()
        
        return instance
    
    def update(self, instance, validated_data):
        livros = validated_data.pop('pedidolivro_set')
        instance.livros.clear()
        for livro in livros:
            PedidoLivro.objects.create(pedido=instance, livro=livro['livro'], quantidade = livro['quantidade'])  # noqa: E501
        
        cupom = validated_data.get('cupom')
        if cupom and cupom!= instance.cupom:
            cupom.quantidade_utilizada += 1
            cupom.save() 
        
        instance =  super().update(instance, validated_data)
        instance.total = instance.calcular_total()
        instance.save()
        return instance

# class PedidoView(viewsets.ModelViewSet):
#     queryset = Pedido.objects.all()
#     serializer_class = PedidoSerializer
#     http_method_names = ['get','post','put','delete']

class PedidoView(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoReadSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return super().get_serializer_class()
        return PedidoWriteserializer