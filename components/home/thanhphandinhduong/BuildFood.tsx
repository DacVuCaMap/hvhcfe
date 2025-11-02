"use client";
import { Food } from '@/type/food';
import React, { useState, useMemo, useEffect, useCallback, use } from 'react'; // Đảm bảo đường dẫn đúng
import { Search, AlertTriangle } from 'lucide-react';
import TpddCard from './TpddCard';
import './TpddTable.css'
import { getRandomFoods } from '@/lib/api';
import Image from 'next/image';

export default function FoodSearch() {
    const [value, setValue] = useState(0);
    const [tempValue, setTempValue] = useState(0);
    const [error, setError] = useState('');
    const handleChange = (e: any) => {
        const val = e.target.value.trim();

        // Chỉ cho phép nhập ký tự số (0-9)
        if (/^\d*$/.test(val)) {
            // Nếu rỗng thì cho phép
            if (val === "") {
                setValue(val);
                return;
            }

            // Chuyển sang số và kiểm tra giới hạn
            const num = parseInt(val, 10);
            if (num >= 2500 && num <= 4860) {
                setValue(val);
            } else if (num < 2500) {
                setValue(val); // Cho phép nhập tạm thời để người dùng gõ tiếp
            }
            // Nếu vượt 4860 thì bỏ qua
        }
    };

    const handleClick = () => {
        if (value >= 2500 && value <= 4860) {
            setTempValue(value);
            setError('');
        }
        else{
            setError('Vui lòng nhập giá trị từ 2500 đến 4860');
        }

    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center p-8 pt-32">
            {/* Hiệu ứng hạt nổi (optional) */}
            {/* <div id="particles-js" className="absolute inset-0 z-0"></div> */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden pb-32 border-b border-gray-400">
                <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
                    {/* Logo and Department Info - Adjusted width and centering */}
                    <div className=''>
                        <Image
                            // Use actual logo path
                            src="/images/BuildFood.jpg"
                            alt="Logo Học Viện Hậu Cần"
                            width={2000} // Slightly smaller logo
                            height={90}
                            className="rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Introductory Text & Image Container */}
                    <div className=' text-gray-600 leading-relaxed space-y-4 animate-fade-in-right delay-100 text-sm w-[2000px]'>
                        <p>
                            Khẩu phần ăn là lượng thực phẩm và đồ uống mà một người tiêu thụ trong một ngày, được tính toán và sắp xếp sao cho cung cấp đầy đủ năng lượng và các chất dinh dưỡng cần thiết cho cơ thể, phù hợp với độ tuổi, giới tính, mức độ lao động và tình trạng sức khỏe.
                            Để thuận tiện trong việc xây dựng khẩu phần ăn cho bộ đội, trang web được thiết kế nhằm tính toán và đề xuất khẩu phần dựa trên mức lao động của quân nhân. Cụ thể, việc xác định khẩu phần được thực hiện theo nhu cầu năng lượng tương ứng với từng cường độ lao động (lao động nhẹ, vừa và nặng). Cách tiếp cận này giúp đảm bảo tính khoa học, đơn giản và phù hợp với thực tế huấn luyện, công tác của bộ đội, đồng thời giúp người sử dụng dễ dàng lựa chọn và điều chỉnh khẩu phần sao cho đáp ứng đúng nhu cầu dinh dưỡng và sức khỏe của từng đối tượng.
                            Xin mời bạn lựa chọn mức năng lượng cần cung cấp phù hợp với mức độ lao động và nhu cầu hoạt động của bộ đội. Việc xác định đúng mức năng lượng sẽ giúp hệ thống tính toán và đề xuất khẩu phần ăn hợp lý, bảo đảm đủ dinh dưỡng, duy trì sức khỏe và nâng cao hiệu quả công tác, huấn luyện.
                            Xin mời bạn nhập mức năng lượng cần cung cấp cho khẩu phần ăn.Hệ thống cho phép khống chế năng lượng trong khoảng từ 2.500 đến 4.860
                        </p>
                        <span className="text-xl font-bold text-gray-700">
                            Tra Cứu Dinh Dưỡng
                        </span>
                        <div className="w-full mx-auto flex items-center space-x-4">

                            {/* Ô nhập */}
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Nhập giá trị từ 2500 đến 4860"
                                    value={value == 0 ? '' : value}
                                    onChange={handleChange}
                                    className="w-full p-2 pl-12 sm:pl-16 text-base sm:text-lg bg-slate-800 bg-opacity-70 text-gray-100 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-60 transition-all duration-300 ease-in-out border border-slate-700 placeholder-gray-500"
                                />
                            </div>

                            {/* Nút xác nhận */}
                            <button
                                onClick={handleClick}
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out"
                            >
                                Xác nhận
                            </button>
                        </div>
                        <span className="text-xl text-red-700">
                            {error}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}