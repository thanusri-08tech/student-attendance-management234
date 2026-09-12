from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Student(models.Model):
    """Represents a single student enrolled in the institution."""

    name = models.CharField(max_length=150)
    roll_no = models.CharField(max_length=50, unique=True)
    department = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    year = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(6)],
        help_text='Year of study, e.g. 1-6'
    )
    section = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name} ({self.roll_no})'


class Attendance(models.Model):
    """Represents a single day's attendance record for a student."""

    PRESENT = 'Present'
    ABSENT = 'Absent'
    STATUS_CHOICES = [
        (PRESENT, 'Present'),
        (ABSENT, 'Absent'),
    ]

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
        # Prevent duplicate attendance records for the same student
        # on the same date at the database level.
        constraints = [
            models.UniqueConstraint(
                fields=['student', 'date'],
                name='unique_attendance_per_student_per_day'
            )
        ]

    def __str__(self):
        return f'{self.student.roll_no} - {self.date} - {self.status}'
