

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



# Job Serializer

class JobSerializer(serializers.ModelSerializer):
    employer = serializers.ReadOnlyField(source='employer.username')
    company = CompanySerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'location', 'salary',
            'is_remote', 'created_at', 'employer', 'company', 'category'
        ]



# Application Serializer

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.ReadOnlyField(source='applicant.username')
    job = serializers.ReadOnlyField(source='job.title')

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'applicant', 'cover_letter',
            'status', 'applied_at'
        ]
