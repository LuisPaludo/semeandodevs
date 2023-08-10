from datetime import date
from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.core.validators import MinValueValidator


class History(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='user_history')
    date = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField()
    total_points = models.IntegerField(validators=[MinValueValidator(0)])
    description = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f'{self.user.username} -> date: {self.date} -> points: {self.points}'
    
class User_Info(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='user_info')
    cep = models.CharField(max_length=8)
    cpf = models.CharField(max_length=11)
    addres_rua = models.CharField(max_length=255)
    address_UF = models.CharField(max_length=2)
    address_cidade = models.CharField(max_length=255)
    email = models.EmailField()
    profile_photo = models.ImageField(upload_to='users_photos', null=True, blank=True)





