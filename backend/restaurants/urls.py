# restaurants/urls.py
from django.urls import path
from .views import (
    RestaurantListCreateAPIView,
    RestaurantDetailAPIView,
    RestaurantInfoAPIView,
    CategoryListCreateAPIView,
    CategoryDetailAPIView,
    MealListCreateAPIView,
    MealDetailAPIView,
    AIRecommendationAPIView,
    RegisterAPIView,
    LoginAPIView,
)

urlpatterns = [
    path('restaurants/', RestaurantListCreateAPIView.as_view(), name='restaurant-list-create'),
    path('restaurants/<str:name>/', RestaurantDetailAPIView.as_view(), name='restaurant-detail'),
    path('restaurant-info/', RestaurantInfoAPIView.as_view(), name='restaurant-info'),
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('categories/<int:category_id>/meals/', MealListCreateAPIView.as_view(), name='meal-list-create'),
    path('meals/<int:pk>/', MealDetailAPIView.as_view(), name='meal-detail'),
    path('ai-recommendation/', AIRecommendationAPIView.as_view(), name='ai-recommendation'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
]
