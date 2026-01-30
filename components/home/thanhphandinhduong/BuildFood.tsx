"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react'; // Đảm bảo đường dẫn đúng
import { PlusCircle, Search, Trash } from 'lucide-react';
import Image from 'next/image';
import { Food } from '@/type/food';
import { getRation, searchFood } from '@/lib/api';
import { useReactToPrint } from 'react-to-print';
type FoodWithValue = {
    food: Food;
    value: number;
    price?: number;
};
type defaultFoodValue = {
    name:string;
    price: number;
};



const dataTest1: FoodWithValue[] = [
    {
        food: {
            id: 10,
            name: "Dầu thực vật",
            ordinalNumbers: 266,
            group: "cooking_oil",
            protein: 0.0,
            lipid: 99.7,
            carbohydrate: 0.0,
            image: "/api/images/food/1762847817562-dau_TV.jpg",
        },
        value: 3.031470558464384,
    },
    {
        food: {
            id: 347,
            name: "Thịt lợn xô lọc",
            ordinalNumbers: 296,
            group: "meat",
            protein: 16.5,
            lipid: 21.5,
            carbohydrate: 0.0,
            image: null,
        },
        value: 0.0,
    },
    {
        food: {
            id: 399,
            name: "Giò thủ lợn",
            ordinalNumbers: 348,
            group: "meat",
            protein: 16.0,
            lipid: 54.3,
            carbohydrate: 0.0,
            image: null,
        },
        value: 50.0,
    },
    // ---- dữ liệu giả bổ sung ----
    {
        food: {
            id: 501,
            name: "Gạo tẻ",
            ordinalNumbers: 120,
            group: "grain",
            protein: 7.5,
            lipid: 0.6,
            carbohydrate: 77.0,
            image: null,
        },
        value: 200.0,
    },
    {
        food: {
            id: 502,
            name: "Khoai lang",
            ordinalNumbers: 145,
            group: "vegetable",
            protein: 1.2,
            lipid: 0.3,
            carbohydrate: 27.5,
            image: null,
        },
        value: 100.0,
    },
    {
        food: {
            id: 503,
            name: "Táo đỏ",
            ordinalNumbers: 178,
            group: "fruit",
            protein: 0.4,
            lipid: 0.2,
            carbohydrate: 14.0,
            image: null,
        },
        value: 80.0,
    },
    {
        food: {
            id: 504,
            name: "Sữa bò tươi",
            ordinalNumbers: 210,
            group: "dairy",
            protein: 3.2,
            lipid: 3.6,
            carbohydrate: 4.8,
            image: null,
        },
        value: 250.0,
    },
    {
        food: {
            id: 501,
            name: "Gạo tẻ",
            ordinalNumbers: 120,
            group: "grain",
            protein: 7.5,
            lipid: 0.6,
            carbohydrate: 77.0,
            image: null,
        },
        value: 200.0,
    },
    {
        food: {
            id: 501,
            name: "Gạo tẻ",
            ordinalNumbers: 120,
            group: "grain",
            protein: 7.5,
            lipid: 0.6,
            carbohydrate: 77.0,
            image: null,
        },
        value: 200.0,
    },
    {
        food: {
            id: 501,
            name: "Gạo tẻ",
            ordinalNumbers: 120,
            group: "grain",
            protein: 7.5,
            lipid: 0.6,
            carbohydrate: 77.0,
            image: null,
        },
        value: 200.0,
    },
];


