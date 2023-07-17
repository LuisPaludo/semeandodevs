from django.shortcuts import render
from livros.models import Livro

from rest_framework import serializers, viewsets

# Create your views here.

class LivrosSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','titulo','ano')

class LivroView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Livro.objects.all()
    serializer_class = LivrosSerializer
    http_method_names = ('get','post','put','delete')