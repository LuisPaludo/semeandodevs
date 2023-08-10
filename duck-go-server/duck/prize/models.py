from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Prizes(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    code = models.CharField(max_length=20, unique=True)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    generated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='generated_prizes')
    times_to_be_used = models.IntegerField(validators=[MinValueValidator(0)])
    times_used = models.IntegerField()
    used_by = models.ManyToManyField(User, related_name='used_prizes', blank=True)

    def __str__(self):
        return self.name