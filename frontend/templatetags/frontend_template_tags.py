from django import template
from django.forms import Field, BoundField

register = template.Library()


@register.filter
def display_name(value):
    words = value.split('_')
    capitalized_words = [word.capitalize() for word in words]
    return ' '.join(capitalized_words)


@register.inclusion_tag('frontend/templatetags/bs_form_field.html')
def bs_form_field(field: BoundField, input_type=None):
    return {'field': field, 'type': input_type}


@register.inclusion_tag('frontend/templatetags/bs_error.html')
def bs_errors(errors):
    return {'errors': errors}


@register.inclusion_tag('frontend/templatetags/bs_form.html')
def bs_form(form, button_name='submit'):
    return {'form': form, 'button_name': button_name}