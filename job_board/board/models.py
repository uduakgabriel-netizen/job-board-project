# from django.db import models
# from django.contrib.auth.models import AbstractUser


# # models for user, job, applicn  ation and company


# class User(AbstractUser):
#     role = models.CharField((""), max_length=50, choices=[
#         ('job seeker' 'Job Seeker'),
#         ('employer' 'Employer'),
#     ])
#     user_id = models.IntegerField((""))
#     name = models.CharField(max_length=100)
#     email = models.EmailField((""), max_length=100)
#     password = models.CharField((""), max_length=50)
    
    
#     def __str__(self):
#         return self.username
   


# class job(models.Model):
#     job_id = models.IntegerField((""))
#     tille = models.CharField(max_length=100)
#     description = models.TextField() 
#     company = models.CharField(max_length=100)
#     location = models.CharField(max_length=100)
#     # salary = models.DecimalField(max_digits=10,     decimal_places=2)
#     posted_date = models.DateTimeField(auto_now_add=True)
#     posted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    
    
    
#     def __str__(self):
#         return self.title
    
    
    
# class Application(models.Model):
#     status_choices = [
#         ('pending', 'Pendin'),
#         ('accepted', 'Accepted'),
#         ('rejected', 'Rejected'),
#     ]
#     status = models.CharField(max_length=10, choices=status_choices, default='pending')
#     Application = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
#     user = models.IntegerField((""))
#     job = models.ForeignKey(job, on_delete=models.CASCADE, related_name='applications')
#     resume = models.FileField(upload_to='resumes/')
#     cover_letter = models.TextField(blank=True, null=True)
     
#     def __str__(self):
#         return f"{self.user.username} - {self.job.title} ({self.status})"


# class company(models.Model):
#     location = models.CharField(max_length=100) 
#     name = models.CharField(max_length=100)
#     description = models.TextField()
    
    
#     def __str__(self):
#         return self.name


from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    role = models.CharField(
        "Role",  # Added a verbose name for clarity
        max_length=50, 
        choices=[
            ('job_seeker', 'Job Seeker'),  # Corrected tuple format and value
            ('employer', 'Employer'),
        ]
    )
    # The 'username', 'email', 'password' and 'user_id' fields are inherited from AbstractUser.
    # Defining them again is redundant and can cause conflicts.

    name = models.CharField(max_length=100) # This can be used for the user's full name.

    def __str__(self):
        return self.username
    
    # class Meta:
    #     permission = [
    #         ("approve_job, approve_job_posting")
    #     ]


class Job(models.Model):  # Corrected class name to follow Python's CamelCase convention
    # 'job_id' is automatically created by Django, so this field is redundant.
    title = models.CharField(max_length=100)  # Corrected 'tille' to 'title'
    description = models.TextField() 
    # Use a ForeignKey to the company model for better data integrity
    company = models.ForeignKey('Company', on_delete=models.CASCADE, related_name='jobs')
    location = models.CharField(max_length=100)
    # Salary field, commented out if you don't need it.
    # salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    posted_date = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')
    
    def __str__(self):
        return self.title


class Application(models.Model):
    status_choices = [
        ('pending', 'Pending'), # Corrected typo 'Pendin' to 'Pending'
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='pending')
    
    # 'user' and 'Application' fields are redundant. One ForeignKey is enough.
    # The ForeignKey should point to the user who submitted the application.
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications') # Corrected 'job' to 'Job'
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True, null=True)
      
    def __str__(self):
        # The f-string uses a corrected field name 'applicant'
        return f"{self.applicant.username} - {self.job.title} ({self.status})"


class Company(models.Model): # Corrected class name to CamelCase
    name = models.CharField(max_length=100) 
    def __str__(self):
        return self.name 
    
    
groups = models.ManyToManyField(
    'auth.Group',
    related_name='board_users_groups',  # Corrected keyword argument
    blank=True,
    help_text='The groups this user belongs to.',
    related_query_name='user',
)
user_permissions = models.ManyToManyField(
    'auth.Permission',
    related_name='board_users_permissions',  # Corrected keyword argument
    blank=True,
    help_text='Specific permissions for this user.',
    related_query_name='user',
)