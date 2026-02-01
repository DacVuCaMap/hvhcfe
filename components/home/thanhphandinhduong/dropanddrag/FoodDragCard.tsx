import { FoodCardChild } from '@/types/FoodCard';
import React from 'react'


export default function FoodCard({
    food,
    isSidebar,
    isDragging,
    isOverlay,
    onVolumeChange
}: {
    food: FoodCardChild;
    isSidebar?: boolean;
    isDragging?: boolean;
    isOverlay?: boolean;
    onVolumeChange?: (value: number) => void;
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
            <div className="mt-2">
                <div className="relative flex items-center w-24 group/input">
                    <input
                        type="number"
                        className="w-full text-[11px] font-bold border border-gray-200 rounded-md pl-1.5 pr-4 py-1
                     bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 
                     outline-none transition-all appearance-none text-gray-700"
                        value={food.volumeSuggest}
                        onPointerDown={(e) => e.stopPropagation()}
                        onChange={(e) => onVolumeChange?.(Number(e.target.value))}
                    />
                    <span className="absolute right-1.5 text-[9px] font-bold text-gray-400 group-focus-within/input:text-green-600 uppercase">
                        g
                    </span>
                </div>
            </div>
            {(isSidebar) ? (
                <div className="text-[10px] text-gray-500 mt-1">Protein: {food.protein}g | Lipid: {food.lipid}g | Glucide: {food.glucide}g</div>
            )
                : (

                    <div className="text-[10px] text-gray-500 mt-1">Protein: {food.protein}g <br/> Lipid: {food.lipid}g <br/> Glucide: {food.glucide}g</div>
                )}
        </div>
    );
}
