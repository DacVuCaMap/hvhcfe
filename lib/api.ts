import axios from "axios";
import { Food, FoodRequestDto } from "@/type/food";

const API_BASE_URL = 'http://localhost:8080/api/khoaquannhu/foods'; // Ví dụ: 'http://localhost:8080/api'

// Fetches a random list of foods
export const getRandomFoods = async (size: number): Promise<Food[]> => {
  try {
    const response = await axios.get<Food[]>(`${API_BASE_URL}/random/${size}`);
    const data = response.data;

    // Ensure image URLs are complete if necessary
    return data.map(food => ({
      ...food,
      image: food.image.startsWith('http') ? food.image : `${API_BASE_URL}/images/${food.image}`
    }));
  } catch (error) {
    console.error("Error fetching foods:", error);
    return [];
  }
};

// Saves (creates or updates) a food item
export const saveFood = async (foodData: FoodRequestDto, imageFile: File | null): Promise<Food | null> => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(foodData));

  if (imageFile) {
    formData.append('image', imageFile);
  } else if (!foodData.id) {
    console.warn("Image file is missing for new food creation.");
    // Tuỳ vào backend, có thể throw error ở đây
  }

  try {
    const response = await axios.post<Food>(`${API_BASE_URL}/admin/save`, formData);

    const savedFood = response.data;
    savedFood.image = savedFood.image.startsWith('http') ? savedFood.image : `${API_BASE_URL}/images/${savedFood.image}`;
    return savedFood;
  } catch (error: any) {
    if (error.response) {
      console.error("Save food error response:", error.response.data);
    }
    console.error("Error saving food:", error);
    return null;
  }
};

// Deletes a food item by ID
export const deleteFood = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/admin/delete/${id}`);
    return true;
  } catch (error: any) {
    if (error.response) {
      console.error("Delete food error response:", error.response.data);
    }
    console.error("Error deleting food:", error);
    return false;
  }
};
