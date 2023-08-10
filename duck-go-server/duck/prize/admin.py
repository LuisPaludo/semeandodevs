from django.contrib import admin
from .models import Prizes

# Register your models here.

@admin.register(Prizes)
class PrizesAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'generated_by')