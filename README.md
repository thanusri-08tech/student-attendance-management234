Student Attendance Management System

A complete CRUD-based web application developed as part of the college activity “Complete CRUD-Based Web Application Development.”

The project is designed to demonstrate the development of a full-stack application with a React frontend, Django REST Framework backend, REST API communication, and SQLite database.

---

📌 1. Project Title

Student Attendance Management System

---

🎯 2. Project Objective

The objective of this project is to develop a complete CRUD-based web application for managing student information and attendance-related records.

The application demonstrates the complete flow of data from the frontend interface to the backend REST API and database.

Main objectives:

- Develop a functional frontend application.
- Develop a backend using Django.
- Implement REST APIs using Django REST Framework.
- Connect the backend with an SQLite database.
- Implement Create, Read, Update, and Delete operations.
- Implement input validation.
- Handle frontend-backend communication.
- Perform functional testing.
- Maintain proper project documentation.
- Store and manage the complete project using GitHub.

---

🛠️ 3. Technologies Used

Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

Backend

- Python
- Django
- Django REST Framework

Database

- SQLite

Tools

- Visual Studio Code
- Git
- GitHub
- npm
- Python Virtual Environment

---

🏗️ 4. System Architecture

The application follows a basic three-layer architecture:

┌──────────────────────────┐
│       React Frontend     │
│                          │
│  User Interface          │
│  Forms                   │
│  Student Records         │
└────────────┬─────────────┘
             │
             │ HTTP / REST API
             ▼
┌──────────────────────────┐
│   Django REST Framework  │
│                          │
│  API Endpoints           │
│  Validation              │
│  Business Logic          │
└────────────┬─────────────┘
             │
             │ Database Operations
             ▼
┌──────────────────────────┐
│        SQLite DB         │
│                          │
│  Student Data            │
│  Attendance Data         │
└──────────────────────────┘

---

✨ 5. Key Features

Student Management

The application provides functionality to manage student records.

Create

Users can add new student information through the frontend form.

Read

Users can view the available student records.

Update

Existing student information can be modified.

Delete

Existing student records can be removed from the system.

---

Attendance Management

The application can be used to manage attendance-related information associated with students.

Attendance records can be created, viewed, modified, and deleted through the application and backend API where implemented.

---

🔄 6. CRUD Operations

The project demonstrates all four fundamental CRUD operations.

Operation| Function
Create| Add a new student/record
Read| Display existing records
Update| Edit existing information
Delete| Remove an existing record

CRUD Flow

User
  │
  ▼
React Frontend
  │
  ▼
REST API
  │
  ▼
Django Backend
  │
  ▼
SQLite Database

---

🔌 7. REST API

The backend uses Django REST Framework (DRF) to provide RESTful API functionality.

The REST API acts as the communication layer between the React frontend and Django backend.

API operations include:

- GET – Retrieve records
- POST – Create records
- PUT/PATCH – Update records
- DELETE – Delete records

Example API flow:

React Application
       │
       │ HTTP Request
       ▼
Django REST API
       │
       ▼
SQLite Database
       │
       │ HTTP Response
       ▼
React Application

---

🗄️ 8. Database

The application uses SQLite for database storage.

SQLite is integrated with Django through Django's database framework.

The database is used to persist application data instead of storing records only in the browser.

Database responsibilities

- Store student information
- Store attendance-related information
- Maintain persistent records
- Support CRUD operations
- Provide data to the REST API

---

✅ 9. Data Validation

Input validation is implemented to reduce incorrect or incomplete data entry.

Validation can include:

- Required field validation
- Valid student information
- Appropriate input formats
- Prevention of invalid submissions
- Backend validation through Django/DRF

Both frontend and backend validation can be used to improve data reliability.

---

🧪 10. Testing

The application is tested to verify that the major functionalities work correctly.

Functional Testing

Test Case| Expected Result
Add student| Student should be created
View students| Existing records should be displayed
Edit student| Student information should be updated
Delete student| Selected record should be removed
Invalid form submission| Validation message should be displayed
API request| Appropriate API response should be returned
Database operation| Data should be stored/retrieved correctly

Testing Areas

- Frontend functionality
- Backend functionality
- REST API communication
- CRUD operations
- Form validation
- Database operations
- Frontend-backend integration

---

📁 11. Project Structure

student-attendance-management/
│
├── backend/
│   │
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── attendance/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── tests.py
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
├── LICENSE
└── README.md

«The exact files and folders may vary slightly depending on the final project implementation.»

---

⚙️ 12. Installation and Setup

Prerequisites

Install the following before running the project:

- Python 3.x
- Node.js
- npm
- Git

