from django.db import models
from django.db.models import Sum
from django.contrib.auth.models import User
from datetime import date, timedelta
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator

import random
import string

from user_data.models import CustomUser, History
from user_data.models import validate_image_size

def validate_expiry_date(value):
    today = date.today()
    one_week_from_today = today + timedelta(weeks=1)

    if value < one_week_from_today:
        raise ValidationError("The expiry date must be at least one week from today.")

def generate_random_code():
    # Escolhe 20 caracteres aleatoriamente do conjunto de letras maiúsculas e dígitos
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=20))

class PrizeCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Prizes(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    generated_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='generated_prizes')
    times_to_be_used = models.IntegerField(default=0,validators=[MinValueValidator(1), MaxValueValidator(3000)])
    times_used = models.IntegerField(default=0)
    cost_in_points = models.IntegerField(default=0,validators=[MinValueValidator(100), MaxValueValidator(1000)])
    category = models.ForeignKey(PrizeCategory, on_delete=models.SET_NULL, null=True, related_name='prizes')
    logo = models.ImageField(upload_to='logos', null=True, blank=True, default='users_photos/default.png', validators=[validate_image_size], max_length=500)   
    expiry_date = models.DateField(validators=[validate_expiry_date])
    disabled = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class RedeemedPrizes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='redeemed_prizes')
    prize = models.ForeignKey(Prizes, on_delete=models.CASCADE, related_name='claimed_by')
    redeemed_at = models.DateTimeField(auto_now_add=True)
    code = models.CharField(max_length=20, unique=True)
    qr_code = models.URLField(null=True, blank=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'prize')

    def save(self, *args, **kwargs):
        # Only generate a code if the instance doesn't already have one
        if not self.code:
            self.code = generate_random_code()
            while RedeemedPrizes.objects.filter(code=self.code).exists():
                self.code = generate_random_code()

        # Only generate a QR code if the instance doesn't already have one
        if not self.qr_code:
            self.qr_code = f'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={self.code}'

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user} -> {self.prize}'


