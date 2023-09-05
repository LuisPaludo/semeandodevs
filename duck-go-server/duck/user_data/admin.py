from django.contrib import admin
from .models import History, CustomUser

# Register your models here.

@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email','is_partner')
