from os import name
from django.db import models
from django.core.validators import MinValueValidator
from user_data.models import validate_image_size

# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=255)
    resume = models.TextField()
    description = models.TextField()
    location_link = models.URLField(max_length=255, default="")
    map_link = models.URLField(max_length=255, default="")
    coordinates_lat = models.CharField(max_length=255, default="")
    coordinates_long = models.CharField(max_length=255, default="")
    slug_field = models.SlugField(default="", blank=True, null=True)
    locations_photo = models.ImageField(
        upload_to="Locations",
        null=True,
        blank=True,
        validators=[validate_image_size],
        max_length=500,
    )
    photo_1 = models.ImageField(
        upload_to="Locations",
        null=True,
        blank=True,
        validators=[validate_image_size],
        max_length=500,
    )
    photo_2 = models.ImageField(
        upload_to="Locations",
        null=True,
        blank=True,
        validators=[validate_image_size],
        max_length=500,
    )
    photo_3 = models.ImageField(
        upload_to="Locations",
        null=True,
        blank=True,
        validators=[validate_image_size],
        max_length=500,
    )

    def __str__(self) -> str:
        return self.name


class TuristicPoint(models.Model):
    name = models.CharField(max_length=255)
    resume = models.TextField()
    description = models.TextField()
    numbers_qrcode = models.IntegerField(validators=[MinValueValidator(0)])
    qr_code = models.CharField(max_length=255, unique=True)
    location = models.ForeignKey(
        Location, related_name="location_points", on_delete=models.SET_NULL, null=True
    )
    coordinates_lat = models.CharField(max_length=255, default="")
    coordinates_long = models.CharField(max_length=255, default="")
    points = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    photo = models.ImageField(upload_to='Locations/Touristic_Points', null=True, blank=True, validators=[validate_image_size], max_length=500)    

    def __str__(self) -> str:
        return f"{self.name} -> Points: {self.points}"
