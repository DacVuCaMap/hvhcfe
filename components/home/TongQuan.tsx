"use client"
import Image from 'next/image'
import React from 'react'

export default function TongQuan() {
    return (
        <div className='flex flex-col px-10 py-10'>
            <div className=' flex flex-row space-x-10'>
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
                        src="/images/hvhc/tongquan1.png"
                        alt="Logo"
                        width={500}
                        height={18}
                    />
                </div>
            </div>
        </div>
    )
}
