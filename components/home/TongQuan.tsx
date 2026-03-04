"use client"
import Image from 'next/image'
import React from 'react'
import './TongQuan.css'
import FeedbackCard from './FeedbackCard'
export default function TongQuan() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            SỔ TAY ĐIỆN TỬ TRA CỨU THÀNH PHẦN CƠ CẤU, ĐỊNH LƯỢNG CỦA KHẨU PHẦN ĂN
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Công cụ hỗ trợ tra cứu thành phần thực phẩm, xây dựng định lượng
            và kiểm tra năng lượng khẩu phần ăn nhanh chóng, chính xác.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow">
              Trải nghiệm hệ thống
            </button>
            <button className="px-6 py-3 bg-gray-200 rounded-2xl">
              Xem hướng dẫn
            </button>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Thực trạng hiện nay
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-2">Tra cứu thủ công</h3>
              <p className="text-gray-600">
                Bảng thành phần thực phẩm phân tán, tra cứu mất thời gian,
                dễ nhầm lẫn.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-2">Tính toán phức tạp</h3>
              <p className="text-gray-600">
                Xây dựng định lượng và năng lượng khẩu phần chủ yếu dựa
                vào kinh nghiệm.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-2">Khó kiểm tra</h3>
              <p className="text-gray-600">
                Tổng hợp chi ăn và kiểm tra năng lượng dễ sai sót,
                thiếu công cụ hỗ trợ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Giải pháp từ sổ tay điện tử
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li>✔ Tra cứu nhanh bảng thành phần thực phẩm Việt Nam</li>
              <li>✔ Tự động tính năng lượng khẩu phần ăn</li>
<li>✔ Hỗ trợ xây dựng định lượng theo nhu cầu kcal</li>
              <li>✔ Phục vụ kiểm tra, tổng hợp chi ăn bếp</li>
            </ul>
            <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
              <span className="text-gray-500">Hình ảnh minh họa hệ thống</span>
            </div>
          </div>
        </div>
      </section>

      {/* USERS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-10">Đối tượng sử dụng</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow">Cán bộ hậu cần</div>
            <div className="bg-white p-5 rounded-2xl shadow">Giảng viên</div>
            <div className="bg-white p-5 rounded-2xl shadow">Học viên</div>
            <div className="bg-white p-5 rounded-2xl shadow">Đơn vị bếp ăn</div>
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Định hướng phát triển</h2>
          <p className="text-gray-600">
            Hệ thống có thể triển khai tại Học viện, cài đặt cho các đơn vị
            hoặc mở rộng trên Internet. Dễ dàng bổ sung chức năng mới,
            phù hợp xu thế chuyển đổi số trong công tác hậu cần.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sẵn sàng áp dụng sổ tay điện tử vào thực tế?
          </h2>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow text-lg">
            Liên hệ triển khai
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
