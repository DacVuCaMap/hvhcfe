// --- 3. components/FoodCard.tsx ---
// Displays a single food item with Edit and Delete buttons

import React, { useState } from 'react';
import Image from 'next/image'; // Use Next.js Image for optimization
import { Food } from '@/type/food';
import { ImageIcon } from 'lucide-react';

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  const [isError, setIsError] = useState(false);

  const handleDeleteClick = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${food.name}" không?`)) {
      onDelete(food.id);
    }
  };
  // console.log(food)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl border border-gray-200">
      <div className="relative w-full h-48">

        {food.image ? (
          <Image
            src={food.image} // Provide a fallback image
            alt={food.name}
            layout="fill"
            objectFit="cover"
          />
        )
          :
          (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <ImageIcon className="w-20 h-20 text-gray-400" />
            </div>
          )
        }
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

