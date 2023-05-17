from django.utils.timezone import now
from django.db import models

'''
    This file defines the database models for the application.
    Each object is stored as a set of records (if nested) in database table(s).

    NOTES:
    * 'related_name':
        specifies the name of the reverse relationship of an object
        (useful for object relationships)
    * 'choices':
        specifies what values a field can hold
        (only applicable on some field types)
    * When updating/renaming field names, make sure to change the corresponding 
      serializer ('fields') and view ('filterset_fields') fields as necessary.
    * When making changes to a model, run 'python manage.py makemigrations'
      followed by 'python manage.py migrate' for the changes to be committed to the database.
      For changes which affect the API interface, run the following commands:
        
'''


class PlantIdentifier(models.Model):
    latin_name = models.CharField(max_length=128)
    common_name = models.CharField(max_length=128)


class PlantInformation(models.Model):
    MONTHS = [('Jan', 'January'),
              ('Feb', 'February'),
              ('Mar', 'March'),
              ('Apr', 'April'),
              ('May', 'May'),
              ('Jun', 'June'),
              ('Jul', 'July'),
              ('Aug', 'August'),
              ('Sep', 'September'),
              ('Oct', 'October'),
              ('Nov', 'November'),
              ('Dec', 'December'),
              ('Nil', 'Not Set')]
    bloom_start = models.CharField(choices=MONTHS, max_length=8, default=MONTHS[-1][0])
    bloom_end = models.CharField(choices=MONTHS, max_length=8, default=MONTHS[-1][0])
    height_min = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    height_max = models.DecimalField(max_digits=6, decimal_places=2, default=0)


class Plant(models.Model):
    identifier = models.OneToOneField(PlantIdentifier, on_delete=models.CASCADE, related_name='plant')
    info = models.OneToOneField(PlantInformation, on_delete=models.CASCADE, related_name='plant')
    description = models.CharField(max_length=10240)
    datetime_added = models.DateTimeField(default=now)
