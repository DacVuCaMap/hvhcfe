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
            Tổng cục Hậu cần - Hệ thống số hóa
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
            SỔ TAY ĐIỆN TỬ <br/>
            <span className="text-[#D4AF37]">TRA CỨU CƠ CẤU KHẨU PHẦN</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-medium">
            Phần mềm chuyên dụng hỗ trợ cán bộ tra cứu định mức, xây dựng thực đơn 
            và kiểm soát năng lượng khẩu phần ăn quân đội theo tiêu chuẩn của Bộ Quốc Phòng.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="flex items-center justify-center px-8 py-4 bg-[#D4AF37] hover:bg-[#b8962d] text-[#1B3022] font-black rounded-lg transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] group uppercase tracking-wider">
              Bắt đầu tra cứu <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
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
                desc: "Công tác báo cáo quyết toán chi ăn tại các bếp ăn đơn vị thiếu tính đồng bộ và tức thời.",
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
                  "Tự động cảnh báo khi vượt định mức năng lượng",
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
            Nâng cao năng lực <br/> <span className="text-[#D4AF37]">bảo đảm hậu cần</span> số
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

// export default function TongQuan() {
//     return (
//         <div className='flex flex-col'>
//             <div className="w-full h-[550px]">
//                 <Image
//                     src="/images/hvhc/anh1.png"
//                     alt="Logo"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="w-full h-full object-cover"
//                 />
//             </div>
//             <div className="font-sans bg-gray-50 min-h-screen"> {/* Using Tailwind's default sans-serif font */}

//                 {/* Section 1: Introduction (Updated) */}
//                 <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden">
//                     <h1 className='text-center font-bold text-4xl md:text-5xl text-green-800 mb-16 animate-fade-in-down'>
//                         TỔNG QUAN
//                     </h1>
//                     <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
//                         {/* Logo and Department Info - Adjusted width and centering */}
//                         <div className='w-full lg:w-1/3 flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transform transition duration-500 hover:scale-105 animate-fade-in-left'>
//                             <div className='p-4 bg-gradient-to-br rounded-full shadow-lg overflow-hidden'>
//                                 <Image
//                                     // Use actual logo path
//                                     src="/images/logo-main.png"
//                                     alt="Logo Học Viện Hậu Cần"
//                                     width={180} // Slightly smaller logo
//                                     height={90}
//                                     className="rounded-lg"
//                                 />
//                             </div>
//                             <div className='text-center'>
//                                 <span className='block font-bold text-xl text-gray-800'>Khoa Quân Nhu - Học Viện Hậu Cần</span>
//                                 <span className='block text-base text-gray-500 mt-1'>Logistics and Quartermaster Department</span>
//                             </div>
//                         </div>

//                         {/* Introductory Text & Image Container */}
//                         <div className='w-full lg:w-2/3 flex flex-col md:flex-row items-start gap-8 p-4'>
//                             {/* Introductory Text - Adjusted width */}
//                             <div className='flex-1 text-gray-700 leading-relaxed space-y-4 animate-fade-in-right delay-100'>
//                                 <p>
//                                     Là một trong những Khoa được thành lập sớm nhất của Học viện Hậu cần,
//                                     Khoa Quân nhu với 70 năm xây dựng chiến đấu và trưởng thành,
//                                     trong thời kì kháng chiến chống Mỹ, chiến tranh bảo vệ biến giới
//                                     phía Bắc và biên giới Tây Nam: Đây chính là một trong những cái nôi
//                                     đào tạo ra lớp lớp thế hệ cán bộ, giảng viên, học viên ngành Quân nhu
//                                     nói riêng và ngành hậu cần quân đội nói chung phục vụ kháng chiến.
//                                 </p>
//                                 <p>
//                                     Sau khi đất nước thống nhất, cùng với sự phát triển của Học viện,
//                                     Khoa Quân nhu được điều chỉnh tổ chức biên chế với nhiệm vụ chủ chốt
//                                     là huấn luyện và nghiên cứu khoa học.
//                                 </p>
//                             </div>

