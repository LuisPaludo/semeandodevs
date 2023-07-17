from rest_framework import routers
from livros.views import LivroView
from django.urls import path, include

router = routers.DefaultRouter()
router.register('livros', LivroView) # nome do recurso / objeto
# router.register('autores', AutorView)

urlpatterns = [
    path('livros/', include(router.urls))
]