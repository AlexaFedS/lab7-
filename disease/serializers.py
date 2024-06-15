from .models import Disease, User, History, SetDisease
from rest_framework import serializers

class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = ["id", "name", "description", "doctor", "numb"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "is_admin"]

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ["id", "user", "date_receipte", "date_discharge"]

class SetDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetDisease
        fields = ["id", "disease", "story", "status"]

class SetDiseaseSerializerUser(serializers.ModelSerializer):
    class Meta:
        model = SetDisease
        fields = ["id", "disease", "story", "status"]
