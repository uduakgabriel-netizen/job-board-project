
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer, CompanySerializer,CategorySerializer
from .models import Job, Application, Company,Category
from rest_framework import viewsets 
from django.shortcuts import render

User = get_user_model()



# Register View

def index(request):
    return render(request,"index.html")


def signup(request):
    return render(request,"signup.html")

def enroll(request):
    return render(request,"enroll.html")

def signup_seeker(request):
    return render(request,"signup_seeker.html")


def signup_employer(request):
    return render(request,"signup_employer.html")

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny] 

 

# Login View (JWT)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        from django.contrib.auth import authenticate

        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }
            })
        return Response({"error": "Invalid credentials"}, status=400)



# Logout View

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"})
        except Exception:
            return Response({"error": "Invalid token"}, status=400)



# Profile View

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class IsEmployer(permissions.BasePermission):
    """Custom permission to allow only Employers to post/update jobs."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "employer"

    
    
class IsJobSeeker(permissions.BasePermission):
    """Only Job Seekers can apply for jobs."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "job_seeker"

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsEmployer()]
        return [permissions.AllowAny()]

 
    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by("-applied_at")
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.action == "create":
            return [IsJobSeeker()]
        elif self.action in ["update", "partial_update"]:
            # Only Employers can update (change status)
            return [permissions.IsAuthenticated()]
        elif self.action == "destroy":
            # Only Job Seekers can withdraw their own application
            return [IsJobSeeker()]
        return [permissions.IsAuthenticated()]


    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == "job_seeker":
                return Application.objects.filter(applicant=user)
            elif user.role == "employer":
                return Application.objects.filter(job__employer=user)
        return Application.objects.none()
    
    
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            # Only Employers can manage companies
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
def __view(request):
    return render(request, 'index.html')