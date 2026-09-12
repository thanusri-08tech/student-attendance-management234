# Challenges and Solutions

## 1. Preventing Duplicate Attendance Entries
**Challenge:** A student could accidentally be marked attendance twice for
the same date.
**Solution:** Added a database-level `UniqueConstraint` on
`(student, date)` in the `Attendance` model, plus a matching check in the
serializer's `validate()` method so the API returns a clear
`400 Bad Request` message instead of a raw database integrity error.

## 2. CORS Blocking Frontend Requests
**Challenge:** The React dev server (port 5173) and Django server (port
8000) run on different origins, so browsers block requests by default.
**Solution:** Installed and configured `django-cors-headers`, explicitly
allowing `http://localhost:5173` and `http://127.0.0.1:5173` via the
`CORS_ALLOWED_ORIGINS` setting, documented in `backend/.env.example`.

## 3. Keeping Error Messages User-Friendly
**Challenge:** By default, DRF error responses have varying shapes
depending on the type of error, which made frontend error handling messy
and risked exposing technical details to end users.
**Solution:** Implemented a custom exception handler
(`attendance/exceptions.py`) so every error response has the same
predictable shape (`{ "error": true, "detail": ... }`), and a single
`extractErrorMessage()` helper on the frontend converts that into a plain
sentence for the user.

## 4. Validating Data on Both Ends
**Challenge:** Relying only on frontend validation is unsafe, since the
API can be called directly (e.g. via Postman or a script), bypassing the
UI entirely.
**Solution:** Implemented validation twice: lightweight checks in React
for instant feedback, and authoritative checks in the DRF serializers
(required fields, unique roll number/email, year range, valid status,
valid foreign key, duplicate attendance) that always run regardless of
which client sent the request.

## 5. Deciding on Frontend Navigation
**Challenge:** Adding a full routing library felt like over-engineering
for a project of this scope.
**Solution:** Used simple tab-based state in `App.jsx` to switch between
Dashboard, Students, Mark Attendance, and Attendance Records — easy to
read, easy to explain in a viva, and sufficient for the project's needs.
