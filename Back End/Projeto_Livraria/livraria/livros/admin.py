from django.contrib import admin
from livros.models import Livro, Autor
# Register your models here.

@admin.register(Livro)
class LivroAdmin(admin.ModelAdmin):
    list_display = ('id','titulo','ano')

@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = ('id','nome','data_nascimento')