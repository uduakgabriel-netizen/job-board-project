"""
URL configuration for job_board project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
<<<<<<< HEAD
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
=======
>>>>>>> 3ddb219 (frontend integration)
"""

from django.contrib import admin
from django.urls import path, include
<<<<<<< HEAD
from django.contrib import admin
from django.urls import path, include
=======
from django.conf import settings
from django.conf.urls.static import static
>>>>>>> 3ddb219 (frontend integration)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
<<<<<<< HEAD
from board.views import index
from board import views
urlpatterns = [
=======
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from board.views import index
from board import views

urlpatterns = [
    # Template views
>>>>>>> 3ddb219 (frontend integration)
    path('', index, name='index'),
    path("signup/", views.signup, name="signup"),
    path('enroll/', views.enroll, name='enroll'),
    path('signup/seeker/', views.signup_seeker, name='signup_seeker'),
    path('signup/employer/', views.signup_employer, name='signup_employer'),
<<<<<<< HEAD
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('admin/', admin.site.urls),
    path('api/', include('board.urls')),  # This line includes all URLs from your board app
    
]
=======

    # JWT Token endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

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
>>>>>>> 3ddb219 (frontend integration)
