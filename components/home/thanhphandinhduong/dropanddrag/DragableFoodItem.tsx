import { useDraggable } from '@dnd-kit/core';
import React from 'react'
import FoodDragCard from './FoodDragCard';
interface Food {
  id: string;
  name: string;
  kcal: number;
}

interface FoodInstance extends Food {
  instanceId: string;
}

export default function DraggableFoodItem({ food, isSidebar, instanceId }: { food: Food | FoodInstance, isSidebar?: boolean, instanceId?: string }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: isSidebar ? `sidebar-${food.id}` : `placed-${instanceId}`,
        data: { food, isSidebar, instanceId }
    });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className="mb-2 touch-none">
            <FoodDragCard food={food} isSidebar={isSidebar} isDragging={isDragging} />
        </div>
    );
}
