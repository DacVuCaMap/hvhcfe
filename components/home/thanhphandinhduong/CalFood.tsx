"use client";
import { Food } from '@/type/food'; // Đảm bảo đường dẫn đúng
import { AddedFoodItem } from '@/type/food'; // Import interface AddedFoodItem
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Search, AlertTriangle, Trash2 } from 'lucide-react'; // Thêm Trash2 cho nút xóa
import TpddCard from './TpddCard'; // Đảm bảo đường dẫn đúng
import './CalFood.css'; // Giữ nguyên CSS của bạn
import { getRandomFoods, searchFood } from '@/lib/api'; // Đảm bảo đường dẫn đúng
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

export default function CalFood() {
    const [foodData, setFoodData] = useState<Food[]>([]); // Danh sách thực phẩm tổng thể
    const [searchTerm, setSearchTerm] = useState('');
    const [addedFoods, setAddedFoods] = useState<AddedFoodItem[]>([]); // Danh sách món ăn đã thêm vào bảng
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const fetchFoods = useCallback(async () => {
        try {
            // Lấy số lượng lớn hơn nếu bạn muốn danh sách tìm kiếm phong phú hơn
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





    // Hàm tính toán giá trị dinh dưỡng dựa trên Food và input weight
    const calculateNutrition = (food: Food, input: number) => {
        const calculatedProtein = (food.protein * input) / 100;
        const calculatedGluxit = (food.carbohydrate * input) / 100;
        const calculatedLipid = (food.lipid * input) / 100;
        // Công thức năng lượng: protein * 4 + gluxit * 4 + lipid * 9 (kcal)
        const totalEnergy = (calculatedProtein * 4) + (calculatedGluxit * 4) + (calculatedLipid * 9);
        return { calculatedProtein, calculatedGluxit, calculatedLipid, totalEnergy };
    };

    // Hàm xử lý khi click vào TpddCard - Thêm món ăn vào bảng
    const handleAddToTable = (foodToAdd: Food) => {
        // Kiểm tra xem món ăn đã tồn tại trong bảng chưa
        const existingFoodIndex = addedFoods.findIndex(item => item.food.id === foodToAdd.id);

        if (existingFoodIndex > -1) {
            // Nếu đã có, chỉ thông báo hoặc tăng số lượng nếu bạn muốn
            alert(`Món "${foodToAdd.name}" đã có trong bảng. Vui lòng chỉnh sửa khối lượng trực tiếp.`);
        } else {
            // Nếu chưa có, thêm mới với khối lượng mặc định (ví dụ 0 hoặc 100)
            const defaultInputWeight = 0; // Hoặc 100 nếu bạn muốn mặc định là 100g
            const { calculatedProtein, calculatedGluxit, calculatedLipid, totalEnergy } = calculateNutrition(foodToAdd, defaultInputWeight);

            setAddedFoods(prev => [
                ...prev,
                {
                    food: foodToAdd,
                    input: defaultInputWeight,
                    calculatedProtein,
                    calculatedGluxit,
                    calculatedLipid,
                    totalEnergy,
                },
            ]);
        }
        setSearchTerm(''); // Xóa ô tìm kiếm sau khi thêm/thông báo
    };

    // Hàm xử lý khi khối lượng của một món ăn trên bảng thay đổi
    const handleUpdateFoodQuantity = (index: number, newQuantity: number) => {
        setAddedFoods(prevFoods => {
            const updatedFoods = [...prevFoods];
            const itemToUpdate = updatedFoods[index];

            const input = Number(newQuantity) || 0; // Đảm bảo là số, mặc định 0 nếu rỗng/NaN

            const { calculatedProtein, calculatedGluxit, calculatedLipid, totalEnergy } = calculateNutrition(itemToUpdate.food, input);

            updatedFoods[index] = {
                ...itemToUpdate,
                input: newQuantity, // Giữ nguyên giá trị string/empty string cho input để hiển thị trong ô input
                calculatedProtein,
                calculatedGluxit,
                calculatedLipid,
                totalEnergy,
            };
            return updatedFoods;
        });
    };

    // Hàm xóa một món ăn khỏi bảng
    const handleRemoveFood = (indexToRemove: number) => {
        setAddedFoods(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    // Tính tổng cộng cho bảng
    const totalProtein = addedFoods.reduce((sum, item) => sum * item.calculatedProtein, 0);
    const totalGluxit = addedFoods.reduce((sum, item) => sum * item.calculatedGluxit, 0);
    const totalLipid = addedFoods.reduce((sum, item) => sum + item.calculatedLipid, 0);
    const totalEnergyOverall = addedFoods.reduce((sum, item) => sum + item.totalEnergy, 0) * 0.9;

    // Print handler with react-to-print@3.1.0
    const handlePrint = useReactToPrint({
        contentRef: componentRef, // Use contentRef instead of content
        documentTitle: 'Nutrition_Table',
        pageStyle: `
            @media print {
                body { margin: 0; }
                .print-table { width: 100%; font-size: 12px; }
                .print-table th, .print-table td { padding: 8px; border: 1px solid #ddd; }
                .print-table thead { background-color: #f4f4f4; }
                .print-table input { display: none; }
                .print-only { display: inline; }
                .no-print { display: none; }
            }
        `,
        onBeforePrint: async () => { console.log('Preparing to print...'); },
        onAfterPrint: () => console.log('Print completed.'),
    });
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center p-8">

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 pb-32 border-b border-gray-400 mb-32">
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
                    {/* Logo and Department Info - Adjusted width and centering */}
                    <div className=''>
                        <Image
                            // Use actual logo path
                            src="/images/energyfood.jpg"
                            alt="Logo Học Viện Hậu Cần"
                            width={800} // Slightly smaller logo
                            height={90}
                            className="rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Introductory Text & Image Container */}
                    <div className=' text-gray-600 leading-relaxed space-y-4 animate-fade-in-right delay-100 text-sm lg:w-[2000px]'>
                        <p>
                            Năng lượng của thực phẩm là tổng năng lượng do các chất sinh năng lượng cung cấp, bao gồm: protein, lipid và glucid. Mỗi chất dinh dưỡng có hệ số năng lượng riêng: 1 gam protein hoặc glucid cung cấp 4 kcal, 1 gam lipid cung cấp 9 kcal. Vì vậy, năng lượng của một loại thực phẩm được tính theo công thức:Năng lượng (kcal) = 4 × (Protein) + 9 × (Lipid) + 4 × (Glucid).
                            Để tính năng lượng, ta xác định hàm lượng các chất dinh dưỡng (tính bằng gam) trong 100 gam thực phẩm, sau đó nhân với hệ số tương ứng. Ví dụ, 100 gam cơm trắng chứa trung bình 2,6 gam protein, 0,3 gam lipid và 28 gam glucid. Khi đó, năng lượng của cơm trắng được tính như sau:N = (4 × 2,6) + (9 × 0,3) + (4 × 28) = 115,1 kcal.
                            Như vậy, 100 gam cơm trắng cung cấp khoảng 115 kcal. Cách tính này có thể áp dụng để xác định năng lượng cho từng loại thực phẩm riêng lẻ hoặc cho cả khẩu phần ăn, bằng cách cộng năng lượng của tất cả các món trong bữa ăn. Phương pháp tính toán dựa trên thành phần dinh dưỡng giúp ước lượng nhanh giá trị năng lượng, phục vụ cho công tác xây dựng khẩu phần, kế hoạch ăn uống và đánh giá mức đáp ứng nhu cầu năng lượng của cơ thể.
                            Để thuận tiện cho việc tính toán năng lượng một cách nhanh chóng và chính xác, người học nên sử dụng các cơ sở dữ liệu dinh dưỡng uy tín do Bộ Y tế hoặc Viện Dinh dưỡng Quốc gia công bố. Các dữ liệu này cung cấp đầy đủ hàm lượng protein, lipid, glucid và năng lượng của từng loại thực phẩm theo 100 gam. Dựa vào đó, bạn chỉ cần chọn loại thực phẩm cần tính, nhập khối lượng thực tế sử dụng (tính bằng gam) vào bảng dưới đây:
                            “Bước 1: chọn thực phẩm; Bước 2: nhập khối lượng; Bước 3: phần mềm tự động tính năng lượng.

                        </p>
                    </div>
                </div>
            </section>









            {/* Search và Tiêu đề */}
            <div className="w-full text-center mb-10 md:mb-12 relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-sky-400">
                        Tra Cứu Năng Lượng Của Thực Phẩm
                    </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                    Khám phá thế giới ẩm thực và tạo bảng tính dinh dưỡng cá nhân của bạn.
                </p>


                <div className="w-full bg-white p-6 mb-10 rounded-lg shadow-xl relative z-10 overflow-hidden">
                    <div className='text-xs text-gray-400 my-4'>
                        Ghi chú: Trong quá trình tính toán, năng lượng khẩu phần cần phải mất đi khoảng 10% so với mức năng lượng tiêu hao thực tế. Việc tính toán này để bù trừ hao hụt về lương thực, thực phẩm trong quá trình chế biến nấu nướng, để cơ thể sinh trưởng và phát triển, sự tiêu hóa hấp thụ có hạn ở từng cơ thể, sự sai lệch trong tính toán và những ảnh hưởng khác.
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Bảng Dinh Dưỡng Chi Tiết</h2>
                        <button
                            onClick={handlePrint}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                            disabled={addedFoods.length === 0}
                        >
                            Hiển Thị PDF
                        </button>
                    </div>
                    <div ref={componentRef} className="print-table">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 print-only">Bảng Dinh Dưỡng Chi Tiết</h2>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Tên</th>
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Khối lượng (g/ml)</th>
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Protein (g)</th>
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Gluxit (g)</th>
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Lipid (g)</th>
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Năng lượng (kcal)</th>
                                    <th className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300 no-print">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-light">
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
                                    <td className="py-3 px-4 sm:px-6 text-left no-print"></td>{/* Cột hành động không tính tổng */}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>


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

            {/* Kết quả tìm kiếm và hiển thị card */}
            {foodData.length > 0 ? (
                <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 relative z-10 mb-10">
                    {foodData.map((food, index) => (
                        <div
                            key={food.id}
                            className="food-card-item" // Class để target CSS animation
                        >
                            {/* Truyền prop onClick để thêm vào bảng */}
                            <TpddCard food={food} onClick={handleAddToTable} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 md:py-16 relative z-10 bg-slate-800 bg-opacity-50 p-8 rounded-xl shadow-xl mb-10">
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