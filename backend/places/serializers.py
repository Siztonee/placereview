from rest_framework import serializers
from .models import Place
from users.serializers import UserShortSerializer


class PlaceSerializer(serializers.ModelSerializer):
    created_by = UserShortSerializer(read_only=True)

    class Meta:
        model = Place
        fields = ('id', 'name', 'slug', 'image', 'rating', 'created_by')
        read_only_fields = ('id', 'created_by')


class PlaceAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('name', 'image', 'rating', 'created_by')
        read_only_fields = ('created_by',)

    def create(self, validated_data):
        user = self.context['request'].user
        return Place.objects.create(created_by=user, **validated_data)