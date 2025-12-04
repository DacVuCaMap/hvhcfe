export interface Food {
  id: number; // Assuming ID is a number based on Long in Java
  name: string;
  group: string; // Renamed from 'group' in Java to avoid conflict with reserved keywords
  protein: number;
  lipid: number;
  carbohydrate: number;
  image: string | null; // URL or path to the image
  groupObj?: any;
  ordinalNumbers: number;
}

// Type for the data part when saving (excluding id for creation)
export interface FoodRequestDto {
  id?: number; // Optional for creation, required for update
  name: string;
  group: string;
  protein: number;
  lipid: number;
  carbohydrate: number;
  ordinalNumbers: number;
  // Image is handled separately as MultipartFile
}

export interface AddedFoodItem {
  food: Food;
  input: number; // Khối lượng người dùng nhập
  calculatedProtein: number;
  calculatedGluxit: number;
  calculatedLipid: number;
  totalEnergy: number;
}