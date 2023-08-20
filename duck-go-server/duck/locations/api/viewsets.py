from rest_framework.viewsets import ModelViewSet
from locations.models import Location
from .serializers import LocationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.filters import SearchFilter

from .serializers import TuristicPointSerializer
from locations.models import TuristicPoint

class LocationViewSet(ModelViewSet):
    permission_classes = (AllowAny,)  # NOVA LINHA
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    http_method_names = ["get"]

class TuristicPointViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TuristicPointSerializer
    queryset = TuristicPoint.objects.all()
    http_method_names = ["get"]
    filter_backends = [SearchFilter,]
    search_fields = ['numbers_qrcode',]

