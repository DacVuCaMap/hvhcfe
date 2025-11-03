'use client';

import { ChevronDown, Home, Info, LogIn, Utensils, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SubNavItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  items?: SubNavItem[];
}

const navItems: NavItem[] = [
  { name: 'Tra cứu thành phần thực phẩm', path: '/', icon: <Home size={16} /> },
  { name: 'Tra cứu cơ cấu năng lượng', path: '/cocaunangluong', icon: <Zap size={16} /> },
  { name: 'Xây dựng định lượng khẩu phần ăn', path: '/xaydungdinhduong', icon: <Utensils size={16} /> },
  { name: 'Giới thiệu', path: '/gioithieu', icon: <Info size={16} /> },
  { name: 'Đăng nhập', path: '/signin', icon: <LogIn size={16} /> },
];

export default function ElegantHeader() {
  const pathname = usePathname();
  const firstSegment = `/${pathname.split('/')[1]}`;
  const secondSegment = `${pathname.split('/')[2]}`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-800 via-green-700 to-green-900 shadow-lg pb-4">
      <div className="mx-auto md:px-16 px-8">
        {/* Top Section */}
        <div className="flex items-center justify-between py-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
              <Image src="/images/logo-main.png" alt="Logo" width={60} height={60} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-yellow-300">
                Khoa Quân Nhu - Học Viện Hậu Cần
              </h1>
              <p className="text-xs text-white">Department of Quartermaster Service</p>
            </div>
          </div>
          {/* Slogan */}
          <div className="hidden md:block text-center text-white font-semibold text-sm max-w-md">
            TRANG WEB ĐIỆN TỬ TRA CỨU THÀNH PHẦN CƠ CẤU, ĐỊNH LƯỢNG CỦA KHẨU PHẦN ĂN
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2">
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-white">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`relative group px-4 py-2 rounded-md transition-all duration-300 ${
                  firstSegment === item.path ? 'bg-green-950' : 'hover:bg-green-800'
                }`}
              >
                <Link
                  href={item.path}
                  className={`flex items-center gap-2 font-medium ${
                    firstSegment === item.path ? 'text-yellow-300' : 'hover:text-yellow-300'
                  }`}
                >
                  {item.icon}
                  {item.name}
                  {item.items && (
                    <ChevronDown className="transition-transform group-hover:rotate-180" size={16} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.items && (
                  <ul className="absolute left-0 mt-2 w-48 bg-green-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                    {item.items.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`block px-4 py-2 text-sm text-white hover:bg-green-700 hover:text-yellow-300 ${
                            secondSegment === subItem.path.split('/')[2]
                              ? 'text-yellow-300 font-semibold'
                              : ''
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
      {/* Spacer */}
    </header>
  );
}