import re

from rest_framework.exceptions import ErrorDetail


def assemble_payload(obj, *fields):
    """Assemble a dictionary from the given object and field names."""
    payload = {}
    for field in fields:
        payload[field] = getattr(obj, field)
    return payload


def extract_error_details(error_field) -> list[ErrorDetail]:
    """When an error occurs during the processing of a request,
    django will store the string representations of `ErrorDetail`s in
    the field that caused the error.
    This function extracts these errors to easily assert against."""
    regex = r"""ErrorDetail\(string=['"](?P<string>.*)['"], code=['"](?P<code>.*)['"]\)"""
    matches = re.findall(regex, str(error_field))
    errors = []
    for match in matches:
        string, code = match
        errors.append(ErrorDetail(string=string, code=code))
    return errors
