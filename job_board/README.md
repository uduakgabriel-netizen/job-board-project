 Job Board API

A RESTful API built with Django REST Framework for managing jobs, applications, and users. Employers can post jobs, job seekers can apply, and admins manage the platform.

    Features

JWT Authentication (Login, Register, Refresh)

Roles: Admin, Employer, Job Seeker

Employers: Create & manage jobs

Job Seekers: Browse & apply for jobs

Applications linked to jobs and users

    Tech Stack

Backend: Django 5, DRF

Auth: SimpleJWT

Database: SQLite (default)

Deployment Ready: PythonAnywhere / Render / Heroku

    Main Endpoints

Auth

POST /api/register/ → Register

POST /api/token/ → Login (JWT)

POST /api/token/refresh/ → Refresh token

Jobs

GET /api/jobs/ → List jobs

POST /api/jobs/ → Create job (Employer)

GET /api/jobs/{id}/ → Job details

Applications

POST /api/jobs/{job_id}/applications/ → Apply (Job Seeker)

GET /api/applications/ → View applications

    Setup (Local)
git clone https://github.com/your-username/job-board-api.git
cd job-board-api
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


API runs at  http://127.0.0.1:8000/

 Deployment (PythonAnywhere)

Create a new PythonAnywhere account.

Upload project code (via GitHub or manual upload).

Open a Bash console and set up venv:

python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser


Go to Web tab → Add new web app → Manual config (Django).

Point WSGI configuration file to your project’s wsgi.py.

Reload web app → Visit your deployed API! 

Roles

Admin: Manage via /admin/

Employer: Post jobs

Job Seeker: Apply to jobs