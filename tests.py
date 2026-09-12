from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Attendance, Student


class StudentAPITests(APITestCase):

    def setUp(self):
        self.list_url = reverse('student-list')
        self.valid_payload = {
            'name': 'Asha Rao',
            'roll_no': 'CSE001',
            'department': 'CSE',
            'email': 'asha.rao@example.com',
            'year': 2,
            'section': 'A',
        }

    def test_create_student_with_valid_data(self):
        """1. Create student with valid data -> 201 Created."""
        response = self.client.post(self.list_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Student.objects.count(), 1)

    def test_create_student_missing_required_field(self):
        """2. Create student with missing required field -> 400 Bad Request."""
        payload = self.valid_payload.copy()
        del payload['name']
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_duplicate_roll_number_rejected(self):
        """3. Duplicate roll number -> 400 Bad Request with validation message."""
        self.client.post(self.list_url, self.valid_payload, format='json')
        duplicate = self.valid_payload.copy()
        duplicate['email'] = 'someone.else@example.com'
        response = self.client.post(self.list_url, duplicate, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_email_rejected(self):
        """4. Invalid email -> 400 Bad Request."""
        payload = self.valid_payload.copy()
        payload['email'] = 'not-an-email'
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_all_students(self):
        """5. Get students -> 200 OK with list."""
        self.client.post(self.list_url, self.valid_payload, format='json')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_student(self):
        """6. Get single student -> 200 OK."""
        create_response = self.client.post(self.list_url, self.valid_payload, format='json')
        student_id = create_response.data['id']
        detail_url = reverse('student-detail', args=[student_id])
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['roll_no'], 'CSE001')

    def test_update_student(self):
        """7. Update student -> 200 OK with updated data."""
        create_response = self.client.post(self.list_url, self.valid_payload, format='json')
        student_id = create_response.data['id']
        detail_url = reverse('student-detail', args=[student_id])
        response = self.client.patch(detail_url, {'section': 'B'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['section'], 'B')

    def test_delete_student(self):
        """8. Delete student -> 200 OK and record removed."""
        create_response = self.client.post(self.list_url, self.valid_payload, format='json')
        student_id = create_response.data['id']
        detail_url = reverse('student-detail', args=[student_id])
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Student.objects.count(), 0)

    def test_get_nonexistent_student_returns_404(self):
        """Get a student with an invalid/non-existing ID -> 404 Not Found."""
        detail_url = reverse('student-detail', args=[9999])
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class AttendanceAPITests(APITestCase):

    def setUp(self):
        self.student = Student.objects.create(
            name='Ravi Kumar',
            roll_no='CSE002',
            department='CSE',
            email='ravi.kumar@example.com',
            year=1,
            section='A',
        )
        self.list_url = reverse('attendance-list')

    def test_create_attendance(self):
        """9. Create attendance -> 201 Created."""
        payload = {'student': self.student.id, 'date': '2026-01-10', 'status': 'Present'}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Attendance.objects.count(), 1)

    def test_invalid_attendance_status_rejected(self):
        """10. Invalid attendance status -> 400 Bad Request."""
        payload = {'student': self.student.id, 'date': '2026-01-10', 'status': 'Maybe'}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_student_id_rejected(self):
        """11. Invalid student ID -> 400 Bad Request."""
        payload = {'student': 9999, 'date': '2026-01-10', 'status': 'Present'}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_attendance_records(self):
        """12. Get attendance records -> 200 OK."""
        Attendance.objects.create(student=self.student, date='2026-01-10', status='Present')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_duplicate_attendance_same_day_rejected(self):
        """Duplicate attendance for same student/date -> 400 Bad Request."""
        Attendance.objects.create(student=self.student, date='2026-01-10', status='Present')
        payload = {'student': self.student.id, 'date': '2026-01-10', 'status': 'Absent'}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_dashboard_stats(self):
        """Dashboard endpoint returns live-computed statistics."""
        Attendance.objects.create(student=self.student, date='2026-01-10', status='Present')
        response = self.client.get(reverse('dashboard-stats'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_students'], 1)
        self.assertEqual(response.data['present_count'], 1)
