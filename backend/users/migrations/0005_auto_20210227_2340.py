# Generated by Django 3.1.6 on 2021-02-27 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20210226_1336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='/avatar/default.jpg', upload_to='avatar'),
        ),
    ]
