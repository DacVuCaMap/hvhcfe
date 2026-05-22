// src/components/FoodSearch.tsx
"use client";
import { Food } from '@/type/food';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, AlertTriangle, X } from 'lucide-react'; // 👉 Thêm icon X
import TpddCard from './TpddCard';
import './TpddTable.css';
import { getRandomFoods, searchFood, apiShowPdf } from '@/lib/api'; // 👉 Thêm apiShowPdf vào đây
import Image from 'next/image';

export default function FoodSearch() {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Các State phục vụ quản lý Modal PDF ở cấp cha ---
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [modalLoading, setModalLoading] = useState(false);

  const fetchFoods = useCallback(async () => {
    try {
      const fetchedFoods = await getRandomFoods(20);
      setFoodData(fetchedFoods);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  useEffect(() => {
    if (!searchTerm) {
      fetchFoods();
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchFood(searchTerm);
        setFoodData(results);
      } catch (err) {
        console.error("Failed to search foods:", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, fetchFoods]);

  // --- Hàm xử lý kích hoạt gọi API hiển thị PDF ---
  const handleOpenDetail = async (food: Food) => {
    setSelectedFood(food);
    setModalLoading(true);
    setPdfUrl(""); // Reset url cũ

    try {
      const response: any = await apiShowPdf(food.ordinalNumbers, food.group);
      if (!response) {
        console.error("Không nhận được dữ liệu PDF");
        return;
      }
      const pdfBlob = new Blob([response], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Lỗi khi tải PDF:", error);
    } finally {
      setModalLoading(false);
    }
  };

  // --- Hàm xử lý đóng Modal và thu hồi bộ nhớ ---
  const handleCloseModal = () => {
    setSelectedFood(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // Thu hồi URL để tránh tràn RAM bộ nhớ duyệt trình
      setPdfUrl("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center p-8">
      <section className="container lg:px-8 py-16 md:py-20 pb-32 border-b border-gray-400 mb-32">
        <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
          <div>
            <Image
              src="/images/fruit.jpg"
              alt="Logo Học Viện Hậu Cần"
              width={2000}
              height={90}
              className="rounded-lg shadow-xl"
            />
          </div>

          <div className='text-gray-600 leading-relaxed space-y-4 animate-fade-in-right delay-100 text-sm lg:w-[2000px]'>
            <p>
               Bảng thành phần thực phẩm (Food Composition Table) là một trong những đầu ra nghiên cứu quan trọng trong lĩnh vực

              Khoa học về thực phẩm (Food science). Bảng thành phần thực phẩm là một công cụ không thể thiếu trong nghiên cứu

              về dinh dưỡng, đặc biệt là các nghiên cứu về khẩu phần ăn uống, dịch tễ học dinh dưỡng và chế độ dinh dưỡng-tiết

              chế trong lâm sàng và ăn điều trị cho bệnh nhân. Ngày nay, Bảng thành phần thực phẩm còn được sử dụng rộng rãi

              trong lĩnh vực xây dựng chính sách, lập kế hoạch về dinh dưỡng, đảm bảo an ninh thực phẩm cấp quốc gia và gia đình

              nhằm đáp ứng nhu cầu dinh dưỡng, từ đó có kế hoạch phát triển sản xuất thực phẩm phù hợp. Đây cũng là tài liệu gốc

              phục vụ giảng dạy, nghiên cứu và triển khai công tác giáo dục dinh dưỡng cho cộng đồng, cho người tiêu dùng trong

              việc lựa chọn thực phẩm phù hợp với tình hình sức khoẻ. Trong điều kiện hội nhập hiện nay với một thị trường thực

              phẩm Việt nam ngày càng đa dạng, nhiều đòi hỏi thông tin không chỉ là các chất dinh dưỡng và phi dinh dưỡng trong

              thực phẩm mà cần có thông tin về các chất chống oxy hóa, các hợp chất có hoạt tính sinh học đóng vai trò quan

              trọng bảo vệ, nâng cao sức khoẻ và phòng chống bệnh tật. Mặt khác, do sự giao lưu trên thị trường thực phẩm nhập

              khẩu đang diễn ra mạnh mẽ đòi hỏi các thông tin cập nhật và chi tiết hơn. Chính vì vậy, Viện Dinh dưỡng đã tiến

              hành nghiên cứu trong nhiều năm về phân tích thành phần thực phẩm Việt nam, cập nhật, bổ sung và xuất bản Bảng

              thành phần thực phẩm Việt nam. Đây cũng là công trình kế thừa, tiếp thu và nâng cao hoàn thiện từ các công trình

              “Bảng thành phần hoá học thức ăn Việt Nam xuất bản năm 1972, và tiếp theo là “Bảng thành phần dinh dưỡng thực phẩm

              Việt Nam xuất bản năm 2000”. Lần biên soạn này, đã cập nhật rất nhiều về thành phần các chất sinh năng lượng, các acid amin, acid béo, acid folic, các loại đường, hàm lượng khoáng, chất xơ, vi khoáng, vitamin và đặc biệt là thành phần hợp chất hoá thực vật trong thực phẩm hiện có trên thị trường Việt Nam.


            </p>
          </div>
        </div>
      </section>

      <section className='pb-64'>
        <div className="w-full text-center mb-10 md:mb-12 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-sky-400">
              Tra Cứu Thành Phần Thực Phẩm
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Khám phá thế giới ẩm thực và tìm hiểu thông tin chi tiết về các loại lương thực, thực phẩm yêu thích của bạn.
          </p>
          <div className="relative md:w-3/4 lg:w-[800px] mx-auto">
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

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 md:py-16 relative z-10">
            <div className="w-16 h-16 border-4 border-t-4 border-green-400 border-opacity-50 rounded-full animate-spin mb-6"></div>
            <p className="text-xl text-gray-100 font-semibold mb-2 animate-pulse">
              Đang tải dữ liệu...
            </p>
          </div>
        )}

        {foodData.length > 0 && !loading && (
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 relative z-10">
            {foodData.map((food) => (
              <div key={food.id} className="food-card-item">
                {/* 👉 Truyền hàm handleOpenDetail vào prop onViewDetail */}
                <TpddCard food={food} onViewDetail={handleOpenDetail} />
              </div>
            ))}
          </div>
        )}

        {foodData.length === 0 && !loading && (
          <div className="text-center py-12 md:py-16 relative z-10 bg-slate-800 bg-opacity-50 p-8 rounded-xl shadow-xl">
            <AlertTriangle className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            <p className="text-2xl text-gray-100 font-semibold mb-3">Không tìm thấy kết quả nào</p>
          </div>
        )}
      </section>

      {/* --- ĐOẠN MODAL ĐƯỢC ĐẶT Ở ĐÂY (CẤP CHA - NGOÀI VÒNG LẶP) --- */}
      {selectedFood && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
          {/* Lớp overlay click ngoài để đóng modal */}
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          
          {/* Khung nội dung chính của Modal */}
          <div className="relative w-full max-w-5xl h-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10">
            
            {/* Header Modal */}
            <div className=" flex justify-end px-6 py-2 border-b border-gray-200 bg-gray-50">
              <button 
                onClick={handleCloseModal}
                className="hover:cursor-pointer p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body nhúng PDF */}
            <div className="flex-1 bg-gray-100 p-2 relative">
              {modalLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
                  <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-opacity-30 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 font-medium">Đang tải tệp tin PDF...</p>
                </div>
              ) : pdfUrl ? (
                <iframe 
                  src={`${pdfUrl}#toolbar=1`} 
                  className="w-full h-full rounded-lg border-0"
                  title={`PDF ${selectedFood.name}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-red-500">
                  Không thể tải nội dung tài liệu. Vui lòng thử lại!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}