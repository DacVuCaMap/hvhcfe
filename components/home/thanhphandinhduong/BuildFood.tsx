"use client";
import React, { useState } from 'react'; // Đảm bảo đường dẫn đúng
import { Search } from 'lucide-react';
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
        else {
            setError('Vui lòng nhập giá trị từ 2500 đến 4860');
        }

    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center">
            <section className="container lg:px-8 py-16 md:py-20 pb-32 border-b border-gray-400">
                <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
                    {/* Logo and Department Info - Adjusted width and centering */}
                    <div className=''>
                        <Image
                            // Use actual logo path
                            src="/images/buildfood.jpg"
                            alt="Logo Học Viện Hậu Cần"
                            width={2000} // Slightly smaller logo
                            height={90}
                            className="rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Introductory Text & Image Container */}
                    <div className=' text-gray-600 leading-relaxed space-y-4 animate-fade-in-right delay-100 text-sm lg:w-[2000px]'>
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
                                Xây dựng khẩu phần ăn
                            </button>
                        </div>
                        <span className="text-xl text-red-700">
                            {error}
                        </span>
                    </div>
                </div>

                <div className="bg-white mt-10 p-6 rounded-lg overflow-auto">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 print-only">Bảng Xây dựng định lượng khẩu phần ăn</h2>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                                <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">TT</th>
                                <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Tên LTTP</th>
                                <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Số lượng</th>
                                <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Đơn vị</th>

                                <th colSpan={2} className="py-3 px-4 sm:px-6 text-center border-gray-300">Protein</th>

                                <th colSpan={2} className="py-3 px-4 sm:px-6 text-center border-gray-300">Lipid</th>

                                <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Gluxit</th>
                                <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300 no-print">Năng lượng</th>
                            </tr>
                            <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm leading-normal">
                                <th className="py-2 px-4 text-center border-b-2 border-r-2 border-gray-300">P(đv)</th>
                                <th className="py-2 px-4 text-center border-b-2 border-gray-300">P(tv)</th>
                                <th className="py-2 px-4 text-center border-b-2 border-r-2 border-gray-300">L(đv)</th>
                                <th className="py-2 px-4 text-center border-b-2 border-gray-300">L(tv)</th>
                            </tr>
                        </thead>

                        {/* <tbody className="text-gray-700 text-sm font-light">
                            {addedFoods.map((item, index) => (
                                <tr key={`${item.food.id}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-3 px-4 sm:px-6 text-center whitespace-nowrap">{item.food.name}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print">
                                        <input
                                            type="number"
                                            value={item.input === 0 ? '' : item.input} // Hiển thị rỗng nếu giá trị là 0 để người dùng dễ nhập
                                            onChange={(e) => handleUpdateFoodQuantity(index, Number(e.target.value))}
                                            onBlur={(e) => { // Khi blur, nếu rỗng hoặc NaN thì đặt lại về 0
                                                if (e.target.value === '' || isNaN(Number(e.target.value))) {
                                                    handleUpdateFoodQuantity(index, 0);
                                                }
                                            }}
                                            min="0"
                                            className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-center"
                                        />
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center print-only">{item.input === 0 ? '' : item.input}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{item.calculatedProtein.toFixed(2)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{item.calculatedGluxit.toFixed(2)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{item.calculatedLipid.toFixed(2)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{item.totalEnergy.toFixed(2)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print">
                                        <button
                                            onClick={() => handleRemoveFood(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                            title="Xóa món ăn này"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {addedFoods.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                                        Chưa có món ăn nào được thêm vào bảng. Hãy tìm kiếm và chọn món ăn từ danh sách trên!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 text-gray-800 font-semibold text-sm sm:text-base leading-normal border-t-2 border-gray-400">
                                <td className="py-3 px-4 sm:px-6 text-left" colSpan={5}>Tổng cộng</td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalEnergyOverall.toFixed(2)}</td>
                                <td className="py-3 px-4 sm:px-6 text-left no-print"></td>
                            </tr>
                        </tfoot> */}
                    </table>
                </div>


            </section>
        </div>
    );
}