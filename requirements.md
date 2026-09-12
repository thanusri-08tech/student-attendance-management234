# Requirements

## Problem Statement
Manual attendance tracking using paper registers or spreadsheets is
error-prone, hard to search, and difficult to analyze. A digital system is
needed that lets staff:
- Maintain a central list of students
- Record daily attendance per student
- Instantly see attendance statistics
- Search and filter records quickly

## Objectives
1. Provide full CRUD operations for student records.
2. Provide full CRUD operations for attendance records.
3. Enforce validation both on the frontend (for user experience) and the
   backend (for data integrity).
4. Prevent duplicate roll numbers and duplicate attendance entries for the
   same student on the same day.
5. Provide a dashboard with live, database-driven statistics.
6. Provide search and filter functionality for both students and attendance.
7. Ensure the system runs entirely locally with no third-party
   Backend-as-a-Service (no Firebase, no Supabase).

## Functional Requirements
- Add, view, update, and delete students.
- Add, view, update, and delete attendance records.
- Search students by name or roll number.
- Filter students by department, year, and section.
- Filter attendance by date and status.
- Display dashboard statistics (total students, present, absent, attendance
  percentage).

## Non-Functional Requirements
- The UI must be responsive and usable on different screen sizes.
- The API must return meaningful, consistent JSON error responses.
- The system must be simple enough for a student to explain confidently in
  a viva.
- The codebase must be clean, documented, and organized into logical
  folders (backend/frontend/docs/postman).

## Out of Scope
- User authentication / login system (not required by the SOP)
- Deployment to a live production server
- Sending emails/notifications
