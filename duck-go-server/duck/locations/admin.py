from django.contrib import admin
from .models import TuristicPoint, Location
# Register your models here.

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(TuristicPoint)
class TuristicPointAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
