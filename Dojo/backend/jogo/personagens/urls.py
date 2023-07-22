from rest_framework.routers import DefaultRouter
from django.urls import path, include

from personagens.views import JogadorView


router = DefaultRouter()
router.register('jogadores', JogadorView)

urlpatterns = [
    path('jogadores/', include(router.urls)),  # nome do app
]