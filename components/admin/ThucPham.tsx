import React, { useCallback, useEffect, useState } from 'react'
import FoodList from './FoodList';
import FoodForm from './FoodForm';
import { deleteFood, getRandomFoods, saveFood } from '@/lib/api';
import { Food, FoodRequestDto } from '@/type/food';

const FOODS_TO_LOAD = 12; // Number of foods to load initially


export default function ThucPham() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFood, setEditingFood] = useState<Food | null>(null); // Food being edited

    // Function to fetch foods
    const fetchFoods = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedFoods = await getRandomFoods(FOODS_TO_LOAD);
            setFoods(fetchedFoods);
        } catch (err) {
            console.error("Failed to fetch foods:", err);
            setError(err instanceof Error ? err.message : "Không thể tải danh sách món ăn.");
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means this function is created once

    // Fetch foods on initial component mount
    useEffect(() => {
        fetchFoods();
    }, [fetchFoods]); // Include fetchFoods in dependency array

    // Handler for opening the form to add a new food
    const handleAddClick = () => {
        setEditingFood(null); // Ensure we are adding, not editing
        setIsFormOpen(true);
        setError(null); // Clear previous page errors when opening form
    };

    // Handler for opening the form to edit an existing food
    const handleEditClick = (food: Food) => {
        setEditingFood(food);
        setIsFormOpen(true);
        setError(null); // Clear previous page errors when opening form
    };

    // Handler for closing the form
    const handleCancelForm = () => {
        setIsFormOpen(false);
        setEditingFood(null); // Clear editing state
    };

    // Handler for submitting the form (add or edit)
    const handleFormSubmit = async (foodData: FoodRequestDto, imageFile: File | null) => {
        setError(null); // Clear previous errors before attempting save
        try {
            const savedFood = await saveFood(foodData, imageFile);
            if (savedFood) {
                if (editingFood) {
                    // Update existing food in the list
                    setFoods((prevFoods) =>
                        prevFoods.map(f => (f.id === savedFood.id ? savedFood : f))
                    );
                } else {
                    // Add new food to the beginning of the list
                    setFoods(prevFoods => [savedFood, ...prevFoods]);
                }
                setIsFormOpen(false); // Close form on success
                setEditingFood(null); // Clear editing state
            } else {
                // Handle case where saveFood returns null (error occurred in API call)
                throw new Error("Lưu món ăn không thành công. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("Failed to save food:", err);
            // Re-throw the error so the form can catch it and display it
            throw err;
        }
    };

    // Handler for deleting a food
    const handleDeleteFood = async (id: number) => {
        setError(null);
        // Optimistic UI update (optional): Remove immediately
        // setFoods(prevFoods => prevFoods.filter(f => f.id !== id));

        try {
            const success = await deleteFood(id);
            if (success) {
                // Confirm removal if successful
                setFoods((prevFoods: any) => prevFoods.filter((f:Food) => f.id !== id));
            } else {
                // If deletion failed, potentially revert optimistic update or show error
                setError("Xóa món ăn không thành công.");
                // Re-fetch list if optimistic update was done and failed
                // fetchFoods();
            }
        } catch (err) {
            console.error("Failed to delete food:", err);
            setError(err instanceof Error ? err.message : "Không thể xóa món ăn.");
            // Re-fetch list if optimistic update was done and failed
            // fetchFoods();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 font-sans">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Quản Lý Món Ăn</h1>
                <button
                    onClick={handleAddClick}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                >
                    + Thêm Món Ăn Mới
                </button>
            </div>

            {/* Display page-level errors here */}
            {error && !isFormOpen && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-300">
                    <p><span className="font-semibold">Lỗi:</span> {error}</p>
                </div>
            )}

            {/* Food List */}
            <FoodList
                foods={foods}
                onEdit={handleEditClick}
                onDelete={handleDeleteFood}
                isLoading={isLoading && !isFormOpen} // Don't show loading text when form is open over it
                error={null} // Errors are handled above or in the form
            />

            {/* Food Form Modal */}
            {isFormOpen && (
                <FoodForm
                    initialFood={editingFood}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancelForm}
                />
            )}
        </div>
    );
}
