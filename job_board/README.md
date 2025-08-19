# Job Board API  

A simple Job Board API built with **Django REST Framework**. This project allows users to register, create profiles, post jobs, apply for jobs, and manage applications. It’s designed as an MVP (Minimum Viable Product), but can be extended into a full-featured platform like Upwork or Indeed.  

---

## Features 
- User authentication & registration (using Django’s AbstractUser).  
- Separate profiles for **Job Seekers** and **Employers**.  
- Employers can create and manage job postings.  
- Job seekers can browse jobs and submit applications.  
- CRUD (Create, Read, Update, Delete) operations for jobs and applications.  
- API endpoints powered by Django REST Framework.  

---

## Entity Relationship Diagram (ERD) 
![ERD](./docs/erd.png)  
*(Add the ERD image you created here by saving it into a `docs/` folder.)*  

---

## Tech
- **Backend:** Django, Django REST Framework  
- **Database:** SQLite (default, can switch to PostgreSQL)  
- **Authentication:** JWT or Session-based authentication  
- **Tools:** Python, Pipenv/venv for environment management  

---

## API Endpoints 📌
### Authentication
- `POST /api/register/` – Register a new user  
- `POST /api/login/` – Login user  

### Jobs
- `GET /api/jobs/` – List all jobs  
- `POST /api/jobs/` – Create a new job (employers only)  
- `GET /api/jobs/<int:pk>/` – Retrieve job details  
- `PUT /api/jobs/<int:pk>/` – Update job (owner only)  
- `DELETE /api/jobs/<int:pk>/` – Delete job (owner only)  

### Applications
- `POST /api/jobs/<int:pk>/apply/` – Apply to a job  
- `GET /api/applications/` – List user applications  
- `GET /api/applications/<int:pk>/` – Retrieve application details  

### Profiles
- `GET /api/profile/` – View own profile  
- `PUT /api/profile/` – Update own profile  

---

## Installation & Setup 

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-board-api.git
   cd job-board-api

