export interface Food {
    id: number; // Assuming ID is a number based on Long in Java
    name: string;
    group: string; // Renamed from 'group' in Java to avoid conflict with reserved keywords
    protein: number;
    lipid: number;
    carbohydrate: number;
    image: string; // URL or path to the image
    groupObj?:any;
  }
  
  // Type for the data part when saving (excluding id for creation)
  export interface FoodRequestDto {
    id?: number; // Optional for creation, required for update
    name: string;
    group: string;
    protein: number;
    lipid: number;
    carbohydrate: number;
    // Image is handled separately as MultipartFile
  }