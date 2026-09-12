# System Architecture

## High-Level Flow

```
React frontend (Vite, port 5173)
        |
        |  HTTP requests (JSON) via Axios
        v
Django REST Framework API (port 8000)
        |
        |  Django ORM
        v
SQLite database (db.sqlite3)
```

The React frontend never talks to the database directly. Every action
(adding a student, marking attendance, viewing the dashboard) goes through
a REST API endpoint exposed by Django REST Framework, which in turn uses
the Django ORM to read from or write to the SQLite database.

## Component Breakdown

### Frontend (React + Vite)
- `App.jsx` — top-level component with simple tab-based navigation
  (Dashboard, Students, Mark Attendance, Attendance Records).
- `components/` — one component per concern (form, list, navbar, etc.)
- `services/api.js` — single place where all HTTP calls to the backend are
  defined, using Axios.

### Backend (Django + DRF)
- `config/` — Django project configuration (settings, root URLs).
- `attendance/` — the single Django app containing:
  - `models.py` — `Student` and `Attendance` ORM models
  - `serializers.py` — validation and JSON conversion
  - `views.py` — ViewSets implementing CRUD + dashboard stats endpoint
  - `urls.py` — REST endpoint routing (via DRF's `DefaultRouter`)
  - `admin.py` — Django admin registration for both models
  - `exceptions.py` — custom exception handler for consistent error JSON
  - `tests.py` — automated test suite

### Database (SQLite)
A single file (`backend/database/db.sqlite3`) created automatically when
migrations are run. Two tables: `attendance_student` and
`attendance_attendance`, linked by a foreign key.

## Why This Stack?
- **Django REST Framework** is a mature, well-documented way to build REST
  APIs quickly with built-in serialization, validation, and browsable API
  docs, without needing any third-party BaaS.
- **SQLite** requires zero setup and ships with Python, making the project
  trivial to run locally for a demonstration or viva.
- **React + Vite** gives a fast, modern frontend development experience
  with hot-reloading, while remaining simple enough for a beginner to
  understand and explain.
