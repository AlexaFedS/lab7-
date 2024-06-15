from django_filters import rest_framework as filters
from .models import Disease, History

class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass

class DiseaseFilter(filters.FilterSet):
    numb = filters.RangeFilter()

    class Meta:
        model  = Disease
        fields = ['numb']

class StoryFilter(filters.FilterSet):
    date_receipte = filters.DateFromToRangeFilter()

    class Meta:
        model = History
        fields = ['date_receipte']