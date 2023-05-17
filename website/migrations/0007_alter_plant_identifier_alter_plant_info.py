# Generated by Django 4.2.1 on 2023-05-16 18:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0006_alter_plantinformation_height_max_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='identifier',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='plants', to='website.plantidentifier'),
        ),
        migrations.AlterField(
            model_name='plant',
            name='info',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='plants', to='website.plantinformation'),
        ),
    ]
