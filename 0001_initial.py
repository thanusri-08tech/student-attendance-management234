import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('roll_no', models.CharField(max_length=50, unique=True)),
                ('department', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('year', models.PositiveSmallIntegerField(
                    help_text='Year of study, e.g. 1-6',
                    validators=[
                        django.core.validators.MinValueValidator(1),
                        django.core.validators.MaxValueValidator(6),
                    ]
                )),
                ('section', models.CharField(max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[('Present', 'Present'), ('Absent', 'Absent')], max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='attendance_records',
                    to='attendance.student'
                )),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.AddConstraint(
            model_name='attendance',
            constraint=models.UniqueConstraint(
                fields=('student', 'date'),
                name='unique_attendance_per_student_per_day'
            ),
        ),
    ]
