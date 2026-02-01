import { useDroppable } from '@dnd-kit/core';
import React from 'react'
import DraggableFoodItem from './DragableFoodItem';
import { ClipboardList, Trash2 } from 'lucide-react';
import { FoodInstance } from '@/types/FoodCard';


export default function DroppableCell({ day, mealId, foods, onRemove, onUpdateVolume }: {
    day: string;
    mealId: string;
    foods: FoodInstance[];
    onRemove: (day: string, mealId: string, instId: string) => void;
    onUpdateVolume: (day: string, mealId: string, instId: string, val: number) => void;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: `${day}-${mealId}`,
    });

    // const totalKcal = foods.reduce((sum: number, f: any) => sum + f.kcal, 0);
    const totalKcal = foods.reduce((sum, f) => {
        const ratio = f.volumeSuggest / 100;
        const kcal = (f.protein * 4 + f.lipid * 9 + f.glucide * 4) * ratio;
        return sum + kcal;
    }, 0);
    return (
        <td
            ref={setNodeRef}
            className={`p-2 border-r min-w-[160px] align-top transition-colors duration-200 ${isOver ? 'bg-green-50/50' : 'bg-transparent'}`}
        >
            <div className={`min-h-[120px] rounded-xl p-2 flex flex-col gap-1 border-2 border-dashed transition-all
        ${isOver ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-gray-50/30'}`}>

                {foods.map((f: FoodInstance) => (
                    <div key={f.instanceId} className="relative group">
                        <DraggableFoodItem day={day} mealId={mealId} food={f} instanceId={f.instanceId} onUpdateVolume={onUpdateVolume} />
                        <button
                            onClick={() => onRemove(day, mealId, f.instanceId)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-sm"
                        >
                            <Trash2 size={10} />
                        </button>
                    </div>
                ))}

                {foods.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-gray-300">
                        <ClipboardList size={20} opacity={0.5} />
                        <span className="text-[10px] mt-1 italic">Kéo thả</span>
                    </div>
                )}
            </div>

            <div className={`mt-2 flex items-center justify-between px-2 py-1 rounded-lg text-[10px] font-bold 
        ${totalKcal > 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-gray-50 text-gray-400'}`}>
                <span>TỔNG:</span>
                <span>{totalKcal.toFixed(2)} Kcal</span>
            </div>
        </td>
    );
}

