from django.urls import path
from .views import (
    JobListCreateView,
    JobDetailView,
    UserListCreateView,
    UserDetailView,
    ApplicationListCreateView,
    ApplicationDetailView,
    CompanyListCreateView,
    CompanyDetailView
)

urlpatterns = [
    path("job/", JobListCreateView.as_view(), name="job-list-create"),
    path('job/<int:pk>/', JobDetailView.as_view(), name='job-details'),
    path("user/", UserListCreateView.as_view(), name="user-list-create"),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-details'),
    path("application/", ApplicationListCreateView.as_view(), name="application-list-create"),
    path('application/<int:pk>/', ApplicationDetailView.as_view(), name='application-details'),
    path("company/", CompanyListCreateView.as_view(), name="company-list-create"),
    path('company/<int:pk>/', CompanyDetailView.as_view(), name='company-details'),
]