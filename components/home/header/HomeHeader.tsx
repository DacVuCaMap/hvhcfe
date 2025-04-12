'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import { ChevronDown, Eye, Search, Space } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
type HeadNavItem = {
    name: string;
    path: string;
    items?: MenuProps['items'];
};
interface NavItem {
    name: string;
    path: string;
    items?: SubNavItem[];
}

interface SubNavItem {
    name: string;
    path: string;
}

// Dữ liệu mẫu
const headNav: NavItem[] = [
    { name: 'Trang chủ', path: '/' },
    {
        name: 'Hướng nghiệp', path: '/huongnghiep',
        items: [
            { name: 'Bảng thành phần dinh dưỡng', path: '/huongnghiep/thanhphandinhduong' },
            { name: 'Tính toán năng lượng', path: '/services/support' },
        ]
    },
    { name: 'Giới thiệu sản phẩm', path: '/gioi-thieu-san-pham' },
    { name: 'Liên hệ', path: '/lien-he' },
    { name: 'Tổng quan', path: '/tongquan' },
];

// Props cho component
interface NavigationProps {
    pathname: string;
}
export default function HomeHeader() {
    const pathname = usePathname(); // Lấy path hiện tại từ URL
    const firstSegment = `/${pathname.split('/')[1]}`;
    const secondSegment = `${pathname.split('/')[2]}`;
    console.log(secondSegment)
    return (
        <div className="flex flex-col w-full">
            {/* Top header */}
            <div className="flex flex-row items-center justify-between h-20 w-full px-4 py-2">
                {/* Logo + Tên */}
                <div className="flex items-center space-x-4 py-1 h-full">
                    <Image
                        src="/images/logo-main.png"
                        alt="Logo"
                        width={70}
                        height={18}
                    />
                    <div className="flex flex-col justify-center h-full bg-green-700 px-2 py-2">
                        <span className="text-xl font-semibold text-yellow-300">
                            Khoa quân nhu học viện hậu cần
                        </span>
                        <span className='text-sm text-white'>
                            Logistics and Quartermaster Department
                        </span>
                    </div>
                </div>

                {/* Tìm kiếm + Nút */}
                <div className="flex items-center space-x-4">
                    {/* Input tìm kiếm với icon và nút search */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="px-3 py-2 w-64 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        {/* Nút Search */}
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition focus:outline-none">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Nút Đăng nhập */}
                    <Link href={"/signin"} className="px-4 py-2 text-sm font-bold border border-gray-400 text-black rounded-xl transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
                        ĐĂNG NHẬP
                    </Link>

                    {/* Nút Đơn vị liên quan */}
                    <button className="px-4 py-2 text-sm font-bold bg-gray-400 text-black rounded-md transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
                        Đơn vị liên quan
                    </button>
                </div>
            </div>

            {/* Navigation bar */}
            <div className="bg-green-500 text-white w-full">
                <nav className="flex justify-center">
                    <ul className="flex space-x-20 px-4">
                        {headNav.map((item) => (
                            <li key={item.name} className="relative group  py-4 px-2">
                                <Link
                                    href={item.path}
                                    className={`flex flex-row font-medium transition-colors ${firstSegment === item.path
                                        ? 'text-yellow-300 border-b-2 border-yellow-300'
                                        : 'hover:text-yellow-300'
                                        }`}
                                >
                                    {item.name}
                                    {item.items && <span><ChevronDown /></span>}
                                </Link>

                                {/* Dropdown cho các item có sub-items */}
                                {item.items && (
                                    <ul className="absolute left-0 mt-2 bg-green-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible whitespace-nowrap">
                                        {item.items.map((subItem) => (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.path}
                                                    className={`block px-4 py-2 hover:bg-green-700 transition-colors hover:text-yellow-300  ${secondSegment === subItem.path.split('/')[2] ? 'text-yellow-300' : ''}`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

        </div>
    );
}