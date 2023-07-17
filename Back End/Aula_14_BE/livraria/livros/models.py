from django.db import models

# Create your models here.

class Autor(models.Model):
    titulo = models.CharField(max_length=255)
    ano = models.DateField()

# nomeapp_nomemodel = livros.livro
class Livro(models.Model):
    # id é gerado automaticamente
    titulo = models.CharField(max_length=255)
    ano = models.IntegerField()
    autor = models.ForeignKey(
        Autor,
        related_name = 'Livros_autor',
        on_delete=models.CASCADE,
        null = True
    )
