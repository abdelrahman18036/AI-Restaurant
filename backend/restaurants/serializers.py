# restaurants/serializers.py
from rest_framework import serializers
from .models import Restaurant, Category, Meal
from django.contrib.auth.models import User

class MealSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'size', 'cost', 'image']

class CategorySerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'meals']

class RestaurantSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'location', 'contact', 'hours', 'description', 'facebook', 'instagram', 'categories']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        Restaurant.objects.create(admin=user, name=f"{user.username}'s Restaurant")
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
