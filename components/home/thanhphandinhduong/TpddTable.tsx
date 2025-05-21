"use client";
import { Food } from '@/type/food';
import React, { useState, useMemo, useEffect, useCallback } from 'react'; // Đảm bảo đường dẫn đúng
import { Search, AlertTriangle } from 'lucide-react';
import TpddCard from './TpddCard';
import './TpddTable.css'
import { getRandomFoods } from '@/lib/api';

export default function FoodSearch() {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchFoods = useCallback(async () => {
    try {
      const fetchedFoods = await getRandomFoods(100);
      setFoodData(fetchedFoods);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    }
  }, []);
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods])


  const filteredFood = useMemo(() =>
    foodData.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.group.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm,foodData]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center p-8 pt-50">
      {/* Hiệu ứng hạt nổi (optional) */}
      {/* <div id="particles-js" className="absolute inset-0 z-0"></div> */}

      <div className="w-full max-w-4xl text-center mb-10 md:mb-12 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-sky-400">
            Tra Cứu Dinh Dưỡng
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          Khám phá thế giới ẩm thực và tìm hiểu thông tin chi tiết về các loại lương thực, thực phẩm yêu thích của bạn.
        </p>
        <div className="relative w-full md:w-3/4 lg:w-2/3 mx-auto">
          <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Nhập tên thực phẩm, ví dụ: Gạo, Thịt bò, Táo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 sm:pl-16 text-base sm:text-lg bg-slate-800 bg-opacity-70 text-gray-100 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-60 transition-all duration-300 ease-in-out border border-slate-700 placeholder-gray-500"
          />
        </div>
      </div>

      {filteredFood.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 relative z-10">
          {filteredFood.map((food, index) => (
            <div
              key={food.id}
              className="food-card-item" // Class để target CSS animation
              style={{ animationDelay: `${index * 100}ms` }} // Stagger animation
            >
              <TpddCard food={food} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 md:py-16 relative z-10 bg-slate-800 bg-opacity-50 p-8 rounded-xl shadow-xl">
          <AlertTriangle className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <p className="text-2xl text-gray-100 font-semibold mb-3">Không tìm thấy kết quả nào</p>
          <p className="text-gray-400">
            Rất tiếc, chúng tôi không tìm thấy thực phẩm nào khớp với tìm kiếm của bạn.
            <br />
            Vui lòng thử lại với từ khóa khác hoặc kiểm tra lại lỗi chính tả.
          </p>
        </div>
      )}
    </div>
  );
}