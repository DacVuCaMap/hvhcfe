"use client"
import { listGroup } from '@/lib/utils';
import { Food, FoodRequestDto } from '@/type/food';
import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FoodFormProps {
    initialFood: Food | null; // Food data for editing, null for adding
    onSubmit: (foodData: FoodRequestDto, imageFile: File | null) => Promise<void>; // Make async to handle API call status
    onCancel: () => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ initialFood, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<FoodRequestDto>({
        id: undefined,
        name: '',
        group: '',
        protein: 0,
        lipid: 0,
        carbohydrate: 0,
        ordinalNumbers: 0,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialFood) {
            setFormData({
                id: initialFood.id,
                name: initialFood.name,
                group: initialFood.group,
                protein: initialFood.protein,
                lipid: initialFood.lipid,
                carbohydrate: initialFood.carbohydrate,
                ordinalNumbers: initialFood.ordinalNumbers
            });
            setImagePreview(initialFood.image); // Show existing image
            setImageFile(null); // Clear any previously selected new file
        } else {
            // Reset form for adding new food
            setFormData({
                id: undefined,
                name: '',
                group: '',
                protein: 0,
                lipid: 0,
                carbohydrate: 0,
                ordinalNumbers: 0
            });
            setImagePreview(null);
            setImageFile(null);
        }
        setError(null); // Clear error when form data changes
    }, [initialFood]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, potentially revert to initial image if editing
            setImageFile(null);
            setImagePreview(initialFood?.image || null);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null); // Clear previous errors

        // Basic Validation (Add more as needed)
        if (!formData.name || !formData.group) {
            setError("Tên món ăn và nhóm không được để trống.");
            setIsSubmitting(false);
            return;
        }
        if (!imageFile && !initialFood) {
            setError("Vui lòng chọn hình ảnh cho món ăn mới.");
            setIsSubmitting(false);
            return;
        }


        try {
            await onSubmit(formData, imageFile);
            // onSubmit should handle success feedback (e.g., closing the form)
        } catch (err) {
            console.error("Form submission error:", err);
            setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi lưu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {initialFood ? 'Sửa thực phẩm' : 'Thêm thực phẩm mới'}
                </h2>
                {error && <p className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên Món Ăn</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Group */}
                    <div>
                        <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                            Nhóm Thực Phẩm
                        </label>
                        <select
                            id="group"
                            name="group"
                            value={formData.group}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">-- Chọn nhóm thực phẩm --</option>
                            {listGroup.map((group: any) => (
                                <option key={group.value} value={group.value}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nutritional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="ordinalNumbers" className="block text-sm font-medium text-gray-700 mb-1">STT</label>
                            <input
                                type="number"
                                id="ordinalNumbers"
                                name="ordinalNumbers"
                                value={formData.ordinalNumbers}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                            <input
                                type="number"
                                id="protein"
                                name="protein"
                                value={formData.protein}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="lipid" className="block text-sm font-medium text-gray-700 mb-1">Lipid (g)</label>
                            <input
                                type="number"
                                id="lipid"
                                name="lipid"
                                value={formData.lipid}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="carbohydrate" className="block text-sm font-medium text-gray-700 mb-1">Carbohydrate (g)</label>
                            <input
                                type="number"
                                id="carbohydrate"
                                name="carbohydrate"
                                value={formData.carbohydrate}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Hình Ảnh</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                                <Image
                                    src={imagePreview}
                                    alt="Xem trước hình ảnh"
                                    width={150}
                                    height={150}
                                    className="rounded-md object-cover border border-gray-200"
                                />
                            </div>
                        )}
                        {!imageFile && initialFood && <p className="text-xs text-gray-500 mt-1">Để trống nếu không muốn thay đổi ảnh hiện tại.</p>}
                    </div>


                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 disabled:opacity-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Đang lưu...' : (initialFood ? 'Cập Nhật' : 'Thêm Mới')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodForm;