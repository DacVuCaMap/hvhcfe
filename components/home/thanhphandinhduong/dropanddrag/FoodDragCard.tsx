import React from 'react'
// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface Food {
  id: string;
  name: string;
  kcal: number;
}
export default function FoodCard({
    food,
    isSidebar,
    isDragging,
    isOverlay
}: {
    food: Food;
    isSidebar?: boolean;
    isDragging?: boolean;
    isOverlay?: boolean;
}) {
    return (
        <div
            className={`group relative p-3 rounded-xl shadow-sm border transition-all duration-200
        ${isOverlay ? 'bg-white border-green-500 shadow-2xl scale-105 rotate-3 cursor-grabbing' : ''}
        ${isSidebar ? 'bg-white border-gray-100 hover:border-green-500' : 'bg-green-50 border-green-200 text-xs py-2'}
        ${isDragging && !isOverlay ? 'opacity-30' : 'opacity-100'}
      `}
        >
            <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">{food.name}</span>
            </div>
            <div className="text-[10px] text-gray-500 mt-1">{food.kcal} Kcal</div>
        </div>
    );
}
