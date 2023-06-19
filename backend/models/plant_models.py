from django.contrib.auth.models import User
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


class MonthChoices(models.TextChoices):
    JANUARY = 'Jan', 'January'
    FEBRUARY = 'Feb', 'February'
    MARCH = 'Mar', 'March'
    APRIL = 'Apr', 'April'
    MAY = 'May', 'May'
    JUNE = 'Jun', 'June'
    JULY = 'Jul', 'July'
    AUGUST = 'Aug', 'August'
    SEPTEMBER = 'Sep', 'September'
    OCTOBER = 'Oct', 'October'
    NOVEMBER = 'Nov', 'November'
    DECEMBER = 'Dec', 'December'
    NOT_SET = 'Nil', 'Not Set'


class PlantInformation(models.Model):
    bloom_start = models.CharField(choices=MonthChoices.choices, max_length=8, default=MonthChoices.NOT_SET)
    bloom_end = models.CharField(choices=MonthChoices.choices, max_length=8, default=MonthChoices.NOT_SET)
    height_min = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    height_max = models.DecimalField(max_digits=6, decimal_places=2, default=0)


class Plant(models.Model):
    common_name = models.CharField(max_length=128)
    latin_name = models.CharField(max_length=128)
    description = models.CharField(max_length=10240)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # This field automatically changes everytime the model is saved
    info = models.OneToOneField(PlantInformation, on_delete=models.CASCADE, related_name='plant')


class SubmissionStatusChoices(models.TextChoices):
    NOT_SUBMITTED = 'NIL', 'Not Submitted'
    APPROVED = 'APP', 'Approved'
    REJECTED = 'REJ', 'Rejected'
    PENDING = 'PEN', 'Pending'


class EditPlantRecord(models.Model):
    current_plant = models.ForeignKey(Plant, related_name='edits', on_delete=models.CASCADE)
    edits = models.JSONField()
    created_by = models.ForeignKey(User, related_name='plant_edits', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    comments = models.CharField(max_length=800, blank=True)
    submission_status = models.CharField(
        choices=SubmissionStatusChoices.choices,
        max_length=3,
        default=SubmissionStatusChoices.NOT_SUBMITTED
    )
