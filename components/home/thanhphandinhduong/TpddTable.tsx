"use client";
import { Food } from '@/type/food';
import React, { useState, useMemo, useEffect, useCallback } from 'react'; // Đảm bảo đường dẫn đúng
import { Search, AlertTriangle } from 'lucide-react';
import TpddCard from './TpddCard';
import './TpddTable.css'
import { getRandomFoods } from '@/lib/api';

// Dữ liệu foodData (như đã định nghĩa ở trên)
//  const foodData: Food[] = [
//      { id: 1, name: 'Gạo tẻ máy loại ngon', group: 'Ngũ cốc', protein: 7.9, lipid: 0.7, carbohydrate: 76.1, image: 'https://images.unsplash.com/photo-1586201374902-6d1a31df6445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', ordinalNumbers: 112 },
//      { id: 2, name: 'Thịt lợn ba chỉ loại 1', group: 'Thịt gia súc', protein: 16.5, lipid: 21.5, carbohydrate: 0, image: 'https://images.unsplash.com/photo-1606843049200-55a0ac331909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9yayUyMGJlbGx5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', ordinalNumbers: 205 },
//      { id: 3, name: 'Cải bó xôi Đà Lạt', group: 'Rau xanh', protein: 2.9, lipid: 0.4, carbohydrate: 3.6, image: 'https://images.unsplash.com/photo-1576045057193-a45b41805369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', ordinalNumbers: 312 },
//      { id: 4, name: 'Táo Fuji nhập khẩu', group: 'Trái cây', protein: 0.3, lipid: 0.2, carbohydrate: 14, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', ordinalNumbers: 401 },
//      { id: 5, name: 'Cá hồi Nauy phi lê', group: 'Thủy hải sản', protein: 20, lipid: 13, carbohydrate: 0, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9uJTIwZmlsbGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', ordinalNumbers: 220 },
//      { id: 6, name: 'Sữa tươi không đường', group: 'Sản phẩm sữa', protein: 3.2, lipid: 3.3, carbohydrate: 4.8, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlsa3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', ordinalNumbers: 501 }
//  ];


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