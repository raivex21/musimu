# Generated by Django 3.1.6 on 2021-03-14 11:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_gradedquiz'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gradedquiz',
            options={'verbose_name_plural': 'Graded Quizzes'},
        ),
        migrations.AlterModelOptions(
            name='messages',
            options={'verbose_name_plural': 'Messages'},
        ),
        migrations.AddField(
            model_name='quiz',
            name='level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.level'),
        ),
    ]
