from django.contrib import admin
from clientes.models import Cliente
# Register your models here.

@admin.register(Cliente)
class ClienteVIew(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'email' )