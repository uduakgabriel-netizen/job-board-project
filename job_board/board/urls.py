
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    JobViewSet,
    ApplicationViewSet,
    CompanyViewSet,
    RegisterView,
    LoginView,
    LogoutView,
    ProfileView,
)

# Router setup
router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='jobs')
router.register(r'applications', ApplicationViewSet, basename='applications')
router.register(r'companies', CompanyViewSet, basename='companies')

# URL patterns
urlpatterns = [
    # Auth endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),

    # Router endpoints
    path('', include(router.urls)),
]
