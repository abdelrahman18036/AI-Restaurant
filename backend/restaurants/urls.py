# restaurants/urls.py

from django.urls import path
from .views import (
    RestaurantListCreateAPIView,
    RestaurantDetailAPIView,
    AIRecommendationAPIView,  # Import the new view
)

urlpatterns = [
    path('restaurants/', RestaurantListCreateAPIView.as_view(), name='restaurant-list-create'),
    path('restaurants/<str:name>/', RestaurantDetailAPIView.as_view(), name='restaurant-detail'),
    path('ai-recommendation/', AIRecommendationAPIView.as_view(), name='ai-recommendation'),  # New endpoint
]

