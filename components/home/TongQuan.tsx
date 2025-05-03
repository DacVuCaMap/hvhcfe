"use client"
import Image from 'next/image'
import React from 'react'

export default function TongQuan() {
    return (
        <div className='flex flex-col py-10'>
            <div className="w-full h-[550px] mb-10">
                <Image
                    src="/images/hvhc/anh1.png"
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className='px-6'>
                <h1 className='font-bold text-3xl text-gray-600'>TỔNG QUAN</h1>
            </div>
            <div className=' flex flex-row space-x-10 px-10 py-10 text-gray-600'>
                <div className='p-5 flex flex-col items-center justify-center space-y-6'>
                    <div className='p-2 bg-white'>
                        <Image
                            src="/images/logo-main.png"
                            alt="Logo"
                            width={200}
                            height={18}
                        />
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='font-bold text-lg'>Khoa Quân Nhu - Học Viện Hậu Cần</span>
                        <span className='text-sm'>Logistics and Quartermaster Department</span>
                    </div>
                </div>
                <div className='flex-1 h-full text-lg'>
                    <span>
                        Là một trong những Khoa được thành lập sớm nhất của Học viện Hậu cần,
                        Khoa Quân nhu với 68 năm xây dựng chiến đấu và trưởng thành,
                        trong thời kì kháng chiến chống Mỹ, chiến tranh bảo vệ biến giới
                        phía Bắc và biên giới Tây Nam: Đây chính là một trong những cái nôi
                        đào tạo ra lớp lớp thế hệ cán bộ, giảng viên, học viên ngành Quân nhu
                        nói riêng và ngành hậu cần quân đội nói chung phục vụ kháng chiến
                        . Sau khi đất nước thống nhất, cùng với sự phát triển của Học viện,
                        Khoa Quân nhu được điều chỉnh tổ chức biên chế với nhiệm vụ chủ chốt
                        là huấn luyện và nghiên cứu khoa học.
                    </span>
                </div>
                <div>
                    <Image
                        src="/images/hvhc/tongquan3.png"
                        alt="Logo"
                        width={500}
                        height={18}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-10 px-24 py-10 bg-green-900">
                <div className="">
                    <Image
                        src="/images/hvhc/tongquan5.png"
                        alt="Hình ảnh 1"
                        width={600}
                        height={10}
                        className="shadow-lg rounded-lg"
                    />
                </div>
                <div className="flex-1 text-justify text-gray-400 space-y-4 text-lg leading-relaxed">
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">Sứ mệnh giáo dục trong tình hình mới</h2>
                    <p>
                        Để đáp ứng yêu cầu nhiệm vụ giáo dục đào tạo trong tình hình mới, các thế hệ cán bộ, giảng viên, nhân viên Khoa Quân Nhu luôn phát huy tinh thần
                        <strong className="text-gray-300"> trách nhiệm, đoàn kết, chủ động, sáng tạo </strong>
                        – hoàn thành tốt, hoàn thành xuất sắc mọi nhiệm vụ được giao, góp phần quan trọng vào sự nghiệp đào tạo của
                        <strong className="text-yellow-400"> Học viện Hậu cần Anh hùng</strong>.
                    </p>
                </div>

            </div>

            {/* Block 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-10 px-24 pb-10 bg-green-900">

                <div className="flex-1 text-justify text-gray-400 space-y-4 text-lg leading-relaxed">
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">Đổi mới gắn với thực tiễn</h2>
                    <p>
                        Khoa Quân Nhu đã tích cực bổ sung, rà soát, điều chỉnh các chương trình đào tạo theo chỉ thị của Học viện, đáp ứng yêu cầu thực tiễn công tác hậu cần các đơn vị.
                        Quan điểm xuyên suốt là <em>"dạy những gì đơn vị cần", đặt trong sự phát triển của cuộc cách mạng công nghiệp 4.0</em>.
                    </p>
                </div>
                <div className="">
                    <Image
                        src="/images/hvhc/tongquan2.png"
                        alt="Hình ảnh 1"
                        width={600}
                        height={10}
                        className="shadow-lg rounded-lg"
                    />
                </div>
            </div>
            {/* Block 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-10 py-10 px-24 pb-10">

                <div className="flex-1 text-justify space-y-4 text-lg leading-relaxed">
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Đội ngũ giảng viên chất lượng cao</h2>
                    <p>
                        Đội ngũ giảng viên của Khoa phát triển mạnh mẽ: <strong>100% có trình độ đại học trở lên, gần 80% có trình độ sau đại học</strong>,
                        trong đó có <strong>5 PGS, 14 Tiến sĩ, 1 Nhà giáo ưu tú</strong> và nhiều giảng viên giỏi các cấp. Nhiều học viên cũ nay là lãnh đạo trong ngành Hậu cần toàn quân.
                    </p>
                </div>
                <div className="">
                    <Image
                        src="/images/hvhc/tongquan1.png"
                        alt="Hình ảnh 3"
                        width={600}
                        height={500}
                        className="rounded-xl shadow-xl"
                    />
                </div>
            </div>

        </div>
    )
}