---

Step 1 – Clone the Repository

git clone https://github.com/nithishthirumoorthy07-tech/student-attendance-management22.git

Navigate into the project:

cd student-attendance-management22

---

🐍 13. Backend Setup

Navigate to the backend directory:

cd backend

Create a Python virtual environment:

python -m venv venv

Windows

Activate the virtual environment:

venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

---

🗃️ 14. Database Setup

Run Django migrations:

python manage.py makemigrations

python manage.py migrate

This creates and updates the required SQLite database tables.

---

▶️ 15. Start the Backend Server

Run:

python manage.py runserver

The Django development server will normally be available at:

http://127.0.0.1:8000/

---

⚛️ 16. Frontend Setup

Open another terminal.

Navigate to the frontend directory:

cd frontend

Install the required packages:

npm install

Start the React development server:

npm run dev

Vite will display the local frontend URL in the terminal.

Open that URL in a web browser.

---

🔗 17. Frontend–Backend Integration

The React frontend communicates with the Django REST Framework backend through HTTP requests.

React
  │
  │ GET / POST / PUT / PATCH / DELETE
  ▼
Django REST Framework
  │
  ▼
SQLite

The backend processes the request and returns the appropriate response to the frontend.

---

🔐 18. Environment Configuration

Environment-specific configuration can be maintained using an environment file.

An example configuration file is provided as:

.env.example

Sensitive configuration values should not be committed directly to the public repository.

---

📋 19. API Functionality

The API supports the standard REST operations required for CRUD functionality.

GET

Used to retrieve existing records.

POST

Used to create a new record.

PUT / PATCH

Used to update an existing record.

DELETE

Used to remove a record.

Example:

Frontend
   │
   ├── GET ──────► Retrieve records
   │
   ├── POST ─────► Create record
   │
   ├── PUT ──────► Update record
   │
   └── DELETE ───► Delete record

---

📊 20. Application Workflow

Start
  │
  ▼
Open Application
  │
  ▼
View Student Records
  │
  ├───────────────┐
  │               │
  ▼               ▼
Add Student    Select Student
  │               │
  ▼               ├── Edit
Create Record     │
  │               └── Delete
  ▼
Database
  │
  ▼
Updated Records

---

🧩 21. Backend Components

Models

Django models define the structure of the application data.

Serializers

Django REST Framework serializers convert database objects into API responses and validate incoming data.

Views

Views handle API requests and perform the required CRUD operations.

URLs

URL routing connects API endpoints with their corresponding views.

---

🖥️ 22. Frontend Components

The React frontend provides the user interface for interacting with the system.

Typical frontend responsibilities include:

- Displaying student records
- Providing forms
- Sending API requests
- Displaying API responses
- Handling user input
- Showing validation/error messages
- Updating the interface after CRUD operations

---

🛡️ 23. Error Handling

The application handles common errors such as:

- Invalid input
- Empty required fields
- API request failures
- Database-related errors
- Invalid record operations

Appropriate messages can be displayed to the user when an operation cannot be completed.

---

📱 24. User Interface

The application provides a simple web interface for managing student information.

The interface is designed to make CRUD operations easy to access and understand.

---

📚 25. Learning Outcomes

Through this project, the following concepts are demonstrated:

- Full-stack web application development
- React.js fundamentals
- Django framework
- Django REST Framework
- REST API development
- CRUD operations
- Database integration
- SQLite
- Form validation
- Frontend-backend communication
- Git and GitHub
- Application testing
- Project documentation

---

🎓 26. SOP Requirement Mapping

SOP Requirement| Implementation
Frontend Development| React.js
Backend Development| Django
REST API| Django REST Framework
Database| SQLite
Create Operation| Implemented
Read Operation| Implemented
Update Operation| Implemented
Delete Operation| Implemented
Validation| Frontend/Backend validation
Testing| Functional testing
Documentation| README.md
Version Control| Git/GitHub

---

🚀 27. Future Enhancements

The system can be extended with additional features such as:

- User authentication
- Role-based access
- Attendance reports
- Attendance percentage calculation
- Export to CSV/PDF
- Advanced search and filtering
- Dashboard analytics
- Cloud database deployment
- Production deployment

These features are not required for the basic CRUD implementation and can be added in future versions.

---

🔗 28. Repository

GitHub Repository:

https://github.com/thanusri-08tech/student-attendance-management234

---

👨‍💻 29. Developer

thanusri k

Department: computer science Engineering (CSE)

Institution: V.S.B. Engineering College, Karur

---

📄 30. License

This project is developed for educational and academic purposes as part of a college activity.
