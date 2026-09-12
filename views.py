from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Attendance, Student
from .serializers import AttendanceSerializer, StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    Provides full CRUD for the Student resource, plus search and filter
    support via query parameters:

        /api/students/?search=john          -> matches name or roll_no
        /api/students/?department=CSE
        /api/students/?year=2
        /api/students/?section=A
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Student.objects.all()
        params = self.request.query_params

        search = params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(roll_no__icontains=search)
            )

        department = params.get('department')
        if department:
            queryset = queryset.filter(department__iexact=department)

        year = params.get('year')
        if year:
            queryset = queryset.filter(year=year)

        section = params.get('section')
        if section:
            queryset = queryset.filter(section__iexact=section)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {'message': 'Student deleted successfully.'},
            status=status.HTTP_200_OK
        )


class AttendanceViewSet(viewsets.ModelViewSet):
    """
    Provides full CRUD for the Attendance resource, plus filter support:

        /api/attendance/?date=2026-09-10
        /api/attendance/?status=Present
        /api/attendance/?student=3
    """
    queryset = Attendance.objects.select_related('student').all()
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = Attendance.objects.select_related('student').all()
        params = self.request.query_params

        date = params.get('date')
        if date:
            queryset = queryset.filter(date=date)

        status_param = params.get('status')
        if status_param:
            queryset = queryset.filter(status__iexact=status_param)

        student_id = params.get('student')
        if student_id:
            queryset = queryset.filter(student_id=student_id)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {'message': 'Attendance record deleted successfully.'},
            status=status.HTTP_200_OK
        )


@api_view(['GET'])
def dashboard_stats(request):
    """
    Returns aggregate statistics for the dashboard. All numbers are
    computed live from the database - nothing here is hard-coded.
    """
    total_students = Student.objects.count()
    total_present = Attendance.objects.filter(status=Attendance.PRESENT).count()
    total_absent = Attendance.objects.filter(status=Attendance.ABSENT).count()
    total_records = total_present + total_absent

    attendance_percentage = (
        round((total_present / total_records) * 100, 2) if total_records > 0 else 0
    )

    return Response({
        'total_students': total_students,
        'present_count': total_present,
        'absent_count': total_absent,
        'attendance_percentage': attendance_percentage,
    })
