from rest_framework import serializers
from .models import Place
from users.serializers import UserShortSerializer


class PlaceSerializer(serializers.ModelSerializer):
    created_by = UserShortSerializer(read_only=True)

    class Meta:
        model = Place
        fields = ('id', 'name', 'slug', 'image', 'rating', 'created_by')
        read_only_fields = ('id', 'created_by')
