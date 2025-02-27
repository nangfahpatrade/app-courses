"use client";
import axios from "axios";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Activity {
  id: number;
  image_title: string;
  title: string;
  dec: string;
  category_name: string;
  price: number;
  price_sale: number;
}

const ActivityPage = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const locale = useLocale()

  const fetchData = async () => {
    const requestData = {
      page: page,
      search: "",
      full: false,
      home: false,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/news`,
        requestData
      );
      if (res.status === 200) {
        setData(res.data);
        setTotalPages(res.data.totalPages || 1);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Handle page change from select
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);
    setPage(selectedPage);
  };

  // ฟังก์ชันสำหรับตัดข้อความ
  const truncate = (text: string, maxLength: number = 50): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
   <div className="bg-gray-100">
     <div className="p-6 md:p-12 flex flex-col lg:px-28">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between mt-5 md:mt-10">
          <div className="text-center md:text-left w-full md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              กิจกรรม <span className="text-indigo-800 font-bold">ทั้งหมด</span>
            </h1>
            <p className="text-gray-600 text-base">
              ผลลัพท์การค้นหา{" "}
              <span className="">
                {data?.data?.length || 0} กิจกรรม 
              </span>
            </p>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-auto justify-center  flex xl:justify-end md:justify-start">
            {/* Select element for page navigation */}
            <select
              className="p-2 border w-36 md:w-40 lg:w-32 xl:w-28 2xl:w-24 cursor-pointer border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
              value={page}
              onChange={handlePageChange}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  หน้าที่ {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mt-10 gap-8">
          {data?.data.map((activity: Activity, index: number) => (
            <div
              key={index}
              className="bg-white pb-3 shadow-md rounded-md flex flex-col justify-between"
            >
              <Link href={`/${locale}/home/activity/${activity?.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${activity?.image_title}`}
                  alt={activity?.image_title}
                  width={500}
                  height={500}
                  className="rounded-t-2xl mb-4 object-cover h-48 w-full"
                />
                <div className="flex flex-col px-2 md:px-5  gap-2">
                  <h2 className="text-md  ">
                    {activity?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{truncate(activity?.dec)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default ActivityPage;
