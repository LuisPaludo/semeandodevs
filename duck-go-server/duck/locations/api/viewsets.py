from rest_framework.viewsets import ModelViewSet
from locations.models import Location
from .serializers import LocationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class LocationViewSet(ModelViewSet):
    permission_classes = (AllowAny,)  # NOVA LINHA
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    http_method_names = ["get"]