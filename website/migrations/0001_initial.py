# Generated by Django 4.2.1 on 2023-05-15 02:52

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Identifier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latin_name', models.CharField(max_length=128)),
                ('common_name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='PlantInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bloom_start', models.CharField(choices=[('Jan', 'January'), ('Feb', 'February'), ('Mar', 'March'), ('Apr', 'April'), ('May', 'May'), ('Jun', 'June'), ('Jul', 'July'), ('Aug', 'August'), ('Sep', 'September'), ('Oct', 'October'), ('Nov', 'November'), ('Dec', 'December')], max_length=8)),
                ('bloom_end', models.CharField(choices=[('Jan', 'January'), ('Feb', 'February'), ('Mar', 'March'), ('Apr', 'April'), ('May', 'May'), ('Jun', 'June'), ('Jul', 'July'), ('Aug', 'August'), ('Sep', 'September'), ('Oct', 'October'), ('Nov', 'November'), ('Dec', 'December')], max_length=8)),
                ('height_min', models.DecimalField(decimal_places=2, max_digits=3)),
                ('height_max', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='Plant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=10240)),
                ('date_added', models.DateField(default=datetime.date(2023, 5, 14))),
                ('identifiers', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='plant_identifier', to='website.identifier')),
                ('info', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='plant_information', to='website.identifier')),
            ],
        ),
    ]
