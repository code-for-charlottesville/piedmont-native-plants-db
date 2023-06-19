from django import forms


class PlantSearchForm(forms.Form):
    common_name = forms.CharField(required=False)
    latin_name = forms.CharField(required=False)
