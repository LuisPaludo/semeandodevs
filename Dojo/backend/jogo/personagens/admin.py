from django.contrib import admin
from personagens.models import Viloes, Jogador, Jogo
# Register your models here.

@admin.register(Viloes)
class JogadorAdmin(admin.ModelAdmin):
    list_display = ('fase', 'nome', 'vida_maxima', 'experiencia', 'ataque_maximo', 'imagem')

@admin.register(Jogador)
class JogadorAdmin(admin.ModelAdmin):
    list_display = ('vida_maxima', 'vida', 'ataque_maximo', 'proximo_nivel', 'xp', 'nivel')

@admin.register(Jogo)
class JogadorAdmin(admin.ModelAdmin):
    list_display = ('fator_cura', 'fator_xp', 'fator_evolucao')

