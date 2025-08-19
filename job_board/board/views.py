from django.shortcuts import render
from rest_framework import generics, permissions
from .models import User, Job, Application, Company
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer, CompanySerializer

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    # No perform_create needed here unless you are setting a field on the user model, which is unusual.
    # The serializer itself handles user creation.

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
# ---------------------------------------------------------------------------------------------------

class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        # Assuming your 'job' model has a foreign key field named 'posted_by'
        serializer.save(posted_by=self.request.user)
        
class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
# ---------------------------------------------------------------------------------------------------

class ApplicationListCreateView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        # Assuming your 'Application' model has a foreign key field named 'applicant' or similar
        serializer.save(applicant=self.request.user)

class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
# ---------------------------------------------------------------------------------------------------

class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        # Assuming the company is linked to the user who created it
        serializer.save(owner=self.request.user) # Example: If company has a foreign key field 'owner'
    
class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_update(self, serializer):
        # This is fine, but you could also add logic to check permissions
        serializer.save()