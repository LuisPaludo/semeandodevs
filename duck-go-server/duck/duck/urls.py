from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers, permissions
from drf_yasg import openapi
from drf_yasg.views import get_schema_view


from locations.api.viewsets import LocationViewSet, TuristicPointViewSet
from prize.api.viewsets import PrizesViewSet, RedeemedPrizesViewSet, RedeemedPrizesQrCodeViewSet, PartnerCreatedPrizesViewSet, PrizeCategoryViewSet
from user_data.api.viewsets import HistoryViewSet, PartnerDetailsViewSet

# from user_data.api.viewsets import CustomRegisterView

router = routers.DefaultRouter()
router.register("locais", LocationViewSet)
router.register("premios", PrizesViewSet)
router.register('premios-categoria', PrizeCategoryViewSet)
router.register('resgatar', RedeemedPrizesViewSet)
router.register('resgatar-cupons-criados', PartnerCreatedPrizesViewSet )
router.register('qr-code',RedeemedPrizesQrCodeViewSet)
router.register("turistic-points", TuristicPointViewSet)
router.register("history", HistoryViewSet, basename="history")
router.register("partner-details", PartnerDetailsViewSet, basename="partner-details")


schema_view = get_schema_view(
    openapi.Info(
        title="DuckGO API",
        default_version="v1",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path(
        "api/swagger.<slug:format>",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "api/swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("accounts/", include("dj_rest_auth.urls")),
    path("accounts/registration/", include("dj_rest_auth.registration.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
