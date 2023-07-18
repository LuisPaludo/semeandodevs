from livros.views import LivroView, AutorView
from rest_framework import routers
from django.urls import path, include


router = routers.DefaultRouter()
router.register('livros', LivroView)
router.register('autores', AutorView)


urlpatterns = [
    path('livros/', include(router.urls))
]
