import axios from "axios";
import { Food, FoodRequestDto } from "@/type/food";

// const API_BASE_URL = 'http://localhost:8080/api/khoaquannhu/foods'; // Ví dụ: 'http://localhost:8080/api'

// // Fetches a random list of foods
// export const getRandomFoods = async (size: number): Promise<Food[]> => {
//   try {
//     const response = await axios.get<Food[]>(`${API_BASE_URL}/random/${size}`);
//     const data = response.data;
//     // Ensure image URLs are complete if necessary
//     return data.map(food => {
//       const imgUrl = food.image ? "http://localhost:8080" + food.image : ""
//       return {
//         ...food,
//         image: imgUrl
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching foods:", error);
//     return [];
//   }
// };

// Lấy base URL từ biến môi trường
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/khoaquannhu/foods`;

// Fetches a random list of foods
export const getRandomFoods = async (size: number): Promise<Food[]> => {
  try {
    const response = await axios.get<Food[]>(`${API_BASE_URL}/random/${size}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    const data = response.data;
    console.log("Fetched foods:", data);
    // Ensure image URLs are complete if necessary
    return data.map(food => {
      const imgUrl = food.image ? process.env.NEXT_PUBLIC_API_URL + food.image : "";
      return {
        ...food,
        image: imgUrl
      };
    });
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
    console.log("Saving food with data:", formData.get('data'));
    console.log("Saving food with image:", formData.get('image'));
    const response = await axios.post<Food>(`${API_BASE_URL}/admin/save`, formData);

    const savedFood = response.data;
    console.log(savedFood);
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

export const apiShowPdf = async (num: number, group: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pdfs?foodOrdinalNumbers=${num}&foodGroup=${group}`, {
      responseType: 'blob', // Chìa khóa để nhận PDF đúng cách
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    console.log(`${API_BASE_URL}/pdfs?foodOrdinalNumbers=${num}&foodGroup=${group}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("show pdf error response:", error.response.data);
    }
    console.error("Error saving food:", error);
    return null;
  }
}
