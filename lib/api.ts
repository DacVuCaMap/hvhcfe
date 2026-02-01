

import axios from "axios";
import { Food, FoodRequestDto } from "@/type/food";
import { FoodCardChild } from "@/types/FoodCard";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/khoaquannhu/foods`,
  headers: { "ngrok-skip-browser-warning": "true" }
});
const api2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/khoaquannhu/dishes/all`,
  headers: { "ngrok-skip-browser-warning": "true" }
});


const handleError = (error: any, action: string) => {
  if (error.response) {
    console.error(`${action} error response:`, error.response.data);
  }
  console.error(`${action} error:`, error);
};

const normalizeImage = (food: Food): Food => ({
  ...food,
  image: food.image ? `${process.env.NEXT_PUBLIC_API_URL}${food.image}` : ""
});

export const getRandomFoods = async (size: number): Promise<Food[]> => {
  try {
    const { data } = await api.get<Food[]>(`/random/${size}`);
    return data.map(normalizeImage);
  } catch (error) {
    handleError(error, "Fetch foods");
    return [];
  }
};

export const searchFood = async (key: string): Promise<Food[]> => {
  try {
    const { data } = await api.get<Food[]>(`/search?name=${key}`);
    return data.map(normalizeImage);
  } catch (error) {
    handleError(error, "Fetch foods");
    return [];
  }
};


export const saveFood = async (foodData: FoodRequestDto, imageFile?: File | null): Promise<Food | null> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(foodData));
  if (imageFile) formData.append("image", imageFile);

  try {
    const { data } = await api.post<Food>("/admin/save", formData);
    return data;
  } catch (error) {
    handleError(error, "Save food");
    return null;
  }
};

export const deleteFood = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/admin/delete/${id}`);
    return true;
  } catch (error) {
    handleError(error, "Delete food");
    return false;
  }
};

export const apiShowPdf = async (num: number, group: string) => {
  try {
    const { data } = await api.get(`/pdfs?foodOrdinalNumbers=${num}&foodGroup=${group}`, {
      responseType: "blob"
    });
    return data;
  } catch (error) {
    handleError(error, "Show PDF");
    return null;
  }
};

export const getRation = async (energy: number) => {
  try {
    const { data } = await api.get(`/build/ration/${energy}`, {
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    return data;
  } catch (error) {
    handleError(error, "Get ration");
    return null;
  }
};

export const fetchFoodCardChild = async (): Promise<FoodCardChild[]> => {
  try {
    const { data } = await api2.get<any[]>(``, {
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    console.log("Fetched food card child data:", data);
    return data.map((item): FoodCardChild => ({
      id: item.id,
      name: item.name,
      protein: Number(item.protein),
      lipid: Number(item.lipid),
      glucide: Number(item.glucide),
      volumeSuggest: Number(item.volumeSuggest || item.volume_suggest)
    }));
  } catch (error) {
    handleError(error, "Get food card child");
    return [];
  }
};