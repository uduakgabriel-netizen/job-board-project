"""
TASK #13: Critical Tests

Covers:
  1. Registration security — role injection blocked
  2. Job creation ownership — employer can't use another company
  3. Application uniqueness — can't apply twice
  4. Permission separation — job seekers can't post jobs
  5. Employer application scoping — only sees their own job's applications
  6. Company-less employer — blocked from posting jobs
"""

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from board.models import User, Company, Category, Job, Application


class BaseTestCase(TestCase):
    """Shared setup: create users, companies, categories, and a sample job."""

    def setUp(self):
        self.client = APIClient()

        # ── Users ──
        self.seeker = User.objects.create_user(
            username="seeker1",
            email="seeker@test.com",
            password="TestPass123!",
            role="job_seeker",
        )
        self.employer = User.objects.create_user(
            username="employer1",
            email="employer@test.com",
            password="TestPass123!",
            role="employer",
        )
        self.employer2 = User.objects.create_user(
            username="employer2",
            email="employer2@test.com",
            password="TestPass123!",
            role="employer",
        )
        self.admin_user = User.objects.create_user(
            username="admin1",
            email="admin@test.com",
            password="TestPass123!",
            role="admin",
            is_staff=True,
        )

        # ── Companies ──
        self.company = Company.objects.create(
            owner=self.employer,
            name="Employer1 Corp",
            description="A test company",
        )
        self.company2 = Company.objects.create(
            owner=self.employer2,
            name="Employer2 Inc",
            description="Another test company",
        )

        # ── Category ──
        self.category = Category.objects.create(name="Technology")

        # ── Job ──
        self.job = Job.objects.create(
            employer=self.employer,
            company=self.company,
            category=self.category,
            title="Django Developer",
            description="Build APIs",
            location="Remote",
            salary=80000,
            is_remote=True,
        )

    # ── Auth helpers ──

    def _login(self, user):
        """Authenticate and set JWT token on the client."""
        response = self.client.post("/api/token/", {
            "username": user.username,
            "password": "TestPass123!",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        return token


# ──────────────────────────────────────────────────────────────
#  TEST 1: Registration Security
# ──────────────────────────────────────────────────────────────

class RegistrationSecurityTest(BaseTestCase):
    """POST to /api/auth/register/ with role=admin still creates a job_seeker."""

    def test_register_ignores_role_injection(self):
        response = self.client.post("/api/auth/register/", {
            "username": "hacker",
            "email": "hack@test.com",
            "password": "TestPass123!",
            "role": "admin",  # Attempted injection
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username="hacker")
        self.assertEqual(user.role, "job_seeker")  # Must NOT be admin

    def test_employer_register_creates_employer_role(self):
        response = self.client.post("/api/auth/register/employer/", {
            "username": "newemployer",
            "email": "newemp@test.com",
            "password": "TestPass123!",
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username="newemployer")
        self.assertEqual(user.role, "employer")


# ──────────────────────────────────────────────────────────────
#  TEST 2: Job Creation — Company Ownership
# ──────────────────────────────────────────────────────────────

class JobCreationOwnershipTest(BaseTestCase):
    """Employer cannot create a job for a different company."""

    def test_employer_cannot_use_other_company(self):
        self._login(self.employer)
        response = self.client.post("/api/jobs/", {
            "title": "Sneaky Job",
            "description": "Trying to use another company",
            "location": "Nowhere",
            "company": self.company2.id,  # Not their company!
            "category": self.category.id,
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employer_auto_assigns_own_company(self):
        self._login(self.employer)
        response = self.client.post("/api/jobs/", {
            "title": "Legit Job",
            "description": "Auto-assigned company",
            "location": "Lagos",
            "category": self.category.id,
            # No company field — should auto-assign
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        job = Job.objects.get(title="Legit Job")
        self.assertEqual(job.company.id, self.company.id)
        self.assertEqual(job.employer.id, self.employer.id)

    def test_new_job_defaults_to_unapproved(self):
        self._login(self.employer)
        response = self.client.post("/api/jobs/", {
            "title": "Needs Approval",
            "description": "Should default to not approved",
            "location": "Abuja",
            "category": self.category.id,
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        job = Job.objects.get(title="Needs Approval")
        self.assertFalse(job.is_approved)
        self.assertFalse(job.is_live)


# ──────────────────────────────────────────────────────────────
#  TEST 3: Application Uniqueness
# ──────────────────────────────────────────────────────────────

class ApplicationUniquenessTest(BaseTestCase):
    """Job seeker cannot apply twice to the same job."""

    def test_cannot_apply_twice(self):
        self._login(self.seeker)

        # First application — should succeed
        response1 = self.client.post("/api/applications/", {
            "job": self.job.id,
            "cover_letter": "First attempt",
        })
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)

        # Second application — should fail (unique_together constraint)
        response2 = self.client.post("/api/applications/", {
            "job": self.job.id,
            "cover_letter": "Second attempt",
        })
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────────────────────────
#  TEST 4: Permission Separation
# ──────────────────────────────────────────────────────────────

class PermissionSeparationTest(BaseTestCase):
    """Job seekers cannot post jobs; employers cannot apply."""

    def test_job_seeker_cannot_post_job(self):
        self._login(self.seeker)
        response = self.client.post("/api/jobs/", {
            "title": "Illegal job",
            "description": "Seekers can't do this",
            "location": "Nowhere",
            "category": self.category.id,
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employer_cannot_apply_to_job(self):
        self._login(self.employer2)  # Use employer2 so they aren't the job owner
        response = self.client.post("/api/applications/", {
            "job": self.job.id,
            "cover_letter": "Employers shouldn't apply",
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_anonymous_cannot_post_job(self):
        response = self.client.post("/api/jobs/", {
            "title": "Anon job",
            "description": "Not allowed",
            "location": "Anon",
            "category": self.category.id,
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_anonymous_can_list_jobs(self):
        response = self.client.get("/api/jobs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# ──────────────────────────────────────────────────────────────
#  TEST 5: Employer Application Scoping
# ──────────────────────────────────────────────────────────────

class EmployerApplicationScopingTest(BaseTestCase):
    """Employer can only see applications for their own jobs."""

    def test_employer_sees_only_own_job_applications(self):
        # Create an application by seeker on employer1's job
        Application.objects.create(
            job=self.job,
            applicant=self.seeker,
            cover_letter="I want this job",
        )

        # employer2 should see zero applications (not their job)
        self._login(self.employer2)
        response = self.client.get("/api/applications/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 0)

        # employer1 should see one application
        self._login(self.employer)
        response = self.client.get("/api/applications/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)


# ──────────────────────────────────────────────────────────────
#  TEST 6: Company-less Employer
# ──────────────────────────────────────────────────────────────

class CompanylessEmployerTest(BaseTestCase):
    """Employer without a company profile cannot post jobs."""

    def test_employer_without_company_gets_400(self):
        # Create an employer with no company
        no_company_employer = User.objects.create_user(
            username="lonely_employer",
            email="lonely@test.com",
            password="TestPass123!",
            role="employer",
        )
        self._login(no_company_employer)

        response = self.client.post("/api/jobs/", {
            "title": "Homeless Job",
            "description": "No company attached",
            "location": "Void",
            "category": self.category.id,
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("company profile", response.data["error"].lower())


# ──────────────────────────────────────────────────────────────
#  TEST 7: Job Update Protection
# ──────────────────────────────────────────────────────────────

class JobUpdateProtectionTest(BaseTestCase):
    """Employers can only edit their own jobs and cannot switch company."""

    def test_employer_cannot_edit_other_employers_job(self):
        self._login(self.employer2)
        response = self.client.patch(f"/api/jobs/{self.job.id}/", {
            "title": "Hijacked Title",
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employer_cannot_change_company_on_job(self):
        self._login(self.employer)
        response = self.client.patch(f"/api/jobs/{self.job.id}/", {
            "company": self.company2.id,
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employer_can_edit_own_job_title(self):
        self._login(self.employer)
        response = self.client.patch(f"/api/jobs/{self.job.id}/", {
            "title": "Updated Job Title",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.job.refresh_from_db()
        self.assertEqual(self.job.title, "Updated Job Title")