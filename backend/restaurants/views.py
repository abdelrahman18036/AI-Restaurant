# restaurants/views.py
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import Restaurant, Category, Meal
from .serializers import (
    RestaurantSerializer, 
    CategorySerializer, 
    MealSerializer,
    RegisterSerializer,
    LoginSerializer,
)
from rest_framework.authtoken.models import Token
import os
import json
import re
import requests

class RestaurantListCreateAPIView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

class RestaurantDetailAPIView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field = 'name'
    permission_classes = [permissions.AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # If a category filter is provided, only include that category.
        category_filter = request.query_params.get('category')
        if category_filter:
            data['categories'] = [
                cat for cat in data.get('categories', [])
                if cat['name'].lower() == category_filter.lower()
            ]
        return Response(data)

class RestaurantInfoAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Require authentication

    def get(self, request):
        restaurant = get_object_or_404(Restaurant, admin=request.user)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    def put(self, request):
        restaurant = get_object_or_404(Restaurant, admin=request.user)
        serializer = RestaurantSerializer(restaurant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        restaurant = get_object_or_404(Restaurant, admin=request.user)
        categories = restaurant.categories.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        restaurant = get_object_or_404(Restaurant, admin=request.user)
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(restaurant=restaurant)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        restaurant = get_object_or_404(Restaurant, admin=user)
        return get_object_or_404(Category, pk=pk, restaurant=restaurant)

    def get(self, request, pk):
        category = self.get_object(pk, request.user)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = self.get_object(pk, request.user)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(restaurant=category.restaurant)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk, request.user)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MealListCreateAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, category_id):
        restaurant = get_object_or_404(Restaurant, admin=request.user)
        category = get_object_or_404(Category, id=category_id, restaurant=restaurant)
        meals = category.meals.all()
        serializer = MealSerializer(meals, many=True)
        return Response(serializer.data)

    def post(self, request, category_id):
        restaurant = get_object_or_404(Restaurant, admin=request.user)
        category = get_object_or_404(Category, id=category_id, restaurant=restaurant)
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(category=category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MealDetailAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk, user):
        restaurant = get_object_or_404(Restaurant, admin=user)
        return get_object_or_404(Meal, pk=pk, category__restaurant=restaurant)

    def get(self, request, pk):
        meal = self.get_object(pk, request.user)
        serializer = MealSerializer(meal)
        return Response(serializer.data)

    def put(self, request, pk):
        meal = self.get_object(pk, request.user)
        serializer = MealSerializer(meal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(category=meal.category)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        meal = self.get_object(pk, request.user)
        meal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Ensure 'rest_framework.authtoken' is added in your INSTALLED_APPS and run migrations
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': {'id': user.id, 'username': user.username}},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            user = authenticate(username=username, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user': {'id': user.id, 'username': user.username}},
                                status=status.HTTP_200_OK)
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AIRecommendationAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        user_input = request.data.get('query', '').strip()
        restaurant_name = request.data.get('restaurant', '').strip()

        if not user_input or not restaurant_name:
            return Response(
                {"error": "Both 'query' and 'restaurant' fields are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            restaurant = Restaurant.objects.get(name=restaurant_name)
        except Restaurant.DoesNotExist:
            return Response(
                {"error": "Restaurant not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = RestaurantSerializer(restaurant)
        restaurant_data = serializer.data

        prompt = (
            f"User Query: {user_input}\n"
            f"Restaurant: {restaurant_data['name']}\n"
            f"Menu: {json.dumps(restaurant_data.get('categories', []))}\n"
            f"Provide product recommendations as a JSON array of objects. Each object must have the keys: "
            f"\"id\" (an integer), \"name\" (a string), \"description\" (a string), \"size\" (a string), "
            f"\"cost\" (a float), and \"image\" (a URL string). Return only valid JSON without any extra text."
        )

        groq_api_url = "https://api.groq.com/openai/v1/chat/completions"
        groq_headers = {
            "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
            "Content-Type": "application/json"
        }
        groq_payload = {
            "model": "deepseek-r1-distill-llama-70b",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 700
        }

        try:
            groq_response = requests.post(
                groq_api_url,
                headers=groq_headers,
                json=groq_payload,
                timeout=30
            )
            groq_response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": "Groq API request failed.", "details": str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

        groq_data = groq_response.json()
        print("Groq API Response:", groq_data)

        try:
            ai_response_text = groq_data['choices'][0]['message']['content']
        except (KeyError, IndexError) as e:
            return Response(
                {"error": "Failed to retrieve AI response.", "details": str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

        # Try to extract JSON from within code block delimiters.
        match = re.search(r'```json\s*(.*?)\s*```', ai_response_text, re.DOTALL)
        if match:
            json_content = match.group(1)
        else:
            # Fallback: attempt to capture the JSON array by locating the first '[' and last ']'
            start = ai_response_text.find('[')
            end = ai_response_text.rfind(']') + 1
            json_content = ai_response_text[start:end]

        try:
            recommendations_json = json.loads(json_content)
        except json.JSONDecodeError:
            # Instead of returning an error, simply pass back the raw AI response.
            recommendations_json = ai_response_text

        # Return the recommendations (either as a list of objects or raw text if parsing failed)
        return Response(
            {"recommendations": recommendations_json},
            status=status.HTTP_200_OK
        )
