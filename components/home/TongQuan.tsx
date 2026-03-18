"use client"
import React from 'react'
import {
  Search,
  Calculator,
  ShieldCheck,
  Users,
  TrendingUp,
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  ChefHat,
  GraduationCap,
  Target,
  FileSearch
} from 'lucide-react'
import Link from 'next/link';

export default function TongQuan() {
  return (
    <div className="bg-[#f1f5f1] text-[#1B3022] font-sans">
      {/* HERO SECTION - Tông xanh lục quân đậm */}
      <section className="relative overflow-hidden bg-[#1B3022] py-24 lg:py-16 border-b-4 border-[#D4AF37]">
        {/* Họa tiết Camo chìm (Optional) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="text-[#D4AF37] w-12 h-12" />
          </div>
          <span className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase border-l-2 border-r-2 border-[#D4AF37]">
            Hệ thống số hóa
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
            SỔ TAY ĐIỆN TỬ <br />
            <span className="text-[#D4AF37]">TRA CỨU CƠ CẤU THÀNH PHẦN, ĐỊNH LƯỢNG, NĂNG LƯỢNG CỦA KHẨU PHẦN ĂN</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-medium">
            Phần mềm chuyên dụng hỗ trợ cán bộ tra cứu thành phần thực phẩm, kiểm tra năng lượng khẩu phần ăn và xây dựng định lượng 
            của khẩu phần ăn hợp lí phù hợp với năng lượng tiêu hao của bộ đội.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link href={"/tracuuthanhphanthucpham"}>
              <button className="flex items-center justify-center px-8 py-4 bg-[#D4AF37] hover:bg-[#b8962d] text-[#1B3022] font-black rounded-lg transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] group uppercase tracking-wider">
                Bắt đầu tra cứu <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-lg border-2 border-white/30 transition-all backdrop-blur-sm">
              <BookOpen className="mr-2 w-5 h-5" /> Hướng dẫn sử dụng
            </button>
          </div>
        </div>
      </section>

      {/* THỰC TRẠNG - Sử dụng Card với viền xanh Olive */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#1B3022] mb-4 uppercase tracking-tight">Thực trạng công tác hậu cần</h2>
            <div className="w-24 h-1 bg-[#4B5320] rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tra cứu thủ công",
                desc: "Các bảng định lượng giấy cồng kềnh, khó cập nhật và tốn thời gian khi tra cứu thực phẩm mới.",
                icon: <FileSearch className="w-8 h-8 text-[#4B5320]" />
              },
              {
                title: "Tính toán phức tạp",
                desc: "Việc cân đối tỷ lệ P-L-G (Protein - Lipid - Glucid) mất nhiều công sức, dễ xảy ra sai lệch số liệu.",
                icon: <Target className="w-8 h-8 text-[#4B5320]" />
              },
              {
                title: "Khó khăn tổng hợp",
                desc: "Công tác tính toán năng lượng của khẩu phần ăn thiếu cơ sở khoa học, chưa chính xác.",
                icon: <Calculator className="w-8 h-8 text-[#4B5320]" />
              }
            ].map((item, index) => (
              <div key={index} className="group bg-white p-8 rounded-none border-l-4 border-[#4B5320] shadow-md hover:shadow-2xl hover:bg-[#f9faf9] transition-all duration-300">
                <div className="mb-6 p-3 bg-[#f1f5f1] rounded-lg w-fit text-[#4B5320]">
                  {item.icon}
                </div>
                <h3 className="font-black text-xl mb-4 text-[#1B3022] uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIẢI PHÁP - Nền xanh bộ đội nhạt hơn */}
      <section className="bg-[#1B3022] py-24 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight">
                Ưu điểm của <span className="text-[#D4AF37]">Hệ thống điện tử</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Số hóa 100% dữ liệu bảng thành phần thực phẩm",
                  "Tính toán thực đơn chuẩn xác đến từng Gram",
                  "Hỗ trợ cán bộ cần, xây dựng thực đơn hợp lí",
                  "Xuất báo cáo trực quan phục vụ công tác kiểm tra"
                ].map((text, i) => (
                  <div key={i} className="flex items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="mr-4 bg-[#D4AF37] p-1 rounded text-[#1B3022]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium text-gray-200">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hình ảnh minh họa giả lập Dashboard quân đội */}
            <div className="bg-[#0c1a12] border-2 border-[#4B5320] rounded-xl p-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-4 border-b border-[#4B5320] pb-2 text-[#4B5320] text-xs font-bold uppercase tracking-widest">
                <span>Hệ thống chỉ huy hậu cần v1.0</span>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>LIVE</span>
                </div>
              </div>
              <div className="aspect-video bg-[#1B3022] rounded flex items-center justify-center border border-[#4B5320]">
                <LayoutDashboard size={64} className="text-[#4B5320] opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ĐỐI TƯỢNG - Sử dụng Badge vuông vắn */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-[#1B3022] mb-16 uppercase tracking-widest">Đối tượng triển khai</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Cán bộ hậu cần", icon: <ShieldCheck /> },
              { name: "Giảng viên Học viện", icon: <GraduationCap /> },
              { name: "Học viên đào tạo", icon: <Users /> },
              { name: "Bếp ăn đơn vị", icon: <ChefHat /> }
            ].map((user, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className="mb-6 w-20 h-20 bg-[#f1f5f1] border-2 border-[#4B5320] flex items-center justify-center text-[#4B5320] group-hover:bg-[#4B5320] group-hover:text-white transition-all transform group-hover:rotate-6">
                  {React.cloneElement(user.icon as React.ReactElement)}
                </div>
                <span className="font-black uppercase text-sm tracking-tighter text-[#1B3022] group-hover:text-[#D4AF37] transition-colors">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Chốt hạ cực mạnh */}
      <section className="py-24 bg-[#1B3022] border-t-8 border-[#4B5320]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10 uppercase leading-[1.1]">
            Nâng cao năng lực <br /> <span className="text-[#D4AF37]">bảo đảm hậu cần</span> số
          </h2>
          <button className="group relative px-12 py-6 bg-[#D4AF37] text-[#1B3022] font-black rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
            <span className="relative z-10 text-xl tracking-[0.2em] uppercase">Liên hệ triển khai</span>
            <div className="absolute top-0 -left-[100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500"></div>
          </button>
        </div>
      </section>
    </div>
  );
}