export default function BuildFood() {
    const componentRef = useRef<HTMLDivElement>(null);
    const [dataRation, setDataRation] = useState<FoodWithValue[]>([]);
    const [energyTemp, setEnergyTemp] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [defaultData, setDefaultData] = useState<defaultFoodValue[]>([
        {name: 'Chất đốt', price: 0},{name: 'Vệ sinh dụng cụ', price: 0}
    ]);
    const handleChange = (e: any) => {
        const val = e.target.value.trim();

        // Chỉ cho phép nhập ký tự số (0-9)
        if (/^\d*$/.test(val)) {
            // Nếu rỗng thì cho phép
            if (val === "") {
                setEnergyTemp(0);
                return;
            }

            // Chuyển sang số và kiểm tra giới hạn
            const num = parseInt(val, 10);
            if (num >= 2500 && num <= 4860) {
                setEnergyTemp(parseFloat(val));
            } else if (num < 2500) {
                setEnergyTemp(parseFloat(val)); // Cho phép nhập tạm thời để người dùng gõ tiếp
            }
            // Nếu vượt 4860 thì bỏ qua
        }
    };

    const handleClick = async () => {
        setLoading(true);
        if (energyTemp >= 2500 && energyTemp <= 4860) {
            try {
                const data: FoodWithValue[] = await getRation(energyTemp);
                // console.log("sss", data);
                if (data) {
                    const filteredData = data.filter(item =>
                        typeof item.value === "number" && item.value !== 0
                    ); /// loại các trường hợp =0 và infinity

                    setDataRation(filteredData);
                }
                setError('');
            } catch (err) {
                setError('Có lỗi xảy ra khi lấy dữ liệu');
            }
        } else {
            setError('Vui lòng nhập giá trị từ 2500 đến 4860');
        }
        setLoading(false);
    };

    const handleTypeFood = (food: FoodWithValue): boolean => {
        let allowedGroups = ["meat", "seafood", "egg", "milk"]
        if (
            allowedGroups.includes(food.food.group) ||
            food.food.name.toLowerCase() === "mỡ lợn nước" ||
            food.food.name.toLowerCase().includes("nước mắm cá")
        ) {
            return true;
        } else {
            return false;
        }

    }
    const energyMain = useMemo(() => {
        return energyTemp + (energyTemp * 0.1);
    }, [dataRation]);

    // Tính totalPL chỉ khi dataRation thay đổi
    const totalPL = useMemo(() => {
        return dataRation.reduce(
            (acc, item, index) => {
                let flag = handleTypeFood(item); // true: động vật, false: thực vật
                let protein = parseFloat((item.food.protein * item.value / 100).toFixed(2));
                let lipid = parseFloat((item.food.lipid * item.value / 100).toFixed(2));
                let carb = parseFloat((item.food.carbohydrate * item.value / 100).toFixed(2));

                if (flag) {
                    acc.pdv += protein;
                    acc.ldv += lipid;
                } else {
                    acc.ptv += protein;
                    acc.ltv += lipid;
                }
                acc.price += (item.price ?? 0) * item.value ;
                acc.gluxit += carb;
                let nl: number = carb * 4 + protein * 4 + lipid * 9;
                acc.energy += nl;

                return acc;
            },
            { pdv: 0, ptv: 0, ldv: 0, ltv: 0, gluxit: 0, energy: 0, price: 0 }
        );
    }, [dataRation]);
    const demand = useMemo(() => {
        return {
            pdv: ((energyMain * 0.17) / 4) / 2,
            ptv: (energyMain * 0.17 / 4) - (energyMain * 0.17 / 4) / 2,
            ldv: (energyMain * 0.23 / 9) / 2,
            ltv: (energyMain * 0.23 / 9) - (energyMain * 0.23 / 9) / 2,
            gluxit: (energyMain * 60 / 100) / 4,
            energy: energyMain
        };
    }, [energyMain]);

    const f = (num: number | undefined | null): string => {
        if (num == null) return "-";
        return Number(num).toFixed(2);
    };

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Nutrition_Table',
        pageStyle: `
        @media print {
            @page { size: auto; margin: 20mm; }
            body { margin: 0; -webkit-print-color-adjust: exact; }
            /* Quan trọng: Bỏ các thanh scrollbar và container cố định */
            .overflow-auto { overflow: visible !important; height: auto !important; }
            
            .print-table { 
                width: 100%; 
                border-collapse: collapse; 
                table-layout: auto;
            }
            .print-table th, .print-table td { 
                padding: 8px; 
                border: 1px solid #000 !important; /* Đậm hơn để dễ nhìn khi in */
            }
            /* Xử lý ngắt trang */
            tr { page-break-inside: avoid !important; }
            thead { display: table-header-group; } /* Lặp lại tiêu đề ở mỗi trang */
            tfoot { display: table-footer-group; } /* Giữ footer ở cuối */
            
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            input { border: none !important; background: transparent !important; appearance: none; }
        }
    `,
        onBeforePrint: async () => { console.log('Preparing to print...'); },
        onAfterPrint: () => console.log('Print completed.'),
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const onChangePrice = (index: number, rawInput: string) => {
        let numericValue = rawInput.replace(/\D/g, '');
        const finalValue = numericValue === '' ? 0 : parseInt(numericValue);
        const updatedData = [...dataRation];
        updatedData[index].price = finalValue;
        setDataRation(updatedData);
    };
    const onChangeValue = (index: number, newValue: number) => {
        const newData = [...dataRation];
        newData[index].value = newValue;

        // Thêm logic tính toán nhanh các cột Protein, Lipid... tại đây
        // Ví dụ: newData[index].protein = (newData[index].food.protein * newValue) / 100;

        setDataRation(newData);
    };
    const handleDelete = (index: number) => {
        // Tạo mảng mới loại bỏ phần tử tại index
        const updatedData = dataRation.filter((_, i) => i !== index);

        // Cập nhật lại state   
        setDataRation(updatedData);
    };


    const [showResults, setShowResults] = useState(false);
    const [foodSuggestions, setFoodSuggestions] = useState<Food[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [displayTerm, setDisplayTerm] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(displayTerm);
        }, 300); // 300ms là đủ để cảm thấy mượt mà
        return () => clearTimeout(timer);
    }, [displayTerm]);

    useEffect(() => {
        if (!debouncedSearch.trim()) {
            setFoodSuggestions([]);
            setShowResults(false);
            return;
        }

        const fetchData = async () => {
            setLoadingSearch(true);
            try {
                const results = await searchFood(debouncedSearch);
                setFoodSuggestions(results);
                setShowResults(true);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoadingSearch(false);
            }
        };

        fetchData();
    }, [debouncedSearch]);

    const handleAddItem = (item: Food) => {
        let tempItem: FoodWithValue = { food: item, value: 0 };
        setDataRation([...dataRation, tempItem]);
    }
    // Giả sử đây là danh sách thực phẩm mẫu để tìm kiếm
    // const foodSuggestions: Food[] = [
    //     { id: 1, name: "Thịt bò loại 1", group: "Thịt", protein: 21, lipid: 3.8, carbohydrate: 0, image: "🥩", ordinalNumbers: 1 },
    //     { id: 2, name: "Cá thu tươi", group: "Thủy sản", protein: 18.2, lipid: 10.3, carbohydrate: 0, image: "🐟", ordinalNumbers: 2 },
    //     { id: 3, name: "Trứng gà ta", group: "Trứng", protein: 14.8, lipid: 11.6, carbohydrate: 0.5, image: "🥚", ordinalNumbers: 3 },
    //     { id: 4, name: "Bông cải xanh", group: "Rau", protein: 2.8, lipid: 0.4, carbohydrate: 7, image: "🥦", ordinalNumbers: 4 },
    // ];
    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center">

            <section className="w-full lg:px-8 px-2 py-16 md:py-20 pb-32 border-b border-gray-400">
                <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
                    {/* Logo and Department Info - Adjusted width and centering */}
                    <div className=''>
                        <Image
                            // Use actual logo path
                            src="/images/buildfood.jpg"
                            alt="Logo Học Viện Hậu Cần"
                            width={1500} // Slightly smaller logo
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
                                    value={energyTemp == 0 ? '' : energyTemp}
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

                {loading && (
                    <div className='bg-white mt-10 p-6 rounded-lg overflow-auto'>
                        <div className=" mt-4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                        </div>
                    </div>
                )}
                {!loading && dataRation.length > 0 && (
                    <div ref={componentRef} className="bg-white mt-10 p-6 rounded-lg overflow-auto">
                        <div className='text-gray-400 text-sm mb-10 no-print'>
                            Ghi chú: Trong quá trình tính toán, năng lượng khẩu phần cần phải thêm khoảng 10% so với mức năng lượng tiêu hao thực tế. Việc tính toán này để bù trừ hao hụt về lương thực, thực phẩm trong quá trình chế biến nấu nướng, để cơ thể sinh trưởng và phát triển, sự tiêu hóa hấp thụ có hạn ở từng cơ thể, sự sai lệch trong tính toán và những ảnh hưởng khác.
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 print-only">Bảng Xây dựng định lượng khẩu phần ăn</h2>
                            {/* THANH SEARCH NẰM GIỮA */}
                            <div className="relative flex-1 max-w-md mx-4 no-print">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm thực phẩm để tùy chỉnh bảng..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-green-400 focus:bg-white outline-none transition-all duration-300 shadow-sm"
                                        // Gán state hiển thị tức thì ở đây
                                        value={displayTerm}
                                        onChange={(e) => {
                                            setDisplayTerm(e.target.value);
                                            if (e.target.value.length === 0) setShowResults(false);
                                        }}
                                    />
                                    <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                                </div>
                            </div>

                            <button
                                onClick={handlePrint}
                                className="no-print bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                            >
                                Hiển Thị PDF
                            </button>
                        </div>


                        {/* Vùng kết quả Search - Animation Đẩy Bảng xuống */}
                        <div
                            className={`py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out overflow-hidden
      ${showResults ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 invisible'}`}
                        >
                            {loadingSearch ? (
                                [1, 2, 3, 4].map((i) => (
                                    <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-100 rounded-xl h-[74px]">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))
                            ) :
                                (
                                    foodSuggestions.map((food) => (
                                        <div
                                            key={food.id}
                                            onClick={() => {
                                                // Thêm logic thêm food vào bảng ở đây
                                                setShowResults(false);
                                                handleAddItem(food);
                                            }}
                                            className="group relative flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm 
                   hover:border-blue-400 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 overflow-hidden"
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg text-2xl group-hover:bg-blue-50 transition-colors">
                                                {food.image ? (
                                                    <Image
                                                        src={food.image}
                                                        alt={food.name}
                                                        height={500}
                                                        width={500}
                                                        loading='lazy'
                                                        className=""
                                                    />
                                                ) : "🍱"}
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-sm font-bold text-gray-800 truncate">{food.name}</span>
                                                <span className="text-xs text-gray-500 capitalize">{food.group}</span>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded">P: {food.protein}</span>
                                                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 rounded">L: {food.lipid}</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <PlusCircle size={16} className="text-blue-500" />
                                            </div>
                                        </div>
                                    ))
                                )}
                        </div>
                        <table className="print-table min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm leading-normal">
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">TT</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Tên LTTP</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Số lượng</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Đơn vị</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Đơn giá <br /> (kvnd/kg)</th>

                                    <th colSpan={2} className="py-3 px-4 sm:px-6 text-center border-gray-300">Protein</th>

                                    <th colSpan={2} className="py-3 px-4 sm:px-6 text-center border-gray-300">Lipid</th>

                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Gluxit</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Năng lượng <br /> (KCal)</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300">Thành tiền <br /> (kvnd)</th>
                                    <th rowSpan={2} className="py-3 px-4 sm:px-6 text-center border-b-2 border-gray-300 no-print"></th>
                                </tr>
                                <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm leading-normal">
                                    <th className="py-2 px-4 text-center border-b-2 border-r-2 border-gray-300">P(đv)</th>
                                    <th className="py-2 px-4 text-center border-b-2 border-gray-300">P(tv)</th>
                                    <th className="py-2 px-4 text-center border-b-2 border-r-2 border-gray-300">L(đv)</th>
                                    <th className="py-2 px-4 text-center border-b-2 border-gray-300">L(tv)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataRation.length > 0 &&
                                    dataRation.map((item, index) => {
                                        let type = handleTypeFood(item);
                                        let protein = (item.food.protein * item.value / 100).toFixed(2);
                                        let lipid = (item.food.lipid * item.value / 100).toFixed(2);
                                        let carb = parseFloat((item.food.carbohydrate * item.value / 100).toFixed(2));
                                        let nl: number = carb * 4 + parseFloat(protein) * 4 + parseFloat(lipid) * 9;
                                        let tempPrice = (item.price ?? 0);
                                        let sumPrice = (tempPrice * 1000 * item.value * 1000) / 1000000;
                                        return (
                                            (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="py-3 px-4 sm:px-6 text-center">{index + 1}</td>
                                                    <td className="py-3 px-4 sm:px-6">{item.food.name}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">
                                                        <input
                                                            key={`${index}-${item.value}`}
                                                            type="number"
                                                            step="any"
                                                            inputMode="decimal"
                                                            className="w-24 text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 px-1 font-medium"
                                                            defaultValue={item.value || "0"}
                                                            onBlur={(e) => {
                                                                const val = parseFloat(e.target.value);
                                                                onChangeValue(index, isNaN(val) ? 0 : val);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') e.currentTarget.blur();
                                                            }}
                                                        />

                                                    </td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">g</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">

                                                        <input
                                                            type="number"
                                                            className="w-24 text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 px-1 font-medium"
                                                            value={item.price === 0 ? "" : (item.price ?? "")}
                                                            onChange={(e) => onChangePrice(index, e.target.value)}

                                                        />
                                                    </td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">{type && protein}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">{!type && protein}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">{type && lipid}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">{!type && lipid}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">{carb}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center">{nl.toFixed(2)}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center truncate max-w-32">{sumPrice.toFixed(0)}</td>
                                                    <td className="py-3 px-4 sm:px-6 text-center w-20 no-print">
                                                        <button
                                                            className="p-4 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 active:scale-90"
                                                            title="Xóa dòng này"
                                                            onClick={() => {
                                                                if (window.confirm("Bạn có chắc chắn muốn xóa thực phẩm này?")) {
                                                                    handleDelete(index);
                                                                }
                                                            }}
                                                        >
                                                            <Trash size={18} />
                                                        </button>
                                                    </td>
                                                </tr>

                                            )
                                        )
                                    })

                                }

                                <tr className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 1}</td>
                                    <td className="py-3 px-4 sm:px-6">Chất đốt</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">
                                        <input
                                            type="number"
                                            className="w-24 text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 px-1 font-medium"
                                            value={Number(defaultData[0]?.price || 0).toString()}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                const newData = [...defaultData];
                                                newData[0].price = value;
                                                setDefaultData(newData);
                                            }}

                                        />

                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">
                                        {defaultData[0]?.price.toFixed(0)}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print"></td>
                                </tr>

                                <tr className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 2}</td>
                                    <td className="py-3 px-4 sm:px-6">Vệ sinh dụng cụ</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">
                                        <input
                                            type="number"
                                            className="w-24 text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 px-1 font-medium"
                                            value={Number(defaultData[1]?.price || 0).toString()}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                const newData = [...defaultData];
                                                newData[1].price = value;
                                                setDefaultData(newData);
                                            }}

                                        />
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center">
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">
                                        {defaultData[1]?.price.toFixed(0)}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print"></td>
                                </tr>
                                {/* Dòng Cộng */}
                                <tr className="border-b border-gray-200 hover:bg-gray-50 font-bold">
                                    <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 1}</td>
                                    <td className="py-3 px-4 sm:px-6">Cộng</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.pdv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.ptv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.ldv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.ltv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.gluxit)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.energy)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">
                                        {(totalPL.price + defaultData[0].price + defaultData[1].price).toFixed(0)}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print"></td>
                                </tr>

                                {/* Dòng Nhu cầu */}
                                <tr className="border-b border-gray-200 hover:bg-gray-50 font-bold">
                                    <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 2}</td>
                                    <td className="py-3 px-4 sm:px-6">Nhu cầu</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(demand.pdv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(demand.ptv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(demand.ldv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(demand.ltv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(demand.gluxit)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(demand.energy)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print"></td>
                                </tr>

                                {/* Dòng Sai số */}
                                <tr className="border-b border-gray-200 hover:bg-gray-50 font-bold">
                                    <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 3}</td>
                                    <td className="py-3 px-4 sm:px-6">Sai số</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.pdv - demand.pdv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.ptv - demand.ptv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.ldv - demand.ldv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.ltv - demand.ltv)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.gluxit - demand.gluxit)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center">{f(totalPL.energy - demand.energy)}</td>
                                    <td className="py-3 px-4 sm:px-6 text-center"></td>
                                    <td className="py-3 px-4 sm:px-6 text-center no-print"></td>
                                </tr>
                            </tbody>
                        </table>


                    </div>

                )}



            </section>
        </div>
    );
}