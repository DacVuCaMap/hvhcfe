"use client"
import React from "react";
import {
    Facebook,
    Youtube,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";

export default function FooterHome() {
    return (
        <footer className="bg-gray-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Bản đồ chỉ dẫn */}
                <div>
                    <h3 className="text-lg font-bold mb-2">BẢN ĐỒ CHỈ DẪN</h3>
                    <p className="mb-2">Học Viện Hậu Cần</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.954004893053!2d105.8755948!3d21.065730399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aa2782e60b13%3A0x4e324b42b8f99b73!2sInstitute%20of%20Logistics!5e1!3m2!1sen!2s!4v1744463115022!5m2!1sen!2s"
                        width="250"
                        height="200"
                        allowFullScreen
                        loading="lazy"
                        className="border"
                    ></iframe>
                </div>

                {/* Bộ giáo dục và Mạng xã hội */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Học viện Hậu Cần</h3>
                    <h4 className="mt-4 mb-2 font-semibold">MẠNG XÃ HỘI</h4>
                    <div className="flex space-x-4">
                        <a href="#"><Facebook className="w-5 h-5" /></a>
                        <a href="#"><Youtube className="w-5 h-5" /></a>
                        <a href="#"><Twitter className="w-5 h-5" /></a>
                        <a href="#"><Instagram className="w-5 h-5" /></a>
                        <a href="#"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Đơn vị trực thuộc */}
                <div>
                    <h3 className="text-lg font-bold mb-4">ĐƠN VỊ TRỰC THUỘC</h3>
                    <ul className="space-y-2">
                        <li>Bộ môn Bảo đảm</li>
                        <li>Bộ môn Kỹ thuật</li>
                        <li>Bộ môn Sản xuất</li>
                        <li>Bộ môn Thương phẩm</li>
                    </ul>
                </div>

                {/* Sơ đồ website */}
                <div>
                    <h3 className="text-lg font-bold mb-4">SƠ ĐỒ WEBSITE</h3>
                    <p>XEM SƠ ĐỒ TRANG ...</p>
                </div>
            </div>

            {/* Footer dưới */}
            <div className="bg-green-700 text-white text-sm text-center px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <span className="font-bold text-4xl">MLA</span>
                        <div className="mb-2 md:mb-0 font-semibold">
                            © Khoa Quân Nhu - Học Viện Hậu Cần
                        </div>
                    </div>
                    <div>
                        Địa chỉ: Phường Ngọc Thụy, Long Biên, Hà Nội | Điện thoại: 024 3869 4242
                    </div>
                </div>
            </div>
        </footer>
    );
}
