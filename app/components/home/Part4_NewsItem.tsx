'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface NewsItemProps {
    image: string; // ประเภท string สำหรับ URL ของรูปภาพ
    title: string; // ประเภท string สำหรับหัวข้อข่าว
    description: string; // ประเภท string สำหรับคำบรรยายข่าว
    id: any;
  }

const Part4_NewsItem:React.FC<NewsItemProps> = ({
    image,
    title,
    description,
    id,
}) => {
  return (
    <div className="w-full  rounded-xl">
    <div className="flex flex-col md:flex-row gap-0 md:gap-8 bg-[#cdcdcd] w-full h-full rounded-lg ">
      <section className="w-full md:w-1/2">
        <div className="relative w-full h-48 ">
          <Link href={`/home/activity/${id}`}>
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={title}
              loading="lazy"
              className="w-full h-full rounded-md"
            />
          </Link>
        </div>
      </section>

      <section className="w-full md:w-2/3 py-5 px-7">
        <Link href={`/home/activity/${id}`}>
          <h3 className="text-[16px] sm:text-[18px] font-[700] text-[#093165] mb-4">
            {title}
          </h3>
          <p className="text-[14px] font-[400] text-[#181818] mb-4">
            {description}
          </p>
          <div className="flex gap-3 items-center">
            <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
              อ่านเพิ่มเติม
            </button>
            {/* <span className="text-[14px] font-[400] text-[#181818]">
              12 พ.ค. 2024
            </span> */}
          </div>
        </Link>
      </section>
    </div>
  </div>
  )
}

export default Part4_NewsItem