# Job Board API  

A simple Job Board API built with **Django REST Framework**. This project allows users to register, log in, manage profiles, post jobs, apply for jobs, and manage companies. It’s designed as an MVP (Minimum Viable Product), but can be extended into a full-featured platform like Upwork or Indeed.  

---

## Features 
- User registration & authentication (via **JWT**).  
- Separate profiles for **Job Seekers** and **Employers**.  
- Employers can create and manage job postings.  
- Job seekers can browse jobs and submit applications.  
- Company profiles management.  
- CRUD (Create, Read, Update, Delete) operations for jobs, applications, and companies.  
- API endpoints powered by Django REST Framework.  

---

## Entity Relationship Diagram (ERD) 
![ERD](./docs/erd.png)  
*(Add the ERD image you created here by saving it into a `docs/` folder.)*  

---

## Tech
- **Backend:** Django, Django REST Framework  
- **Database:** SQLite (default, can switch to PostgreSQL)  
- **Authentication:** JWT (via `djangorestframework-simplejwt`)  
- **Tools:** Python, Pipenv/venv for environment management  

---

## API Endpoints 📌  

### 🔑 Authentication (JWT)  
- `POST /api/auth/register/` – Register a new user  
- `POST /api/auth/login/` – Login user (returns JWT access & refresh tokens)  
- `POST /api/auth/logout/` – Logout user (blacklists token)  
- `GET /api/auth/profile/` – Get authenticated user profile  
- `PUT /api/auth/profile/` – Update authenticated user profile  

---

### 💼 Jobs
- `GET /api/jobs/` – List all jobs (with optional filters like title, location, category)  
- `POST /api/jobs/` – Create a new job (Employers only)  
- `GET /api/jobs/<id>/` – Retrieve job details  
- `PUT /api/jobs/<id>/` – Update job (Employer only)  
- `DELETE /api/jobs/<id>/` – Delete job (Employer only)  

---

### 📄 Applications
- `POST /api/jobs/<id>/apply/` – Apply to a job (Job Seeker only)  
- `GET /api/applications/` – List applications of the authenticated user  
- `GET /api/applications/<id>/` – Retrieve application details  
- `PUT /api/applications/<id>/` – Update application status (Employer only)  
- `DELETE /api/applications/<id>/` – Withdraw application (Job Seeker only)  

---

### 🏢 Companies
- `GET /api/companies/` – List all companies  
- `POST /api/companies/` – Create a new company (Employer only)  
- `GET /api/companies/<id>/` – Retrieve company details  
- `PUT /api/companies/<id>/` – Update company profile (Employer only)  
- `DELETE /api/companies/<id>/` – Delete company (Employer only)  

---

### 📂 Categories
- `GET /api/categories/` – List all categories  
- `POST /api/categories/` – Create a category (Admin only)  
- `PUT /api/categories/<id>/` – Update a category (Admin only)  
- `DELETE /api/categories/<id>/` – Delete a category (Admin only)  

---

## Installation & Setup 

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-board-api.git
   cd job-board-api