"""
URL configuration for job_board project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from board.views import index
from board import views
from board.views_social import GoogleLogin, LinkedInLogin

urlpatterns = [
    # Template views
    path('', index, name='index'),
    path("signup/", views.signup, name="signup"),
    path('enroll/', views.enroll, name='enroll'),
    path('signup/seeker/', views.signup_seeker, name='signup_seeker'),
    path('signup/employer/', views.signup_employer, name='signup_employer'),

    # JWT Token endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Social Auth endpoints
    path('api/auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api/auth/linkedin/', LinkedInLogin.as_view(), name='linkedin_login'),

    # Admin
    path('admin/', admin.site.urls),

    # Board API
    path('api/', include('board.urls')),

    # TASK #12: API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# Serve media files during development (TASK #11)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)