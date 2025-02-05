# restaurants/models.py

from django.db import models
from django.contrib.auth.models import User

class Restaurant(models.Model):
    name = models.CharField(max_length=255, unique=True)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='restaurants')

    def __str__(self):
        return self.name

class Category(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Meal(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='meals')
    name = models.CharField(max_length=255)
    description = models.TextField()
    size = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='media/', blank=True, null=True)
    def __str__(self):
        return self.name
