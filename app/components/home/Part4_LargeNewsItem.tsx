"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsItemProps {
  image: string; // ประเภท string สำหรับ URL ของรูปภาพ
  title: string; // ประเภท string สำหรับหัวข้อข่าว
  description: string; // ประเภท string สำหรับคำบรรยายข่าว
  id: any;
}

const Part4_LargeNewsItem: React.FC<NewsItemProps> = ({
  image,
  title,
  description,
  id,
}) => {
  return (
    <div
      className="mt-10 rounded-xl lg:w-5/12 xl:overflow-hidden"
      style={{ background: "#CDCDCD" }}
    >
      <Link href={`/home/activity/${id}`}>
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="lg:-mt-[50px] w-full h-auto 2xl:h-[300px] object-cover"
          style={{ borderRadius: "12px 12px 0px 0px" }}
        />
        <div className="p-4 px-7">
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
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Part4_LargeNewsItem;
