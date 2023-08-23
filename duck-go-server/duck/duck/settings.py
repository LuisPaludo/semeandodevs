"""
Django settings for duck project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from decouple import config
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_cleanup.apps.CleanupConfig',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'dj_rest_auth',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'corsheaders',
    'drf_yasg',  
    'locations',
    'user_data',
    'prize',
      
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = 'duck.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'duck.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': config('AUTH_PASSWORD_VALIDATORS_1') ,
    },
    {
        'NAME': config('AUTH_PASSWORD_VALIDATORS_2') ,
    },
    {
        'NAME': config('AUTH_PASSWORD_VALIDATORS_3') ,
    },
    {
        'NAME': config('AUTH_PASSWORD_VALIDATORS_4') ,
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = 'staticfiles'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Essa configuração define o caminho absoluto no sistema de arquivos onde os arquivos de mídia serão armazenados quando forem carregados pela aplicação.
#  No seu caso, 'duck/assets' é o diretório onde os arquivos de mídia serão armazenados.
MEDIA_ROOT = 'duck/assets'

# ssa configuração define o URL relativo usado para servir os arquivos de mídia. Quando um arquivo de mídia é carregado e 
# armazenado em MEDIA_ROOT, o URL completo para esse arquivo será construído usando MEDIA_URL + o caminho do arquivo relativo ao MEDIA_ROOT. 
# No seu caso, '/media/' é o URL relativo usado para servir arquivos de mídia. Isso significa que, quando você desejar acessar um arquivo de mídia, 
# você usará URLs como http://seu_domain/media/seu_arquivo.jpg.
MEDIA_URL = '/media/'


AUTH_USER_MODEL = 'user_data.CustomUser'

REST_FRAMEWORK = {
    # Essa opção define as classes de autenticação que serão aplicadas por padrão a todas as suas vistas da API REST.
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    # Essa opção define as classes de permissão padrão que serão aplicadas a todas as suas vistas da API REST. 
    # As classes de permissão controlam quem tem permissão para acessar os recursos da API
    # 'DEFAULT_PERMISSION_CLASSES': [  # AQUI
    #     'rest_framework.permissions.IsAuthenticated',
    # ]
}

# O SITE_ID é uma configuração do Django que indica qual site está sendo usado para a aplicação. 
# Geralmente, em uma aplicação com um único site, o valor padrão é 1. Isso é importante para as bibliotecas 
# django-allauth e dj-rest-auth para lidar com múltiplos sites caso você tenha mais de um site configurado.
SITE_ID = 1

# Essa seção de configuração está relacionada à biblioteca dj-rest-auth, que fornece endpoints de autenticação RESTful e 
# é construída sobre o django-allauth, que lida com autenticação e autorização em Django.
REST_AUTH = {
    # USE_JWT: Essa opção indica se a autenticação JWT (JSON Web Token) deve ser usada ou não. Quando configurada como True, 
    # a autenticação JWT será ativada.
    'USE_JWT': True,
    # Essa opção controla se o token JWT deve ser definido como um cookie HTTPOnly no cabeçalho da resposta. 
    # A opção False permite que o token JWT seja acessado por JavaScript (o que pode ser útil em algumas situações), 
    # enquanto True impede que o JavaScript acesse o token, aumentando a segurança.
    'JWT_AUTH_HTTPONLY': False,
    'REGISTER_SERIALIZER': 'user_data.api.serializers.CustomRegisterSerializer',
    'USER_DETAILS_SERIALIZER': 'user_data.api.serializers.CustomUserSerializer',

}

ACCESS_TOKEN_LIFETIME = config('ACCESS_TOKEN_LIFETIME', default=5, cast=int)
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=ACCESS_TOKEN_LIFETIME),
}


EMAIL_BACKEND = config('EMAIL_BACKEND')
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT')
EMAIL_USE_TLS = config('EMAIL_USE_TLS')
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')

ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True

ACCOUNT_ADAPTER = 'user_data.api.adapter.CustomAccountAdapter'
URL_FRONTEND = config('URL_FRONTEND', default='http://localhost:4200')

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:4200",
]

ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True   
ACCOUNT_USERNAME_REQUIRED = False

#Following is added to enable registration with email instead of username
AUTHENTICATION_BACKENDS = (
 # Needed to login by username in Django admin, regardless of `allauth`
 "django.contrib.auth.backends.ModelBackend",

 # `allauth` specific authentication methods, such as login by e-mail
 "allauth.account.auth_backends.AuthenticationBackend",
)