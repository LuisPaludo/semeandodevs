from datetime import date
from pickle import TRUE
from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils.text import slugify

def validate_image_size(value):
    imagesize= value.size
    
    if imagesize > 2097152:
        raise ValidationError("The maximum file size that can be uploaded is 2MB")
    else:
        return value

class CustomUser(AbstractUser):
    cep = models.CharField(max_length=13)
    cpf = models.CharField(max_length=20, blank=True, null = True)
    cnpj = models.CharField(max_length =20, blank=True, null = True, unique=True)
    addres_rua = models.CharField(max_length=255)
    address_UF = models.CharField(max_length=2)
    address_cidade = models.CharField(max_length=255)
    email = models.EmailField()
    profile_photo = models.ImageField(upload_to='users_photos', null=True, blank=True,default='users_photos/default.png', validators=[validate_image_size], max_length=500)    
    data_nascimento = models.DateField(null=True, blank=True)
    accepted_terms = models.BooleanField(default=False)
    is_partner = models.BooleanField(default=False)
    company_name = models.CharField(max_length=50,blank=True, null=True, unique=True)
    company_name_slug = models.SlugField(unique=True, blank=True, null=True)
    email_contact = models.EmailField(blank = True, null = True)
    number_contact = models.IntegerField(blank=True, null = True)
    company_description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.username}'
    
    def save(self, *args, **kwargs):
        # Se o company_name estiver presente e não for nulo ou vazio
        if self.company_name and not self.company_name.isspace():
            self.company_name_slug = slugify(self.company_name)
        
        super(CustomUser, self).save(*args, **kwargs)

class History(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_history')
    date = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField(default=0)
    total_points = models.IntegerField(validators=[MinValueValidator(0)])
    description = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f'{self.user.username}'