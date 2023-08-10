from os import name
from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.

class Location(models.Model):
    name = models.CharField(max_length=255)
    resume = models.TextField()
    description = models.TextField()
    location_link = models.URLField(max_length=255, default='')
    coordinates_lat = models.CharField(max_length=255,default='')
    coordinates_long = models.CharField(max_length=255,default='')

    def __str__(self) -> str:
        return self.name

class TuristicPoint(models.Model):
    name = models.CharField(max_length=255)
    resume = models.TextField()
    description = models.TextField()
    numbers_qrcode = models.IntegerField(validators=[MinValueValidator(0)])
    qr_code = models.CharField(max_length=255)
    location = models.ForeignKey(Location,related_name='location_points',on_delete=models.SET_NULL, null=True)
    coordinates_lat = models.CharField(max_length=255,default='')
    coordinates_long = models.CharField(max_length=255,default='')
    points = models.IntegerField(validators=[MinValueValidator(0)], default=0)

    def __str__(self) -> str:
        return f'{self.name} -> Points: {self.points}' 