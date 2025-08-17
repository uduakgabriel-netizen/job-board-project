from django.shortcuts import render
from rest_framework import generics, permissions
from .models import user, job, Application, company
from .serializers import userSerializer, jobSerializer, ApplicationSerializer, companySerializer

 
class UserListCreateView(generics.ListCreateAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class userDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
class JobListCreateView(generics.ListCreateAPIView):
    queryset = job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)
        

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    
class ApplicationListCreateView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(Application=self.request.user)


class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save()
        
        
class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_update(self, serializer):
        serializer.save()
        
        
