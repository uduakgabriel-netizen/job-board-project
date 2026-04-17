
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer,
    EmployerRegisterSerializer,
    JobSerializer,
    ApplicationSerializer,
    CompanySerializer,
    CategorySerializer,
)
from .models import Job, Application, Company, Category
from .permissions import IsEmployer, IsJobSeeker, IsOwnerOrAdmin
from rest_framework import viewsets
from django.shortcuts import render

User = get_user_model()



# Register View

def index(request):
    return render(request, "index.html")


def signup(request):
    return render(request, "signup.html")

def enroll(request):
    return render(request, "enroll.html")

def signup_seeker(request):
    return render(request, "signup_seeker.html")


def signup_employer(request):
    return render(request, "signup_employer.html")

class RegisterView(generics.CreateAPIView):
    """Public registration — always creates a job_seeker."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class EmployerRegisterView(generics.CreateAPIView):
    """Separate registration endpoint — creates an employer account."""
    queryset = User.objects.all()
    serializer_class = EmployerRegisterSerializer
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


# ──────────────────────────────────────────────────────────────
#  JobViewSet — with company-ownership enforcement
# ──────────────────────────────────────────────────────────────

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer

    # TASK #8: Filtering & Searching
    filterset_fields = ['category', 'location', 'is_remote', 'is_approved', 'is_live']
    search_fields = ['title', 'description', 'company__name', 'location']
    ordering_fields = ['created_at', 'salary', 'title']

    def get_permissions(self):
        if self.action == "create":
            return [IsEmployer()]
        if self.action in ["update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]
        return [permissions.AllowAny()]

    # ---------- helpers ----------

    def _is_admin(self, user):
        """Return True if the user is a staff member or has the admin role."""
        return user.is_staff or user.role == "admin"

    def _get_employer_company(self, user):
        """
        Return the Company linked to the employer, or None if one
        hasn't been created yet.
        """
        try:
            return user.company  # OneToOneField reverse accessor
        except Company.DoesNotExist:
            return None

    # ---------- CREATE ----------

    def create(self, request, *args, **kwargs):
        user = request.user

        # Admins bypass all ownership checks
        if self._is_admin(user):
            return super().create(request, *args, **kwargs)

        # Requirement 1: employer must have a company profile
        company = self._get_employer_company(user)
        if company is None:
            return Response(
                {
                    "error": "You must create a company profile before posting jobs.",
                    "detail": "Use POST /api/companies/ to create your company first.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Requirement 2: if a company ID was supplied, it must match
        requested_company_id = request.data.get("company")
        if requested_company_id is not None:
            if int(requested_company_id) != company.id:
                return Response(
                    {
                        "error": "Permission denied.",
                        "detail": "You can only create jobs for your own company.",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        # Proceed with normal creation (perform_create will inject defaults)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = self.request.user

        # Admins: trust whatever data was submitted
        if self._is_admin(user):
            serializer.save()
            return

        # Requirement 3: force employer, company, is_approved, is_live
        company = self._get_employer_company(user)
        serializer.save(
            employer=user,
            company=company,
            is_approved=False,
            is_live=False,
        )

    # ---------- UPDATE ----------

    def update(self, request, *args, **kwargs):
        job = self.get_object()  # also triggers IsOwnerOrAdmin check
        user = request.user

        # Admins bypass ownership checks
        if not self._is_admin(user):
            # Requirement 4: employers cannot change the company field
            requested_company_id = request.data.get("company")
            if requested_company_id is not None and int(requested_company_id) != job.company_id:
                return Response(
                    {
                        "error": "Permission denied.",
                        "detail": "You cannot change the company associated with an existing job.",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        return super().update(request, *args, **kwargs)

    def perform_update(self, serializer):
        user = self.request.user

        if self._is_admin(user):
            serializer.save()
            return

        # Non-admin: lock employer and company to original values
        serializer.save(
            employer=serializer.instance.employer,
            company=serializer.instance.company,
        )

    # partial_update (PATCH) inherits from update, so it's protected too


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