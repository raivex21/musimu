# Generated by Django 3.1.6 on 2021-02-26 05:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0026_auto_20210226_1007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='author_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='classroom',
            name='students',
            field=models.ManyToManyField(through='api.Enrollment', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='classroom',
            name='teacher_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='classrooms', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='enrollment',
            name='student_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrolled', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
