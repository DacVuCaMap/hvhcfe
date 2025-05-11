// src/components/FoodCard.tsx
"use client";
import { Food } from '@/type/food';
import React from 'react';
// Sử dụng icons chung cho dinh dưỡng từ lucide-react
// npm install lucide-react (nếu chưa có)
import { Flame, Droplet, Zap, Info, Tag, Image as ImageIcon } from 'lucide-react';
import { apiShowPdf } from '@/lib/api';

interface FoodCardProps {
    food: Food;
    style?: React.CSSProperties; // Cho phép truyền style để làm animation delay
}

const NutrientDisplay: React.FC<{ icon: React.ReactNode, label: string, value: number, unit: string, colorClass: string }> = ({ icon, label, value, unit, colorClass }) => (
    <div className={`flex items-center justify-between p-2 rounded-lg bg-opacity-50 ${colorClass} bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200 border-opacity-30 shadow-sm`}>
        <div className="flex items-center space-x-2">
            {icon}
            <span className="text-xs font-medium text-gray-700">{label}:</span>
        </div>
        <span className="text-sm font-bold text-gray-900">{value}{unit}</span>
    </div>
);

const TpddCard: React.FC<FoodCardProps> = ({ food, style }) => {
    const handleShowPdf = async () => {
        const response : any = await apiShowPdf(food.ordinalNumbers, food.group);
        console.log(response)
        if (!response) {
            console.error("Không nhận được dữ liệu PDF");
            return;
        }

        const pdfBlob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, '_blank');
    };
    return (
        <div
            style={style} // Áp dụng style cho animation (ví dụ: transitionDelay)
            className="group relative bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-green-300"
        >
            <div className="relative h-56 w-full overflow-hidden">
                {food.image ? (
                    <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <ImageIcon className="w-20 h-20 text-gray-400" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="absolute top-3 right-3 bg-green-500 bg-opacity-80 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1 backdrop-filter backdrop-blur-sm">
                    <Tag size={14} />
                    <span>{food.group}</span>
                </span>
            </div>

            <div className="p-5 space-y-3">
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 truncate group-hover:text-green-500 transition-colors duration-300" title={food.name}>
                    {food.name}
                </h3>

                <div className="space-y-2.5">
                    <NutrientDisplay icon={<Zap size={16} className="text-yellow-500" />} label="Protein" value={food.protein} unit="g" colorClass="bg-yellow-50" />
                    <NutrientDisplay icon={<Droplet size={16} className="text-blue-500" />} label="Lipid" value={food.lipid} unit="g" colorClass="bg-blue-50" />
                    <NutrientDisplay icon={<Flame size={16} className="text-red-500" />} label="Carbs" value={food.carbohydrate} unit="g" colorClass="bg-red-50" />
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200 border-opacity-50">
                    <p className="text-xs text-gray-500 flex items-center">
                        <Info size={14} className="mr-1 text-gray-400" />
                        Mã số: {food.ordinalNumbers}
                    </p>
                    <button onClick={handleShowPdf} className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transform hover:scale-105 transition-all duration-300">
                        Xem pdf
                    </button>
                </div>
            </div>
            {/* Hiệu ứng "shine" khi hover */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-0 left-0 w-20 h-full bg-white opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine"></div>
            </div>
        </div>
    );
};

export default TpddCard;