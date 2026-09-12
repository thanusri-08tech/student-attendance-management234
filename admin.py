from django.contrib import admin

from .models import Attendance, Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'roll_no', 'department', 'year', 'section', 'email', 'created_at')
    search_fields = ('name', 'roll_no', 'email')
    list_filter = ('department', 'year', 'section')


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'date', 'status', 'created_at')
    list_filter = ('status', 'date')
    search_fields = ('student__name', 'student__roll_no')
