# Testing

## Automated Backend Tests
Automated tests are written using Django REST Framework's `APITestCase`
class, located in `backend/attendance/tests.py`. Run them with:

```bash
cd backend
python manage.py test
```

## Test Case Table

| Test Case ID | Test Description                                   | Input                                                             | Expected Result                                   | Actual Result | Status |
|---------------|-----------------------------------------------------|--------------------------------------------------------------------|----------------------------------------------------|----------------|--------|
| TC-01         | Create student with valid data                       | Valid student payload                                               | `201 Created`, student saved in DB                  | As expected    | Pass   |
| TC-02         | Create student with missing required field           | Payload missing `name`                                              | `400 Bad Request`                                   | As expected    | Pass   |
| TC-03         | Create student with duplicate roll number             | Roll number that already exists                                     | `400 Bad Request` with validation message           | As expected    | Pass   |
| TC-04         | Create student with invalid email                     | `email: "not-an-email"`                                             | `400 Bad Request`                                   | As expected    | Pass   |
| TC-05         | Get all students                                       | `GET /api/students/`                                                | `200 OK` with list of students                      | As expected    | Pass   |
| TC-06         | Get a single student                                   | `GET /api/students/{valid id}/`                                     | `200 OK` with student details                       | As expected    | Pass   |
| TC-07         | Update a student                                       | `PATCH /api/students/{id}/` with `{"section": "B"}`                 | `200 OK` with updated section                       | As expected    | Pass   |
| TC-08         | Delete a student                                       | `DELETE /api/students/{id}/`                                        | `200 OK`, student removed from DB                   | As expected    | Pass   |
| TC-09         | Get a non-existent student                              | `GET /api/students/9999/`                                            | `404 Not Found`                                     | As expected    | Pass   |
| TC-10         | Create attendance record                                | Valid `student`, `date`, `status`                                    | `201 Created`                                       | As expected    | Pass   |
| TC-11         | Create attendance with invalid status                  | `status: "Maybe"`                                                    | `400 Bad Request`                                   | As expected    | Pass   |
| TC-12         | Create attendance with invalid student ID              | `student: 9999`                                                      | `400 Bad Request`                                   | As expected    | Pass   |
| TC-13         | Get attendance records                                  | `GET /api/attendance/`                                               | `200 OK` with list of records                       | As expected    | Pass   |
| TC-14         | Create duplicate attendance for same student/date       | Second `POST` with same `student` + `date`                           | `400 Bad Request`                                   | As expected    | Pass   |
| TC-15         | Get dashboard statistics                                 | `GET /api/dashboard/`                                                | `200 OK` with live counts, no hard-coded values      | As expected    | Pass   |

## Manual API Testing with Postman
In addition to automated tests, the API was manually verified using the
Postman collection at `postman/student-attendance-api.json`. This
collection includes requests for every CRUD endpoint against
`http://127.0.0.1:8000`, and was used to confirm correct status codes and
response bodies during development.

## Manual Frontend Testing Checklist
- [ ] Add a student with valid data → appears in the student list.
- [ ] Try adding a student with a duplicate roll number → error message shown.
- [ ] Edit a student → changes reflected immediately in the list.
- [ ] Delete a student → confirmation modal appears; confirming removes the row.
- [ ] Search students by name/roll number → list filters correctly.
- [ ] Filter students by department/year/section → list filters correctly.
- [ ] Mark attendance for a student → appears in Attendance Records.
- [ ] Try marking attendance twice for the same student/date → error shown.
- [ ] Filter attendance by date/status → list filters correctly.
- [ ] Dashboard numbers update after adding/marking attendance.
- [ ] Stop the backend server → frontend shows a friendly "cannot reach server" message instead of a crash.
