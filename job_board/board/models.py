from django.db import models
from django.contrib.auth.models import AbstractUser


class user(AbstractUser):
    role = models.CharField(_(""), max_length=50, choose=[
        ('job seeker' 'Job Seeker'),
        ('employer' 'Employer'),
    ])
    user_id = models.IntegerField(_(""))
    name = models.charield(max_length=100)
    email = models.EmailField(_(""), max_length=100)
    password = models.CharField(_(""), max_length=50)
    
    
    def __str__(self):
        return self.username
   


class job(models.Model):
    job_id = models.IntegerField(_(""))
    tille = models.CharField(max_length=100)
    description = models.TextField() 
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    # salary = models.DecimalField(max_digits=10,     decimal_places=2)
    posted_date = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(user, on_delete=models.CASCADE, related_name='jobs')
    
    
    
    def __str__(self):
        return self.title
    
    
    
class Application(models.Model):
    status_choices = [
        ('pending', 'Pendin'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='pending')
    Application = models.ForgheignKey(user, on_delete=models.CASCADE, related_name='applications')
    user = models.IntegerField(_(""))
    job = models.ForeignKey(job, on_delete=models.CASCADE, related_name='applications')
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True, null=True)
     
    def __str__(self):
        return f"{self.user.username} - {self.job.title} ({self.status})"


class company(models.Model):
    location = models.CharField(max_length=100) 
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    
    def __str__(self):
        return self.name