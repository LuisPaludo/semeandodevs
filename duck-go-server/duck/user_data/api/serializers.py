from django.db.models import Sum
from django.utils import timezone
from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer

from user_data.models import CustomUser, History

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'username', 'first_name','last_name', 'email', 'cep', 'cpf','cnpj',
            'addres_rua', 'address_UF', 'address_cidade', 
            'profile_photo', 'data_nascimento','is_partner','company_name','email_contact','number_contact',
        )
        read_only_fields = ('is_partner',)

class HistorySerializer(serializers.ModelSerializer):    
    class Meta:
        model = History
        fields = ('date', 'points', 'total_points', 'description')
        read_only_fields = ('total_points',) # tornando 'total_points' somente leitura

    def create(self, validated_data):
        user = validated_data.pop('user', self.context['request'].user)

        # Verificar a soma total de pontos que o usuário obteve hoje
        today_min = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_max = timezone.now().replace(hour=23, minute=59, second=59, microsecond=999999)
        total_points_today = History.objects.filter(user=user, date__range=(today_min, today_max)).aggregate(total_points=Sum('points'))['total_points'] or 0

        # Calcule o total_points
        daily_limit = 700
        points = validated_data.get('points', 0)
        points_left_for_today = daily_limit - total_points_today
        
        # Se os pontos deste post excederem o limite diário, ajuste-os
        if points_left_for_today < points:
            validated_data['points'] = points_left_for_today

        # Calcule o total_points
        previous_total_points = user.user_history.aggregate(total_points=Sum('points'))['total_points'] or 0
        validated_data['total_points'] = previous_total_points + validated_data['points']

        history = History.objects.create(user=user, **validated_data)
        return history

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    cep = serializers.CharField(max_length=13)
    cpf = serializers.CharField(max_length=20)
    addres_rua = serializers.CharField(max_length=255)
    address_UF = serializers.CharField(max_length=2)
    address_cidade = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    profile_photo = serializers.ImageField(required=False, allow_null=True, default=None)
    data_nascimento = serializers.DateField(required=False)
    accepted_terms = serializers.BooleanField()

    class Meta:
        model = CustomUser
        fields = (
            'username', 'first_name','last_name','password', 'email', 'cep', 'cpf',
            'addres_rua', 'address_UF', 'address_cidade', 
            'profile_photo', 'data_nascimento','accepted_terms'
        )

    def validate_accepted_terms(self, value):
        """
        Check that accepted_terms is set to True.
        """
        if value is not True:
            raise serializers.ValidationError("You must accept the terms to register.")
        return value

    def custom_signup(self, request, user):
        user.cep = self.validated_data.get('cep', '')
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.cpf = self.validated_data.get('cpf', '')
        user.addres_rua = self.validated_data.get('addres_rua', '')
        user.address_UF = self.validated_data.get('address_UF', '')
        user.address_cidade = self.validated_data.get('address_cidade', '')
        user.email = self.validated_data.get('email', '')
        user.profile_photo = self.validated_data.get('profile_photo', None)
        user.data_nascimento = self.validated_data.get('data_nascimento', None)
        user.accepted_terms = self.validated_data.get('accepted_terms', None)
        user.save()


    def get_cleaned_data(self):
        super().get_cleaned_data()
        return {
            **super().get_cleaned_data(),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'cep': self.validated_data.get('cep', ''),
            'cpf': self.validated_data.get('cpf', ''),
            'addres_rua': self.validated_data.get('addres_rua', ''),
            'address_UF': self.validated_data.get('address_UF', ''),
            'address_cidade': self.validated_data.get('address_cidade', ''),
            'data_nascimento': self.validated_data.get('data_nascimento', ''),
            'email': self.validated_data.get('email', ''),
            'profile_photo': self.validated_data.get('profile_photo', ''),
            'accepted_terms': self.validated_data.get('accepted_terms', ''),
        }

    