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
const headNav: NavItem[] = [
    { name: 'Trang chủ', path: '/' },
    {
        name: 'Dinh dưỡng', path: '/dinhduong',
        items: [
            { name: 'Bảng thành phần dinh dưỡng', path: '/dinhduong/thanhphandinhduong' },
            { name: 'Tính toán năng lượng', path: '/services/support' },
        ]
    },
    { name: 'Quản lí sản phẩm', path: '/admin' },
    { name: 'Liên hệ', path: '/lien-he' }
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
        <div className="fixed top-0 left-0 flex flex-row items-center justify-between w-screen bg-custom px-20 pb-10">
            {/* Top header */}
            <div className="flex flex-row items-center justify-between h-32 px-4 py-2">
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
                            Khoa Quân Nhu Học Viện Hậu Cần
                        </span>
                        <span className='text-xs text-white'>
                            Logistics and Quartermaster Department
                        </span>
                    </div>
                </div>
            </div>
            {/* Navigation bar */}
            <div className=" text-white">
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
                                    <ul className="absolute left-0 mt-2 bg-green-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible whitespace-nowrap">
                                        {item.items.map((subItem) => (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.path}
                                                    className={`block px-4 py-2 hover:bg-green-900 transition-colors hover:text-yellow-300  ${secondSegment === subItem.path.split('/')[2] ? 'text-yellow-300' : ''}`}
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