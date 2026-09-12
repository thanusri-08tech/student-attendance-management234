# API Documentation

Base URL (local development): `http://127.0.0.1:8000/api`

All request and response bodies are JSON. All error responses share this
shape:

```json
{
  "error": true,
  "detail": "A human-readable message, or a field-by-field validation object"
}
```

---

## Student Endpoints

### Create Student
- **Method:** POST
- **Endpoint:** `/api/students/`
- **Purpose:** Add a new student.
- **Request Body:**
```json
{
  "name": "Asha Rao",
  "roll_no": "CSE001",
  "department": "CSE",
  "email": "asha.rao@example.com",
  "year": 2,
  "section": "A"
}
```
- **Success Response (201 Created):**
```json
{
  "id": 1,
  "name": "Asha Rao",
  "roll_no": "CSE001",
  "department": "CSE",
  "email": "asha.rao@example.com",
  "year": 2,
  "section": "A",
  "created_at": "2026-09-12T10:00:00Z"
}
```
- **Error Responses:**
  - `400 Bad Request` — missing/invalid field, duplicate roll number, or duplicate email.

---

### Get All Students
- **Method:** GET
- **Endpoint:** `/api/students/`
- **Purpose:** List all students. Supports optional query params: `search`, `department`, `year`, `section`.
- **Example:** `/api/students/?search=asha&department=CSE`
- **Success Response (200 OK):** array/paginated list of student objects.

### Get Single Student
- **Method:** GET
- **Endpoint:** `/api/students/{id}/`
- **Purpose:** Retrieve one student's details.
- **Success Response (200 OK):** a single student object.
- **Error Response:** `404 Not Found` if the ID does not exist.

### Update Student
- **Method:** PUT or PATCH
- **Endpoint:** `/api/students/{id}/`
- **Purpose:** Edit an existing student. PATCH allows partial updates.
- **Request Body (PATCH example):**
```json
{ "section": "B" }
```
- **Success Response (200 OK):** the updated student object.
- **Error Responses:** `400 Bad Request` (invalid data), `404 Not Found` (invalid ID).

### Delete Student
- **Method:** DELETE
- **Endpoint:** `/api/students/{id}/`
- **Purpose:** Remove a student (and cascades to delete their attendance records).
- **Success Response (200 OK):**
```json
{ "message": "Student deleted successfully." }
```
- **Error Response:** `404 Not Found` if the ID does not exist.

---

## Attendance Endpoints

### Create Attendance
- **Method:** POST
- **Endpoint:** `/api/attendance/`
- **Purpose:** Record attendance for a student on a given date.
- **Request Body:**
```json
{ "student": 1, "date": "2026-09-12", "status": "Present" }
```
- **Success Response (201 Created):**
```json
{
  "id": 5,
  "student": 1,
  "student_name": "Asha Rao",
  "roll_no": "CSE001",
  "date": "2026-09-12",
  "status": "Present",
  "created_at": "2026-09-12T10:05:00Z"
}
```
- **Error Responses:**
  - `400 Bad Request` — invalid status, invalid/non-existent student ID, or duplicate record for the same student/date.

### Get All Attendance Records
- **Method:** GET
- **Endpoint:** `/api/attendance/`
- **Purpose:** List attendance records. Supports optional query params: `date`, `status`, `student`.
- **Example:** `/api/attendance/?date=2026-09-12&status=Present`
- **Success Response (200 OK):** array/paginated list of attendance objects.

### Get Single Attendance Record
- **Method:** GET
- **Endpoint:** `/api/attendance/{id}/`
- **Purpose:** Retrieve one attendance record.
- **Success Response (200 OK):** a single attendance object.
- **Error Response:** `404 Not Found` if the ID does not exist.

### Update Attendance
- **Method:** PUT or PATCH
- **Endpoint:** `/api/attendance/{id}/`
- **Purpose:** Edit an attendance record (e.g. change status).
- **Request Body (PATCH example):**
```json
{ "status": "Absent" }
```
- **Success Response (200 OK):** the updated attendance object.
- **Error Responses:** `400 Bad Request`, `404 Not Found`.

### Delete Attendance
- **Method:** DELETE
- **Endpoint:** `/api/attendance/{id}/`
- **Purpose:** Remove an attendance record.
- **Success Response (200 OK):**
```json
{ "message": "Attendance record deleted successfully." }
```
- **Error Response:** `404 Not Found`.

---

## Dashboard Endpoint

### Get Dashboard Statistics
- **Method:** GET
- **Endpoint:** `/api/dashboard/`
- **Purpose:** Return live counts for the dashboard UI.
- **Success Response (200 OK):**
```json
{
  "total_students": 10,
  "present_count": 42,
  "absent_count": 8,
  "attendance_percentage": 84.0
}
```
