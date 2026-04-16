<<<<<<< HEAD


from rest_framework import serializers
from .models import User, Company, Category, Job, Application



# User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Ensure password is hashed
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role=validated_data.get('role', 'job_seeker')
        )
        return user



# Company Serializer

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'owner', 'name', 'description', 'website', 'location']



# Category Serializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class JobSerializer(serializers.ModelSerializer):
    employer = serializers.ReadOnlyField(source="employer.username")

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "description",
            "location",
            "salary",
            "is_remote",
            "created_at",
            "company",
            "category",
            "employer",
        ]
        read_only_fields = ["id", "created_at", "employer"]


# Application Serializer



class ApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.ReadOnlyField(source="applicant.username")

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "applicant",
            "cover_letter",
            "status",
            "applied_at",
        ]
        read_only_fields = ["id", "applicant", "status", "applied_at"]
=======


from rest_framework import serializers
from .models import User, Company, Category, Job, Application



# User Serializer (Public Registration — always creates a job_seeker)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True},  # Prevent clients from setting role
        }

    def create(self, validated_data):
        # Strip role if it somehow slips through — force to job_seeker
        validated_data.pop('role', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role='job_seeker',
        )
        return user


# Employer Registration Serializer (Separate endpoint — creates an employer)

class EmployerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True},  # Prevent clients from overriding
        }

    def create(self, validated_data):
        validated_data.pop('role', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role='employer',
        )
        return user



# Company Serializer

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'owner', 'name', 'description', 'website', 'location']



# Category Serializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class JobSerializer(serializers.ModelSerializer):
    employer = serializers.ReadOnlyField(source="employer.username")
    company_name = serializers.ReadOnlyField(source="company.name")

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "description",
            "location",
            "salary",
            "is_remote",
            "is_approved",
            "is_live",
            "created_at",
            "company",
            "company_name",
            "category",
            "employer",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "employer",
            "is_approved",
            "is_live",
        ]
        extra_kwargs = {
            # company is optional in the request — auto-assigned if omitted
            "company": {"required": False},
        }


# Application Serializer



class ApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.ReadOnlyField(source="applicant.username")
    job_title = serializers.ReadOnlyField(source="job.title")

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "job_title",
            "applicant",
            "cover_letter",
            "resume",
            "status",
            "applied_at",
            "updated_at",
        ]
        read_only_fields = ["id", "applicant", "status", "applied_at", "updated_at"]

    def validate(self, attrs):
        """Prevent duplicate applications at the serializer level."""
        request = self.context.get("request")
        if request and request.method == "POST":
            job = attrs.get("job")
            if job and Application.objects.filter(
                job=job, applicant=request.user
            ).exists():
                raise serializers.ValidationError(
                    "You have already applied for this job."
                )
        return attrs
>>>>>>> 3ddb219 (frontend integration)
