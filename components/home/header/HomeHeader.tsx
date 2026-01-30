'use client';

import { Beef, ChevronDown, Home, Info, LogIn, Menu, Utensils, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

interface SubNavItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  items?: SubNavItem[];
  show: boolean;
}

const navItems: NavItem[] = [
  { name: 'Trang chủ', path: '/', icon: <Info size={16} />, show: true },
  { name: 'Tra cứu thành phần thực phẩm', path: '/tracuuthanhphanthucpham', icon: <Home size={16} />, show: true },
  { name: 'Tra cứu năng lượng thực phẩm', path: '/cocaunangluong', icon: <Zap size={16} />, show: true },
  { name: 'Xây dựng định lượng khẩu phần ăn', path: '/xaydungdinhduong', icon: <Utensils size={16} />, show: true },
  { name: 'Tra cứu năng lượng khẩu phần ăn', path: '/tracuunangluongkhauphan', icon: <Beef size={16} />, show: true },
  { name: 'Đăng nhập', path: '/signin', icon: <LogIn size={16} />, show: false },
];

export default function ElegantHeader() {
  const pathname = usePathname();
  const firstSegment = `/${pathname.split('/')[1]}`;
  const secondSegment = pathname.split('/')[2] || '';
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Static Header */}
      <header className="bg-gradient-to-r z-30 from-green-800 via-green-700 to-green-900 shadow-lg lg:block lg:top-auto top-0 sticky">
        <div className="mx-auto md:px-16 px-8 relative">
          {/* Top Section */}
          <div className="flex items-center justify-between py-4 ">
            {/* Logo + Title */}
            <Link href="/" className="">
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
            </Link>
            {/* Slogan */}
            <div className="hidden md:flex md:flex-row text-center text-white font-semibold text-sm space-x-4">
              <p className='max-w-md'>
                TRANG WEB ĐIỆN TỬ TRA CỨU THÀNH PHẦN CƠ CẤU, ĐỊNH LƯỢNG CỦA KHẨU PHẦN ĂN
              </p>
              <div className="hidden md:block bg-amber-300 hover:bg-green-950 transition-colors hover:text-amber-300 rounded-xl text-green-800 ">
                <Link
                  href="/signin"
                  className="font-bold px-4 py-2 rounded-lg flex flex-row items-center space-x-1"
                >
                  <LogIn size={16} /> <div>Đăng nhập</div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-yellow-300 transition-colors duration-300"
            >
              <Menu size={24} />
            </button>

          </div>

        </div>
      </header>

      {/* Sticky Navigation */}
      <nav className={`sticky lg:top-0 top-[92px] z-50 bg-gradient-to-r from-green-800 via-green-700 to-green-900 shadow-lg pb-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="mx-auto md:px-16 px-8">
          <ul className="flex lg:flex-row flex-col md:flex md:flex-wrap md:justify-center gap-2 md:gap-6 text-white md:items-center pt-2">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`relative group w-full md:w-auto px-4 py-2 rounded-md transition-all duration-300 ${firstSegment === item.path ? 'bg-green-950' : 'hover:bg-green-800'
                  } ${item.show ? 'block' : 'md:hidden'}`}
              >
                <Link
                  href={item.path}
                  className={`flex items-center justify-between md:justify-start gap-2 font-medium w-full ${firstSegment === item.path ? 'text-yellow-300' : 'hover:text-yellow-300'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="md:inline block lg:text-base text-xs">{item.name}</span>
                  </div>
                  {item.items && (
                    <ChevronDown className="transition-transform group-hover:rotate-180 md:ml-auto" size={16} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.items && (
                  <ul className="md:absolute md:left-0 md:mt-2 md:w-48 md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:invisible md:group-hover:visible md:transition-all md:duration-300 bg-green-800 md:bg-green-900">
                    {item.items.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`block px-4 py-2 text-sm text-white hover:bg-green-700 hover:text-yellow-300 w-full ${secondSegment === (subItem.path.split('/')[2] || '')
                            ? 'text-yellow-300 font-semibold'
                            : ''
                            }`}
                          onClick={() => setIsOpen(false)}
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
        </div>
      </nav>
    </>
  );
}