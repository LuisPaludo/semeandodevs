from django.contrib import admin

from pedidos.models import Pedido, PedidoLivro, Cupom
# Register your models here.

class PedidoLivrosinLine(admin.TabularInline):
    model = PedidoLivro
    extra = 1

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'data')
    inlines = [PedidoLivrosinLine]

@admin.register(Cupom)
class CupomAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')