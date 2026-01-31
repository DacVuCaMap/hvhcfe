import { useDraggable } from '@dnd-kit/core';
import React from 'react'
import FoodDragCard from './FoodDragCard';
import { FoodCardChild, FoodInstance } from '@/types/FoodCard';
export default function DraggableFoodItem({ day, mealId, food, isSidebar, instanceId, onUpdateVolume }: { day?: string, mealId?: string, food: FoodCardChild | FoodInstance, isSidebar?: boolean, instanceId?: string, onUpdateVolume?: (day: string, mealId: string, instanceId: string, newVolume: number) => void }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: isSidebar ? `sidebar-${food.id}` : `placed-${instanceId}`,
        data: { food, isSidebar, instanceId }
    });
    const handleVolumeChange = (newVal: number) => {
        console.log("Volume changed to:", newVal);
        if (!isSidebar && day && mealId && instanceId && onUpdateVolume) {
            onUpdateVolume(day, mealId, instanceId, newVal);
        }
    };
    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className="mb-2 touch-none">
            <FoodDragCard food={food} isSidebar={isSidebar} isDragging={isDragging} onVolumeChange={handleVolumeChange} />
        </div>
    );
}
