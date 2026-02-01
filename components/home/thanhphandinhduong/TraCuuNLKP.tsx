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
import { Apple, Calendar } from 'lucide-react';
import FoodDragCard from './dropanddrag/FoodDragCard';
import DraggableFoodItem from './dropanddrag/DragableFoodItem';
import DroppableCell from './dropanddrag/DropablleCell';
import { FoodCardChild, FoodInstance } from '@/types/FoodCard';
import { fetchFoodCardChild } from '@/lib/api';

interface PlacedFoods {
  [key: string]: FoodInstance[];
}
const foodLibrary: FoodCardChild[] = [
  { id: "f1", name: "Ức gà áp chảo", protein: 31, lipid: 3.6, glucide: 0, volumeSuggest: 150 },
  { id: "f2", name: "Thịt bò thăn", protein: 26, lipid: 15, glucide: 0, volumeSuggest: 120 },
  { id: "f3", name: "Cá hồi phi lê", protein: 20, lipid: 13, glucide: 0, volumeSuggest: 150 },
  { id: "f4", name: "Trứng gà luộc", protein: 13, lipid: 11, glucide: 1.1, volumeSuggest: 100 },
  { id: "f5", name: "Đậu phụ trắng", protein: 8, lipid: 4.8, glucide: 1.9, volumeSuggest: 200 },
  { id: "f6", name: "Gạo lứt nấu chín", protein: 2.6, lipid: 0.9, glucide: 23, volumeSuggest: 150 },
  { id: "f7", name: "Khoai lang luộc", protein: 1.6, lipid: 0.1, glucide: 20, volumeSuggest: 150 },
  { id: "f8", name: "Hạt hạnh nhân", protein: 21, lipid: 49, glucide: 22, volumeSuggest: 30 },
  { id: "f9", name: "Bông cải xanh", protein: 2.8, lipid: 0.3, glucide: 7, volumeSuggest: 200 },
  { id: "f10", name: "Bơ sáp", protein: 2, lipid: 15, glucide: 9, volumeSuggest: 100 }
];



// --- MAIN PAGE ---
export default function DietPlanner() {
  const [mounted, setMounted] = useState(false);
  const [placedFoods, setPlacedFoods] = useState<PlacedFoods>({});
  const [activeItem, setActiveItem] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<FoodCardChild[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 5 }
  }));

  useEffect(() => {
    setMounted(true);

    if (menuItems.length == 0) {
      const loadFoodData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchFoodCardChild();
          setMenuItems(data);
        } catch (error) {
          console.error("Lỗi khi load thực đơn:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadFoodData();
    }

  }, []);


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
  const updateFoodVolume = (day: string, mealId: string, instanceId: string, newVolume: number) => {
    console.log("Updating volume for:", { day, mealId, instanceId, newVolume });
    const key = `${day}-${mealId}`;
    setPlacedFoods(prev => ({
      ...prev,
      [key]: prev[key].map(food =>
        food.instanceId === instanceId
          ? { ...food, volumeSuggest: newVolume }
          : food
      )
    }));
  };
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

      <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex p-4 gap-2 overflow-x-hidden font-sans">

        {/* Sidebar */}
        <aside className="w-72 shrink-0 ">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 sticky top-6">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><Apple className="text-green-600" size={20} /></div>
              Thực đơn
            </h2>

            {/* 3. Hiển thị trạng thái loading hoặc danh sách món ăn */}
            <div className="space-y-1 max-h-[470px] overflow-y-auto pr-1">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              ) : (
                menuItems.map(food => (
                  <DraggableFoodItem key={food.id} food={food} isSidebar={true} />
                ))
              )}

              {!isLoading && menuItems.length === 0 && (
                <p className="text-center text-gray-400 text-xs">Không có dữ liệu món ăn.</p>
              )}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[11px] text-blue-600 font-medium">Mẹo: Kéo thả các món ăn vào ô lịch trình để tính toán năng lượng.</p>
            </div>
          </div>
        </aside>

        {/* Main Board */}
        <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-green-600">
            <h1 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg"><Calendar className="text-green-600" size={20} /></div>
              Lịch trình dinh dưỡng tuần
            </h1>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-2 font-bold text-slate-400 text-[11px] uppercase tracking-wider sticky left-0 bg-slate-50 z-20 border-b w-24">Bữa ăn</th>
                  {days.map(day => (
                    <th key={day} className="p-2 font-bold text-slate-700 text-center border-b">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id} className="group">
                    <td className="p-2 border-b border-r border-slate-50 text-center sticky left-0 bg-white z-10 group-hover:bg-slate-50 transition-colors">
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
                        onUpdateVolume={updateFoodVolume}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>


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