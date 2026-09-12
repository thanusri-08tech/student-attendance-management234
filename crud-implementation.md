# CRUD Implementation

This document explains, end-to-end, how each CRUD operation flows through
the system for both the Student and Attendance resources.

## Create
1. User fills the "Add Student" form (or "Mark Attendance" form) in React.
2. `StudentForm.jsx` / `AttendanceForm.jsx` runs client-side validation
   (required fields, valid email, valid year range, valid status).
3. On success, `services/api.js` sends a `POST` request to
   `/api/students/` or `/api/attendance/`.
4. The Django `StudentViewSet`/`AttendanceViewSet` `create()` method calls
   the serializer, which re-validates everything server-side (uniqueness of
   roll number/email, valid status choice, valid student ID, duplicate
   attendance check).
5. If valid, `serializer.save()` uses the Django ORM to `INSERT` a row into
   SQLite. The API responds `201 Created` with the new record.
6. If invalid, the API responds `400 Bad Request` with field-level errors,
   which the frontend displays as a friendly message.

## Read
1. When a list page loads (Student List, Attendance Records, Dashboard),
   React calls `GET /api/students/`, `GET /api/attendance/`, or
   `GET /api/dashboard/`.
2. The corresponding ViewSet's `get_queryset()` applies any search/filter
   query parameters (e.g. `?search=`, `?department=`, `?date=`) using the
   Django ORM's `filter()`/`Q()` objects.
3. The serializer converts the queryset into JSON, which DRF returns with
   `200 OK`.
4. Reading a single record works the same way via `/api/students/{id}/`
   or `/api/attendance/{id}/`, returning `404 Not Found` for a
   non-existent ID.

## Update
1. User clicks "Edit" on a student row, or toggles a status on an
   attendance row.
2. The form is pre-filled with the existing values.
3. On submit, React sends `PATCH /api/students/{id}/` or
   `PATCH /api/attendance/{id}/` with only the changed fields.
4. The serializer validates the new data (still enforcing uniqueness and
   duplicate checks, excluding the current record itself).
5. On success, the ORM issues an `UPDATE` statement and the API responds
   `200 OK` with the updated object.

## Delete
1. User clicks "Delete" on a student or attendance row.
2. The frontend shows a confirmation modal (`StudentList.jsx` /
   `AttendanceList.jsx`) before doing anything irreversible.
3. On confirmation, React sends `DELETE /api/students/{id}/` or
   `DELETE /api/attendance/{id}/`.
4. The ViewSet's `destroy()` method deletes the row via the ORM
   (`instance.delete()`) and returns `200 OK` with a confirmation message.
5. Deleting a student cascades to delete all of their attendance records,
   which is explained to the user in the confirmation dialog.

## Persistence Guarantee
Because every operation above goes through Django's ORM into the SQLite
file `backend/database/db.sqlite3`, all data survives page refreshes,
frontend restarts, and backend restarts. No data is stored only in
`localStorage` or React state.
