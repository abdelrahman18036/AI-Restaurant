# restaurants/admin.py

from django.contrib import admin
from .models import Restaurant, Category, Meal

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'admin')
    search_fields = ('name', 'admin__username')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant')
    search_fields = ('name', 'restaurant__name')

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'size', 'cost')
    search_fields = ('name', 'category__name')
