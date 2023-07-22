from django.db import models

# Create your models here.
class Viloes(models.Model):
    fase = models.IntegerField()
    nome= models.CharField(max_length=255)
    vida_maxima = models.IntegerField()
    experiencia = models.IntegerField()
    ataque_maximo = models.IntegerField()
    imagem = models.TextField()
    
class Jogador(models.Model):
    vida_maxima = models.IntegerField()
    vida = models.IntegerField()
    ataque_maximo = models.IntegerField()
    proximo_nivel = models.IntegerField()
    xp = models.IntegerField()
    nivel = models.IntegerField()

class Jogo(models.Model):
    fator_cura = models.FloatField()
    fator_xp = models.FloatField()
    fator_evolucao = models.FloatField()