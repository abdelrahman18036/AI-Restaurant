# restaurants/views.py

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Restaurant
from .serializers import RestaurantSerializer
import requests
import os
import json
import re

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

        # Prepare AI prompt
        prompt = (
            f"User Query: {user_input}\n"
            f"Restaurant: {restaurant_data['name']}\n"
            f"Menu: {json.dumps(restaurant_data['categories'])}\n"
            f"Provide product recommendations in JSON format (array of objects) similar to menu items."
        )

        # Groq API settings
        groq_api_url = "https://api.groq.com/openai/v1/chat/completions"
        groq_headers = {
            "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
            "Content-Type": "application/json"
        }
        groq_payload = {
            "model": "deepseek-r1-distill-llama-70b",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 700  # Increased from 500 to prevent truncation
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

        # Debugging: Print full AI response
        print("Groq API Response:", groq_data)

        try:
            ai_response_text = groq_data['choices'][0]['message']['content']

            # Extract JSON from AI response
            match = re.search(r'```json\n(.*?)\n```', ai_response_text, re.DOTALL)
            if not match:
                return Response(
                    {"error": "Invalid response format from Groq API. Possibly truncated."},
                    status=status.HTTP_502_BAD_GATEWAY
                )

            json_content = match.group(1)

            # Fix truncated JSON
            try:
                recommendations_json = json.loads(json_content)
            except json.JSONDecodeError:
                json_content = json_content.rstrip(",\n") + "]"  # Attempt to close JSON array
                try:
                    recommendations_json = json.loads(json_content)
                except json.JSONDecodeError:
                    return Response(
                        {"error": "AI response was truncated and could not be fixed."},
                        status=status.HTTP_502_BAD_GATEWAY
                    )

            if not isinstance(recommendations_json, list):  # Ensure response is a list
                return Response(
                    {"error": "AI response is not in the expected list format."},
                    status=status.HTTP_502_BAD_GATEWAY
                )

        except (KeyError, IndexError) as e:
            return Response(
                {"error": "Failed to process AI recommendations.", "details": str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

        return Response(
            {"recommendations": recommendations_json},
            status=status.HTTP_200_OK
        )
