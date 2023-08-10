from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from prize.models import Prizes
from .serializers import PrizeSerializer

# se você deseja uma vista que forneça várias operações CRUD em um único endpoint, ModelViewSet é uma escolha mais completa.
class PrizeViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Prizes.objects.all()
    serializer_class = PrizeSerializer
    http_method_names = ["get"]