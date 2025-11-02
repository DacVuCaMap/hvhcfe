'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import { ChevronDown, Eye, Search, Space } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import './HomeHeader.css'
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
// const headNav: NavItem[] = [
//     { name: 'Trang chủ', path: '/' },
//     {
//         name: 'Dinh dưỡng', path: '/dinhduong',
//         items: [
//             { name: 'Bảng thành phần dinh dưỡng', path: '/dinhduong/thanhphandinhduong' },
//             { name: 'Tính toán năng lượng', path: '/dinhduong/tinhtoannangluong' },
//         ]
//     },
//     { name: 'Quản lí', path: '/admin' },
//     { name: 'Liên hệ', path: '/lien-he' },
//     { name: 'Giới thiệu', path: '/gioithieu' },
//     { name: 'Đăng nhập', path: '/login' },
// ];
const headNav: NavItem[] = [
    { name: 'Tra cứu bảng thành phần hóa học của thực phẩm', path: '/' },
    { name: 'Tra cứu cơ cấu năng lượng của khẩu phần ăn', path: '/cocaunangluong' },
    { name: 'Xây dựng khẩu phần ăn theo nhu cầu năng lượng', path: '/xaydungdinhduong' },
    { name: 'Giới thiệu', path: '/gioithieu' },
];
// Props cho component
interface NavigationProps {
    pathname: string;
}
export default function HomeHeader() {
    const pathname = usePathname(); // Lấy path hiện tại từ URL
    const firstSegment = `/${pathname.split('/')[1]}`;
    const secondSegment = `${pathname.split('/')[2]}`;
    return (
        <div>
            <div className="absolute top-0 left-0 flex flex-col items-center justify-between w-full bg-custom px-20 pb-20">
                {/* Top header */}
                <div className="flex flex-row w-full items-center justify-between h-32 px-4 py-2">
                    {/* Logo + Tên */}
                    <div className="flex items-center space-x-4 py-1 h-full">
                        <div className='rounded-full overflow-hidden'>
                            <Image
                                src="/images/logo-main.png"
                                alt="Logo"
                                width={90}
                                height={18}
                            />
                        </div>
                        <div className="flex flex-col justify-center h-full px-2 py-2">
                            <span className="text-xl font-semibold text-yellow-300">
                                Khoa Quân Nhu - Học Viện Hậu Cần
                            </span>
                            <span className='text-xs text-white'>
                                Logistics and Quartermaster Department
                            </span>
                        </div>
                    </div>
                    <div className='w-[500px] text-center text-white'>
                        TRANG WEB ĐIỆN TỬ TRA CỨU THÀNH PHẦN CƠ CẤU, ĐỊNH LƯỢNG CỦA KHẨU PHẦN ĂN
                    </div>
                </div>
                {/* Navigation bar */}
                <div className="text-white ">
                    <nav className="flex justify-center">
                        <ul className={`flex space-x-20 px-4 `}>
                            {headNav.map((item) => (
                                <li key={item.name} className={`relative group w-64 text-center py-4 px-2 ${firstSegment === item.path ? 'bg-green-900' : ''} hover:bg-green-900 rounded-md transition-colors duration-300 `}>
                                    <Link
                                        href={item.path}
                                        className={`flex items-center justify-center font-medium transition-all duration-300 ${firstSegment === item.path
                                                ? 'text-yellow-300'
                                                : 'text-white hover:text-yellow-300'
                                            }`}
                                    >
                                        {item.name}
                                        {item.items && (
                                            <span className="ml-1 transform transition-transform duration-300 group-hover:rotate-180">
                                                <ChevronDown />
                                            </span>
                                        )}
                                    </Link>

                                    {/* Dropdown cho các item có sub-items */}
                                    {item.items && (
                                        <ul className="absolute left-1/2 -translate-x-1/2 mt-2 bg-gradient-to-br from-green-700 to-green-900 shadow-xl rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50 whitespace-nowrap">
                                            {item.items.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <Link
                                                        href={subItem.path}
                                                        className={`block min-w-[160px] px-4 py-2 text-white hover:bg-green-700 hover:text-yellow-300 transition-colors duration-200 ${secondSegment === subItem.path.split('/')[2] ? 'text-yellow-300 font-semibold' : ''
                                                            }`}
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
            <div className='h-28 w-full'></div>
        </div>
    );
}