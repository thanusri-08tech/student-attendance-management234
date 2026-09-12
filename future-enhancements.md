# Future Enhancements

The current system fully satisfies the CRUD and SOP requirements for this
project. If extended further, the following improvements could be made:

1. **Authentication & Roles** — Add login for teachers/admins using
   Django's auth system and DRF token/JWT authentication, so only
   authorized users can modify records.
2. **Bulk Attendance Marking** — Allow marking attendance for an entire
   class/section in one action instead of one student at a time.
3. **Attendance Reports & Export** — Generate downloadable CSV/PDF
   attendance reports per student, per class, or per date range.
4. **Charts & Analytics** — Add visual charts (e.g. attendance trends over
   time) to the dashboard using a charting library.
5. **Pagination & Infinite Scroll** — Improve performance for very large
   student/attendance datasets on the frontend.
6. **Email/SMS Notifications** — Notify parents or students automatically
   when attendance falls below a threshold.
7. **Switch to PostgreSQL** — For a production deployment, replace SQLite
   with PostgreSQL for better concurrency and scalability.
8. **Deployment** — Containerize the app with Docker and deploy the
   backend and frontend to a cloud provider.
