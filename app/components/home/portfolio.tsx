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

const PortfolioPage = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState(0);
  const locale = useLocale()

  const fetchData = async () => {
    const requestData = {
      page: page,
      search: "",
      full: false,
      type: type,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/reviews`,
        requestData
      );

      console.log(res.data)
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
  }, [page, type]);

  // ฟังก์ชันสำหรับตัดข้อความ
  const truncate = (text: string, maxLength: number = 100): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
  <div className="bg-gray-100">
      <div className="p-6 md:p-12 flex flex-col lg:px-28">
      <div className="w-full ">
        {/* ปุ่ม Select แบบ Toggle */}
        <div className="flex space-x-4 mt-4 md:mt-0 justify-center">
          <button
            onClick={() => setType(0)}
            className={`flex-1 px-4 py-2 rounded-full text-center ${
              type === 0
                ? "bg-indigo-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            style={{ maxWidth: "150px" }} // จำกัดความกว้างของปุ่ม
          >
            สัมมนา 
          </button>
          <button
            onClick={() => setType(1)}
            className={`flex-1 px-4 py-2 rounded-full text-center ${
              type === 1
                ? "bg-indigo-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            style={{ maxWidth: "150px" }} // จำกัดความกว้างของปุ่ม
          >
            รีวิว
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-5 md:mt-10">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              กิจกรรม <span className="text-indigo-800 font-bold">ทั้งหมด</span>
            </h1>
            <p className="text-gray-600">
              ผลลัพท์การค้นหา{" "}
              <span className="font-semibold">
                {data?.data?.length || 0} กิจกรรม
              </span>
            </p>
          </div>

          <div className="mt-4 md:mt-0  w-36" >
            <select
              className="p-2 border px-5 w-full border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  หน้าที่ {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10 mt-10">
          {data?.data.map((portfolio: Activity, index: number) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col lg:flex-row"
            >
              <Link
                href={`/${locale}/home/portfolio/${portfolio?.id}`}
                className="lg:w-2/5"
              >
                
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${portfolio?.image_title}`}
                  alt={portfolio?.image_title}
                  width={500}
                  height={300}
                  className="object-cover h-40 w-full lg:rounded-l-2xl"
                />
              </Link>
              <div className="p-4 flex flex-col gap-3 lg:w-3/5">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-0 rounded-full self-start">
                  {portfolio.category_name || "หมวดหมู่"}
                </span>
                <h2 className="text-md md:text-lg font-semibold text-gray-800">
                  {portfolio?.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {truncate(portfolio?.dec)}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/home/portfolio/${portfolio?.id}`}
                    className="text-indigo-800 hover:text-purple-600 text-sm flex items-center gap-1"
                  >
                    ดูรายละเอียด{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.25 5.25l6 6m0 0l-6 6m6-6H4.75"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default PortfolioPage;
