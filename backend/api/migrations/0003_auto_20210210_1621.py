# Generated by Django 3.1.6 on 2021-02-10 08:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210210_1606'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='company',
            options={'verbose_name_plural': 'Companies'},
        ),
        migrations.AlterModelOptions(
            name='menu',
            options={'verbose_name_plural': 'Menus'},
        ),
        migrations.AlterModelOptions(
            name='steps',
            options={'verbose_name_plural': 'Steps'},
        ),
        migrations.AlterModelOptions(
            name='tags',
            options={'verbose_name_plural': 'Tags'},
        ),
        migrations.RenameField(
            model_name='company',
            old_name='address',
            new_name='description',
        ),
    ]
