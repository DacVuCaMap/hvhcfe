// --- 3. components/FoodCard.tsx ---
// Displays a single food item with Edit and Delete buttons

import React from 'react';
import Image from 'next/image'; // Use Next.js Image for optimization
import { Food } from '@/type/food';

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  const handleDeleteClick = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${food.name}" không?`)) {
      onDelete(food.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl border border-gray-200">
      <div className="relative w-full h-48">
        <Image
          src={food.image || '/placeholder-image.png'} // Provide a fallback image
          alt={food.name}
          layout="fill"
          objectFit="cover"
          onError={(e) => {
            // Handle image loading errors, e.g., show a placeholder
            e.currentTarget.src = '/placeholder-image.png'; // Make sure you have this image in your public folder
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{food.name}</h3>
        <p className="text-sm text-gray-600 mb-1">Nhóm: <span className="font-medium text-gray-700">{food.group}</span></p>
        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <p>Protein: <span className="font-medium text-gray-700">{food.protein?.toFixed(2)}g</span></p>
          <p>Lipid: <span className="font-medium text-gray-700">{food.lipid?.toFixed(2)}g</span></p>
          <p>Carbohydrate: <span className="font-medium text-gray-700">{food.carbohydrate?.toFixed(2)}g</span></p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(food)}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Sửa
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

