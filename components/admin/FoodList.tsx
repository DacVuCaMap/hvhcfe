
import React from 'react';
import FoodCard from './FoodCard'; // Adjust path
import { Food } from '@/type/food';

interface FoodListProps {
  foods: Food[];
  onEdit: (food: Food) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  error: string | null;
}

const FoodList: React.FC<FoodListProps> = ({ foods, onEdit, onDelete, isLoading, error }) => {
  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Đang tải danh sách món ăn...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 bg-red-100 p-4 rounded-md">Lỗi: {error}</div>;
  }

  if (foods.length === 0) {
    return <div className="text-center py-10 text-gray-500">Không tìm thấy món ăn nào.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default FoodList;