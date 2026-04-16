
from django.db import models
from django.contrib.auth.models import AbstractUser


# Custom User Model

class User(AbstractUser):
    ROLE_CHOICES = (
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='job_seeker')

    def __str__(self):
        return f"{self.username} ({self.role})"



# Company

class Company(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="company")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True) 
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name



# Category

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
<<<<<<< HEAD
    
    ## i have some error here please check it later
=======
>>>>>>> 3ddb219 (frontend integration)



# Job

class Job(models.Model):
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="jobs")
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="jobs")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="jobs")
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_remote = models.BooleanField(default=False)
<<<<<<< HEAD
=======
    is_approved = models.BooleanField(default=False)
    is_live = models.BooleanField(default=False)
>>>>>>> 3ddb219 (frontend integration)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



# Application

class Application(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    cover_letter = models.TextField(blank=True)
<<<<<<< HEAD
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    applied_at = models.DateTimeField(auto_now_add=True)
=======
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)  # TASK #11
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
>>>>>>> 3ddb219 (frontend integration)

    class Meta:
        unique_together = ('job', 'applicant')  # prevent applying twice

    def __str__(self):
        return f"{self.applicant.username} → {self.job.title} ({self.status})"
<<<<<<< HEAD
=======

>>>>>>> 3ddb219 (frontend integration)
