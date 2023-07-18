from django.db import models

# Create your models here.

class Autor(models.Model):
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()

    def __str__(self) -> str:
        return f'{self.id} - {self.nome}'
    
    class Meta:
        verbose_name_plural = 'Autores'

class Livro(models.Model):
    titulo = models.CharField(max_length=255)
    ano = models.IntegerField()
    autor = models.ForeignKey(
        Autor,
        related_name='livros_autor',
        on_delete=models.CASCADE,
        null=True
    )
    valor = models.DecimalField(decimal_places=2, max_digits=10, default=0, )

    def __str__(self) -> str:
        return f'{self.id} - {self.titulo}'


