"use client";
import axios from "axios";
import Image from "next/image";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { truncateText } from "@/app/libs/TruncateText";
import { useLocale } from "next-intl";

// กำหนดโครงสร้างของข้อมูลข่าว
interface NewsItem {
  id: string;
  title: string;
  dec: any;
  image: string;
  image_title: string;
}

// กำหนดประเภทของ props ที่คอมโพเนนต์จะรับ
interface NewsSidebarProps {
  id: string;
  name: string;
  title: string;
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({ id, name, title }) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const locale = useLocale()

  // ฟังก์ชันดึงข้อมูลข่าวจาก API
  const fetchNews = async () => {
    const requestData = {
      name,
      id,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/top_4`,
        requestData
      );
      setNewsData(res.data || []);
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id, name]);

  const getImageSource = (newsItem: NewsItem) => {
    if (name === "products") {
      return newsItem?.image;
    } else if (name === "reviews") {
      return newsItem?.image_title;
    } else if (name === "activity") {
      return newsItem?.image_title;
    }
    return newsItem.image; // ค่าเริ่มต้น
  };

  const getLink = (name: string) => {
    switch (name) {
      case "products":
        return "course";
      case "reviews":
        return "portfolio";
      case "activity":
        return "activity";
      default:
        return "courses";
    }
  };

  return (
    <div className="w-full  p-4 rounded-md shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4 text-indigo-700">{title}   </h2>
      <hr />
   
      <ul className=" mt-2">
        {newsData.map((newsItem, index) => (
          <Link href={`/${locale}/home/${getLink(name)}/${newsItem.id}`} key={index}>
            <li className="flex flex-col lg:flex-row gap-2 py-6 md:py-8 lg:py-4 border-b border-gray-200 hover:bg-gray-100">
              <section className=" w-full lg:w-1/3">
                <div className="relative w-full h-44 lg:h-20">
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_IMAGE_API
                    }/images/${getImageSource(newsItem)}`}
                    layout="fill"
                    objectFit="cover"
                    alt={newsItem.title}
                    loading="lazy"
                    className="w-full h-full rounded-md"
                  />
                </div>
              </section>

              <section className="w-full lg:w-2/3">
                <p className="text-sm text-black font-medium">
                  {newsItem?.title}
                </p>
                <div className="text-xs text-gray-700 mt-2  ">
                  {parse(
                    truncateText(
                      newsItem?.dec?.replace(/<\/?[^>]+(>|$)/g, ""),
                      70
                    )
                  )}
                </div>
              </section>
            </li>

            {/* 
            <li className="flex space-x-4 items-center justify-center border-b hover:bg-gray-100  py-2 px-4 ">
              <div className=" h-20 relative flex items-center ">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_IMAGE_API
                  }/images/${getImageSource(newsItem)}`}
                  alt={newsItem?.title}
                  width={500}
                  height={500}
                  className="rounded-sm object-cover "
                />
              </div>

              <div className="flex-1 ">
                <p className="text-sm text-black font-medium">
                  {newsItem?.title}
                </p>
                <div className="text-sm text-gray-700 ">
                  {parse(
                    truncateText(
                      newsItem?.dec?.replace(/<\/?[^>]+(>|$)/g, ""),
                      80
                    )
                  )}
                </div>
              </div>
            </li> */}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NewsSidebar;