//                             {/* Content Image - Adjusted size and animation */}
//                             <div className="w-full md:w-1/2 mt-6 md:mt-0 self-center transform transition duration-500 hover:scale-105 animate-fade-in-right delay-200">
//                                 <Image
//                                     // Use actual image path
//                                     src="/images/hvhc/tongquan3.png"
//                                     alt="Hình ảnh tổng quan 1"
//                                     width={600} // Adjusted size
//                                     height={600}
//                                     className="rounded-xl shadow-xl object-cover w-full" // Ensure image covers area
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Section 2: Mission */}
//                 <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16 md:py-20 overflow-hidden">
//                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 md:gap-16">
//                         <div className="w-full lg:w-1/2 transform transition duration-500 hover:scale-105 animate-slide-in-left">
//                             <Image
//                                 // Replace with actual image path or placeholder
//                                 src="/images/hvhc/tongquan5.png"
//                                 alt="Hình ảnh Sứ mệnh"
//                                 width={600}
//                                 height={400} // Adjusted height
//                                 className="shadow-2xl rounded-xl object-cover" // Added object-cover
//                             />
//                         </div>
//                         <div className="flex-1 text-center lg:text-left space-y-5 animate-slide-in-right">
//                             <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">Sứ mệnh giáo dục trong tình hình mới</h2>
//                             <p className="text-lg leading-relaxed text-gray-200">
//                                 Để đáp ứng yêu cầu nhiệm vụ giáo dục đào tạo trong tình hình mới, các thế hệ cán bộ, giảng viên, nhân viên Khoa Quân Nhu luôn phát huy tinh thần
//                                 <strong className="text-white font-semibold"> trách nhiệm, đoàn kết, chủ động, sáng tạo </strong>
//                                 – hoàn thành tốt, hoàn thành xuất sắc mọi nhiệm vụ được giao, góp phần quan trọng vào sự nghiệp đào tạo của
//                                 <strong className="text-yellow-400 font-semibold"> Học viện Hậu cần Anh hùng</strong>.
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Section 3: Innovation */}
//                 <section className="bg-white py-16 md:py-20 overflow-hidden">
//                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-16">
//                         <div className="w-full flex justify-end lg:w-1/2 transform transition duration-500 hover:scale-105 animate-slide-in-right">
//                             <Image
//                                 // Replace with actual image path or placeholder
//                                 src="/images/hvhc/tongquan2.png"
//                                 alt="Hình ảnh Đổi mới"
//                                 width={600}
//                                 height={400} // Adjusted height
//                                 className="shadow-xl rounded-xl object-cover" // Added object-cover
//                             />
//                         </div>
//                         <div className="flex-1 text-center lg:text-left space-y-5 animate-slide-in-left">
//                             <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Đổi mới gắn với thực tiễn</h2>
//                             <p className="text-lg text-gray-600 leading-relaxed">
//                                 Khoa Quân Nhu đã tích cực bổ sung, rà soát, điều chỉnh các chương trình đào tạo theo chỉ thị của Học viện, đáp ứng yêu cầu thực tiễn công tác hậu cần các đơn vị.
//                                 Quan điểm xuyên suốt là <em className="font-semibold text-green-800">"dạy những gì đơn vị cần", đặt trong sự phát triển của cuộc cách mạng công nghiệp 4.0</em>.
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Section 4: Faculty */}
//                 <section className="bg-gray-100 py-16 md:py-20 overflow-hidden">
//                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 md:gap-16">
//                         <div className="w-full lg:w-1/2 transform transition duration-500 hover:scale-105 animate-slide-in-left">
//                             <Image
//                                 // Replace with actual image path or placeholder
//                                 src="/images/hvhc/tongquan1.png"
//                                 alt="Hình ảnh Đội ngũ giảng viên"
//                                 width={600}
//                                 height={450} // Adjusted height
//                                 className="rounded-xl shadow-xl object-cover" // Added object-cover
//                             />
//                         </div>
//                         <div className="flex-1 text-center lg:text-left space-y-5 animate-slide-in-right">
//                             <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Đội ngũ giảng viên chất lượng cao</h2>
//                             <p className="text-lg text-gray-700 leading-relaxed">
//                                 Đội ngũ giảng viên của Khoa phát triển mạnh mẽ: <strong className="text-green-900">100% có trình độ đại học trở lên, gần 80% có trình độ sau đại học</strong>,
//                                 trong đó có <strong className="text-green-900">5 PGS, 14 Tiến sĩ, 1 Nhà giáo ưu tú</strong> và nhiều giảng viên giỏi các cấp. Nhiều học viên cũ nay là lãnh đạo trong ngành Hậu cần toàn quân.
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Section 5: Videos */}
//                 <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
//                     <h1 className='text-center font-bold text-4xl md:text-5xl text-green-800 mb-12 animate-fade-in-up'>
//                         Video giới thiệu
//                     </h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
//                         {/* Video 1 */}
//                         <div className="rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] bg-green-700 animate-fade-in-up delay-100">
//                             <div className="aspect-video bg-black"> {/* Added aspect ratio container */}
//                                 <iframe
//                                     className="w-full h-full"
//                                     src="https://www.youtube.com/embed/aYU_InzSDss"
//                                     title="CHUYÊN NGÀNH QUÂN NHU và trải nghiệm của học viên CHUYÊN NGÀNH CHỈ HUY THAM MƯU HẬU CẦN"
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                                     referrerPolicy="strict-origin-when-cross-origin"
//                                     allowFullScreen
//                                 ></iframe>
//                             </div>
//                             <div className="p-4 text-center text-base font-semibold text-white">
//                                 CHUYÊN NGÀNH QUÂN NHU và trải nghiệm của học viên CHỈ HUY THAM MƯU HẬU CẦN
//                             </div>
//                         </div>

//                         {/* Video 2 */}
//                         <div className="rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] bg-green-700 animate-fade-in-up delay-200">
//                             <div className="aspect-video bg-black"> {/* Added aspect ratio container */}
//                                 <iframe
//                                     className="w-full h-full"
//                                     src="https://www.youtube.com/embed/FaTEI1X0NN0"
//                                     title="HỌC VIỆN HẬU CẦN MÁI TRƯỜNG CỦA TẦM CAO TRÍ TUỆ"
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                                     referrerPolicy="strict-origin-when-cross-origin"
//                                     allowFullScreen
//                                 ></iframe>
//                             </div>
//                             <div className="p-4 text-center text-base font-semibold text-white">
//                                 HỌC VIỆN HẬU CẦN - MÁI TRƯỜNG CỦA TẦM CAO TRÍ TUỆ
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 {/* Section 6: feedback */}
//                 <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
//                     <FeedbackCard />
//                 </section>
//             </div>
//         </div>
//     )
// }
