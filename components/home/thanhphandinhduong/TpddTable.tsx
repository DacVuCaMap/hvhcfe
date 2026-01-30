"use client";
import { Food } from '@/type/food';
import React, { useState, useMemo, useEffect, useCallback } from 'react'; // Đảm bảo đường dẫn đúng
import { Search, AlertTriangle } from 'lucide-react';
import TpddCard from './TpddCard';
import './TpddTable.css'
import { getRandomFoods, searchFood } from '@/lib/api';
import Image from 'next/image';

export default function FoodSearch() {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
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
  }, [fetchFoods])

  useEffect(() => {
    if (!searchTerm) {
      // 👉 thay vì clear, gọi lại fetchFoods
      fetchFoods();
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchFood(searchTerm); // gọi API server
        setFoodData(results);
      } catch (err) {
        console.error("Failed to search foods:", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, fetchFoods]);


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center p-8">
      {/* Hiệu ứng hạt nổi (optional) */}
      {/* <div id="particles-js" className="absolute inset-0 z-0"></div> */}
      <section className="container lg:px-8 py-16 md:py-20 pb-32 border-b border-gray-400 mb-32">
        <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
          {/* Logo and Department Info - Adjusted width and centering */}
          <div className=''>
            <Image
              // Use actual logo path
              src="/images/fruit.jpg"
              alt="Logo Học Viện Hậu Cần"
              width={2000} // Slightly smaller logo
              height={90}
              className="rounded-lg shadow-xl"
            />
          </div>

          {/* Introductory Text & Image Container */}
          <div className=' text-gray-600 leading-relaxed space-y-4 animate-fade-in-right delay-100 text-sm lg:w-[2000px]'>
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
          <div className="relative  md:w-3/4 lg:w-[800px] mx-auto">
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
            {/* Vòng xoay loading */}
            <div className="w-16 h-16 border-4 border-t-4 border-green-400 border-opacity-50 rounded-full animate-spin mb-6"></div>

            {/* Text */}
            <p className="text-xl text-gray-100 font-semibold mb-2 animate-pulse">
              Đang tải dữ liệu...
            </p>
            <p className="text-gray-400 text-sm">
              Vui lòng chờ trong giây lát, chúng tôi đang tìm kiếm thực phẩm cho bạn.
            </p>
          </div>
        )}

        {foodData.length > 0 && !loading && (
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 relative z-10">
            {foodData.map((food, index) => (
              <div
                key={food.id}
                className="food-card-item" // Class để target CSS animation
              >
                <TpddCard food={food} />
              </div>
            ))}
          </div>
        )}

        {foodData.length === 0 && !loading && (
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
      </section>
    </div>
  );
}