# Database Design

The system uses SQLite with two tables managed via the Django ORM.

## Student Table (`attendance_student`)

| Column      | Type              | Constraints                          |
|-------------|-------------------|---------------------------------------|
| id          | BigAutoField (PK) | Primary key, auto-increment           |
| name        | CharField(150)    | Required                              |
| roll_no     | CharField(50)     | Required, Unique                      |
| department  | CharField(100)    | Required                              |
| email       | EmailField        | Required, Unique, valid email format  |
| year        | PositiveSmallInt  | Required, between 1 and 6             |
| section     | CharField(10)     | Required                              |
| created_at  | DateTimeField     | Auto-generated on creation            |

## Attendance Table (`attendance_attendance`)

| Column      | Type              | Constraints                                   |
|-------------|-------------------|-------------------------------------------------|
| id          | BigAutoField (PK) | Primary key, auto-increment                     |
| student_id  | ForeignKey        | References `attendance_student.id`, required    |
| date        | DateField         | Required                                        |
| status      | CharField(10)     | Required, one of: `Present`, `Absent`           |
| created_at  | DateTimeField     | Auto-generated on creation                      |

A unique constraint (`unique_attendance_per_student_per_day`) is placed on
the combination of `(student_id, date)` so a student cannot have two
attendance records for the same day. Duplicate attempts return a
`400 Bad Request` from the API.

## Relationship

```
Student (1) ────────< (Many) Attendance
```

One student can have many attendance records. Each attendance record
belongs to exactly one student. Deleting a student cascades and deletes
their attendance records (`on_delete=models.CASCADE`), which is why the
frontend shows a warning in the delete confirmation dialog.

## Simple ER Diagram (Text Form)

```
+------------------+          +----------------------+
|     Student      |          |      Attendance       |
+------------------+          +----------------------+
| id (PK)          |<---------| student_id (FK)       |
| name             |    1   * | id (PK)                |
| roll_no (unique) |          | date                   |
| department       |          | status (Present/Absent)|
| email (unique)   |          | created_at             |
| year             |          +----------------------+
| section          |
| created_at       |
+------------------+
```
