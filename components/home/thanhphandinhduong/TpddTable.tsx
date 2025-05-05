"use client"
import React, { useState } from 'react';

const foodData = [
  { id: 1, name: 'Gạo', category: 'Ngũ cốc' },
  { id: 2, name: 'Thịt bò', category: 'Thịt' },
  { id: 3, name: 'Rau cải', category: 'Rau' },
  { id: 4, name: 'Táo', category: 'Trái cây' },
];

export default function FoodSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFood = foodData.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center p-8 pt-50">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Tìm kiếm Lương thực & Thực phẩm</h2>
      <input
        type="text"
        placeholder="Nhập tên thực phẩm..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="mt-6 w-2/3">
        <table className="w-full border border-gray-300 rounded-lg shadow-lg bg-white">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3">Tên</th>
              <th className="p-3">Loại</th>
            </tr>
          </thead>
          <tbody>
            {filteredFood.map(food => (
              <tr key={food.id} className="text-gray-700 border-t border-gray-300">
                <td className="p-3">{food.name}</td>
                <td className="p-3">{food.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}