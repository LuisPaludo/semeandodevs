from livros.models import Livro, Autor
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS


class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ('id','nome','data_nascimento')

class LivroReadSerializer(serializers.ModelSerializer):
    autor = AutorSerializer()
    class Meta:
        model = Livro
        fields = ('id','titulo','ano','autor','valor')

class LivroWriteserializer(serializers.ModelSerializer):
    class Meta:
        model = Livro
        fields = ('id','titulo','ano','autor','valor')

class LivroView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Livro.objects.all()
    serializer_class = LivroReadSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return super().get_serializer_class()
        return LivroWriteserializer
    
    
class AutorView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    http_method_names = ['get', 'post', 'put', 'delete']