"use client";

import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { Apple, ClipboardList, Trash2, Calendar } from 'lucide-react';
import FoodDragCard from './dropanddrag/FoodDragCard';
import DraggableFoodItem from './dropanddrag/DragableFoodItem';
import DroppableCell from './dropanddrag/DropablleCell';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface Food {
  id: string;
  name: string;
  kcal: number;
}

interface FoodInstance extends Food {
  instanceId: string;
}

interface PlacedFoods {
  [key: string]: FoodInstance[];
}



// --- COMPONENT Ô THẢ (DROPPABLE) ---

// --- MAIN PAGE ---
export default function DietPlanner() {
  const [mounted, setMounted] = useState(false);
  const [placedFoods, setPlacedFoods] = useState<PlacedFoods>({});
  const [activeItem, setActiveItem] = useState<any>(null);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 5 } // Khoảng cách nhỏ để bắt đầu kéo, giúp nhạy hơn
  }));

  useEffect(() => { setMounted(true); }, []);

  const foodLibrary: Food[] = [
    { id: 'f1', name: 'Cơm trắng', kcal: 130 },
    { id: 'f2', name: 'Thịt bò xào', kcal: 250 },
    { id: 'f3', name: 'Đậu phụ sốt', kcal: 110 },
    { id: 'f4', name: 'Canh rau cải', kcal: 25 },
    { id: 'f5', name: 'Sữa tươi', kcal: 62 },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const foodData = active.data.current?.food;
    const targetId = over.id as string;

    const newFoodInstance: FoodInstance = { 
      ...foodData, 
      instanceId: `food-${Date.now()}-${Math.random().toString(36).substr(2, 5)}` 
    };

    setPlacedFoods(prev => ({
      ...prev,
      [targetId]: [...(prev[targetId] || []), newFoodInstance]
    }));
  };

  const removeFood = (day: string, mealId: string, instanceId: string) => {
    const key = `${day}-${mealId}`;
    setPlacedFoods(prev => ({
      ...prev,
      [key]: prev[key].filter(f => f.instanceId !== instanceId)
    }));
  };

  if (!mounted) return null;

  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const meals = [
    { id: 'sang', label: 'Sáng', icon: '🌅' },
    { id: 'trua', label: 'Trưa', icon: '☀️' },
    { id: 'toi', label: 'Tối', icon: '🌙' }
  ];

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {/* Container chính: overflow-x-hidden để chặn kéo làm nở trang */}
      <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex p-6 gap-6 overflow-x-hidden font-sans">
        
        {/* Sidebar */}
        <aside className="w-72 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-6">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><Apple className="text-green-600" size={20} /></div>
              Thực đơn
            </h2>
            <div className="space-y-1">
              {foodLibrary.map(food => (
                <DraggableFoodItem key={food.id} food={food} isSidebar={true} />
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[11px] text-blue-600 font-medium">Mẹo: Kéo thả các món ăn vào ô lịch trình để tính toán năng lượng.</p>
            </div>
          </div>
        </aside>

        {/* Main Board */}
        <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-green-600">
            <h1 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg"><Calendar className="text-green-600" size={20} /></div>
                Lịch trình dinh dưỡng tuần
            </h1>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 font-bold text-slate-400 text-[11px] uppercase tracking-wider sticky left-0 bg-slate-50 z-20 border-b w-24">Bữa ăn</th>
                  {days.map(day => (
                    <th key={day} className="p-4 font-bold text-slate-700 text-center border-b">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id} className="group">
                    <td className="p-4 border-b border-r border-slate-50 text-center sticky left-0 bg-white z-10 group-hover:bg-slate-50 transition-colors">
                      <div className="text-2xl mb-1">{meal.icon}</div>
                      <div className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{meal.label}</div>
                    </td>
                    {days.map((day) => (
                      <DroppableCell 
                        key={`${day}-${meal.id}`}
                        day={day}
                        mealId={meal.id}
                        foods={placedFoods[`${day}-${meal.id}`] || []}
                        onRemove={removeFood}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Drag Overlay - Giải quyết vấn đề lag chuột */}
      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: { active: { opacity: '0.4' } },
        }),
      }}>
        {activeItem ? (
          <div className="w-48 cursor-grabbing">
            <FoodDragCard food={activeItem.food} isOverlay={true} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}