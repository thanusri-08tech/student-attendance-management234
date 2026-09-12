# Installation Guide

## Prerequisites
- Python 3.10+ installed
- Node.js 18+ and npm installed
- Git installed

## 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/student-attendance-management.git
cd student-attendance-management
```

## 2. Backend Setup (Django REST Framework)

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your local environment file
cp .env.example .env
# (On Windows, use: copy .env.example .env)

# Apply database migrations
python manage.py migrate

# (Optional) create an admin account to use the Django admin panel
python manage.py createsuperuser

# Run the backend server
python manage.py runserver
```

The backend will be available at: `http://127.0.0.1:8000/`
The Django admin panel will be available at: `http://127.0.0.1:8000/admin/`

## 3. Frontend Setup (React + Vite)

Open a **new terminal window**, then:

```bash
cd frontend

# Install dependencies
npm install

# Create your local environment file
cp .env.example .env
# (On Windows, use: copy .env.example .env)

# Run the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173/`

## 4. Using the Application
1. Make sure both the backend (`:8000`) and frontend (`:5173`) are running
   at the same time, in separate terminals.
2. Open `http://localhost:5173/` in your browser.
3. Add a few students on the "Students" tab.
4. Mark attendance on the "Mark Attendance" tab.
5. View statistics on the "Dashboard" tab.

## 5. Running Backend Tests
```bash
cd backend
python manage.py test
```

## Troubleshooting
- **CORS errors in the browser console:** Confirm the backend is running
  and that `CORS_ALLOWED_ORIGINS` in `backend/.env` includes
  `http://localhost:5173`.
- **"Could not reach the server" in the UI:** Confirm the Django server is
  running on port 8000 and `VITE_API_BASE_URL` in `frontend/.env` points to
  `http://127.0.0.1:8000/api`.
- **Database errors after pulling new changes:** Re-run
  `python manage.py migrate`.
