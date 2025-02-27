import axios from 'axios';
import React from 'react'
import Part4_LargeNewsItem from './Part4_LargeNewsItem';
import Part4_NewsItem from './Part4_NewsItem';
import { truncateText } from "@/app/libs/TruncateText";


export const fetchNews = async () => {
  const requestData = {
    page: 1,
    search: "",
    full: false,
    home: true,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news`,
      requestData
    );
    return res.data;
  } catch (err) {
    const error = err as { response: { data: { message: string } } };
    console.error(error.response?.data?.message);
    return []; // Return เป็น array เปล่า เพื่อป้องกัน Error ในการ Map ข้อมูล
  }
};

interface News {
  id: number;
  image_title: string;
  title: string;
  dec: string;
}
const Part4_data = async () => {
     const data = await fetchNews();
  return (
   <div className="flex flex-col w-full lg:flex-row gap-8 ">
          <Part4_LargeNewsItem
            image={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${
              data?.data?.[0]?.image_title || ""
            }`}
            title={data?.data?.[0]?.title || "ไม่มีหัวข้อข่าว"}
            description={truncateText(
              data?.data?.[0]?.dec?.replace(/<\/?[^>]+(>|$)/g, ""),
              200
            )}
            id={data?.data?.[0]?.id || "0"}
          />

          <div className="flex flex-col lg:w-7/12 gap-7 lg:mt-[33px] xl:mt-[80px] 2xl:mt-[40px]">
            {data?.data?.slice(1).map((news: News, index: number) => (
              <Part4_NewsItem
                key={index}
                id={news.id}
                image={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${news?.image_title}`}
                title={news?.title}
                description={truncateText(
                  news?.dec?.replace(/<\/?[^>]+(>|$)/g, ""),
                  100
                )}
              />
            ))}
          </div>
        </div> 

  )
}

export default Part4_data