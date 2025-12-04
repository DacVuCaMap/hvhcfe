"use client";
import React, { useState } from 'react'; // Đảm bảo đường dẫn đúng
import { Search } from 'lucide-react';
import Image from 'next/image';
import { Food } from '@/type/food';
type FoodWithValue = {
    food: Food;
    value: number;
};

const dataTest: FoodWithValue[] = [
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
];


export default function BuildFood() {
    const [dataRation, setDataRation] = useState<FoodWithValue[]>(dataTest);
    const [energyTemp, setEnergyTemp] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [error, setError] = useState('');
    const handleChange = (e: any) => {
        const val = e.target.value.trim();

        // Chỉ cho phép nhập ký tự số (0-9)
        if (/^\d*$/.test(val)) {
            // Nếu rỗng thì cho phép
            if (val === "") {
                setEnergyTemp(val);
                return;
            }

            // Chuyển sang số và kiểm tra giới hạn
            const num = parseInt(val, 10);
            if (num >= 2500 && num <= 4860) {
                setEnergyTemp(val);
            } else if (num < 2500) {
                setEnergyTemp(val); // Cho phép nhập tạm thời để người dùng gõ tiếp
            }
            // Nếu vượt 4860 thì bỏ qua
        }
    };

    const handleClick = () => {
        if (energyTemp >= 2500 && energyTemp <= 4860) {
            setEnergy(energy);
            setError('');
        }
        else {
            setError('Vui lòng nhập giá trị từ 2500 đến 4860');
        }

    };
    const handleTypeFood = (food: FoodWithValue): boolean => {
        let allowedGroups = ["meat", "seafood", "egg", "milk"]
        if (allowedGroups.includes(food.food.group) || food.food.name === "mỡ lợn nước" || food.food.name === "nước mắm cá loại 1") {
            return true;
        }
        else {
            return false
        }
    }
    const handleProtein = (food: FoodWithValue, type: boolean): number => {
        let mp = energy * 0.17 / 4;
        if (type) {
            return mp / 2;
        }
        else {
            return mp - (mp / 2);
        }
    }
    const totalPL = dataTest.reduce(
        (acc, item,index) => {
            let flag = handleTypeFood(item); // true la dong vat, false la thuc vat
            let protein = parseFloat((item.food.protein * item.value / 100).toFixed(2));
            let lipid = parseFloat((item.food.lipid * item.value / 100).toFixed(2));
            let carb = parseFloat((item.food.carbohydrate * item.value/100).toFixed(2));
            if (flag) {
                acc.pdv += protein;
                acc.ldv += lipid;
            }
            else {
                acc.ptv += protein;
                acc.ltv += lipid;
            }
            acc.gluxit += carb;
            let nl: number = carb * 4 + protein * 4 + lipid * 9;

            acc.energy += nl;
            console.log(acc.energy,index,nl)
            return acc;
        },
        { pdv: 0, ptv: 0, ldv: 0, ltv: 0, gluxit: 0, energy: 0 }
    );

    console.log(dataRation)
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
                        <tbody>
                            {dataRation.length > 0 &&
                                dataRation.map((item, index) => {
                                    let type = handleTypeFood(item);
                                    let protein = (item.food.protein * item.value / 100).toFixed(2);
                                    let lipid = (item.food.lipid * item.value / 100).toFixed(2);
                                    let nl: number = item.food.carbohydrate * 4 + parseFloat(protein) * 4 + parseFloat(lipid) * 9;

                                    return (
                                        (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-4 sm:px-6 text-center">{index + 1}</td>
                                                <td className="py-3 px-4 sm:px-6">{item.food.name}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{item.value.toFixed(2)}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">g</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{type && protein}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{!type && protein}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{type && lipid}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{!type && lipid}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{item.food.carbohydrate}</td>
                                                <td className="py-3 px-4 sm:px-6 text-center">{nl}</td>
                                            </tr>

                                        )
                                    )
                                })

                            }
                        </tbody>
                        <tfoot>
                            <tr className="border-b border-gray-200 hover:bg-gray-50 font-bold">
                                <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 1}</td>
                                <td className="py-3 px-4 sm:px-6">Cộng</td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalPL.pdv}</td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalPL.ptv}</td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalPL.ldv}</td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalPL.ltv}</td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalPL.gluxit}</td>
                                <td className="py-3 px-4 sm:px-6 text-center">{totalPL.energy.toFixed(2)}</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50 font-bold">
                                <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 2}</td>
                                <td className="py-3 px-4 sm:px-6">Nhu cầu</td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50 font-bold">
                                <td className="py-3 px-4 sm:px-6 text-center">{dataRation.length + 3}</td>
                                <td className="py-3 px-4 sm:px-6">Sai số</td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                                <td className="py-3 px-4 sm:px-6 text-center"></td>
                            </tr>
                        </tfoot>

                    </table>
                </div>


            </section>
        </div>
    );
}