# restaurants/serializers.py
from rest_framework import serializers
from .models import Restaurant, Category, Meal

class MealSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

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
        fields = ['id', 'name', 'categories']
