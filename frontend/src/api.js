// src/api.js

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Helper: get auth headers from localStorage (if token exists)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Token ${token}` }),
  };
};

// Fetch a restaurant by its name (this endpoint may not require auth)
export const fetchRestaurant = async (restaurantName) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/${encodeURIComponent(restaurantName)}/`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching restaurant", error);
    return { error: "Network error" };
  }
};

// AI Recommendation endpoint (POST request; no token required if set to AllowAny)
export const aiRecommendation = async (query, restaurant) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-recommendation/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, restaurant }),
    });
    return await response.json();
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { error: "Network error" };
  }
};

// Login endpoint
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Network error" };
  }
};

// Register endpoint
export const register = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Register Error:", error);
    return { error: "Network error" };
  }
};

// Fetch Categories (requires authentication)
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories", error);
    return { error: "Network error" };
  }
};

// Add Category (POST; requires auth)
export const addCategory = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding category", error);
    return { error: "Network error" };
  }
};

// Update Category (PUT; requires auth)
export const updateCategory = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}/`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating category", error);
    return { error: "Network error" };
  }
};

// Delete Category (DELETE; requires auth)
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (response.status === 204) {
      return { success: true };
    }
    return { error: "Error deleting category" };
  } catch (error) {
    console.error("Error deleting category", error);
    return { error: "Network error" };
  }
};

// Fetch Meals for a given category (requires auth)
export const fetchMeals = async (categoryId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/meals/`,
      { headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching meals", error);
    return { error: "Network error" };
  }
};

// Add a Meal (POST; requires auth)
export const addMeal = async (categoryId, data) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/meals/`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error adding meal", error);
    return { error: "Network error" };
  }
};

// Update a Meal (PUT; requires auth)
export const updateMeal = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/${id}/`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating meal", error);
    return { error: "Network error" };
  }
};

// Delete a Meal (DELETE; requires auth)
export const deleteMeal = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (response.status === 204) {
      return { success: true };
    }
    return { error: "Error deleting meal" };
  } catch (error) {
    console.error("Error deleting meal", error);
    return { error: "Network error" };
  }
};

// Fetch Restaurant Info for the logged in user (requires auth)
export const fetchRestaurantInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurant-info/`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching restaurant info", error);
    return { error: "Network error" };
  }
};
