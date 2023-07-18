from django.db import models
from django.core.exceptions import ValidationError

from utils.utils import valida_cpf, mascara_cpf

# Create your models here.

def validate_cpf(cpf):
        if not valida_cpf(cpf):
            raise ValidationError('CPF Inválido')
        return mascara_cpf(cpf)

class Cliente(models.Model):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, validators=[validate_cpf])
    data_nascimento = models.DateField()
    email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return f'{self.nome} - {self.cpf}'    