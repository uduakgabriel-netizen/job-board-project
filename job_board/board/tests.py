from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Job, Company, Category


# =======================
# Job Tests
# =======================
class JobBoardTests(APITestCase):
    def setUp(self):
        # Create test user (employer)
        self.user = User.objects.create_user(username="testuser", password="pass123")

        # Create supporting models
        self.company = Company.objects.create(name="Test Corp")
        self.category = Category.objects.create(name="IT")

        # Create test job
        self.job = Job.objects.create(
            title="Software Engineer",
            description="Develop software",
            company=self.company,
            category=self.category,
            employer=self.user
        )

    def test_list_jobs(self):
        url = reverse("job-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_job(self):
        url = reverse("job-list")
        data = {
            "title": "Backend Developer",
            "description": "Work on backend APIs",
            "company": self.company.id,
            "category": self.category.id,
            "employer": self.user.id,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_job(self):
        url = reverse("job-detail", args=[self.job.id])
        data = {
            "title": "Updated Title",
            "description": "Updated description",
            "company": self.company.id,
            "category": self.category.id,
            "employer": self.user.id,
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_job(self):
        url = reverse("job-detail", args=[self.job.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


# =======================
# Company Tests
# =======================
class CompanyTests(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name="Test Company Ltd")

    def test_list_companies(self):
        url = reverse("company-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_company(self):
        url = reverse("company-list")
        data = {"name": "New Company Plc"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_company(self):
        url = reverse("company-detail", args=[self.company.id])
        data = {"name": "Updated Company Ltd"}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_company(self):
        url = reverse("company-detail", args=[self.company.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
