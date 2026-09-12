from rest_framework import serializers

from .models import Attendance, Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id', 'name', 'roll_no', 'department',
            'email', 'year', 'section', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_roll_no(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Roll number cannot be empty.')

        queryset = Student.objects.filter(roll_no__iexact=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError(
                'A student with this roll number already exists.'
            )
        return value

    def validate_email(self, value):
        value = value.strip().lower()
        queryset = Student.objects.filter(email__iexact=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError(
                'A student with this email already exists.'
            )
        return value

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError('Name is required.')
        return value.strip()

    def validate_department(self, value):
        if not value.strip():
            raise serializers.ValidationError('Department is required.')
        return value.strip()

    def validate_section(self, value):
        if not value.strip():
            raise serializers.ValidationError('Section is required.')
        return value.strip()


class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    roll_no = serializers.CharField(source='student.roll_no', read_only=True)

    class Meta:
        model = Attendance
        fields = [
            'id', 'student', 'student_name', 'roll_no',
            'date', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate(self, attrs):
        student = attrs.get('student', getattr(self.instance, 'student', None))
        date = attrs.get('date', getattr(self.instance, 'date', None))

        if student is not None and date is not None:
            queryset = Attendance.objects.filter(student=student, date=date)
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)
            if queryset.exists():
                raise serializers.ValidationError(
                    'Attendance for this student on this date is already recorded.'
                )
        return attrs
