import axios from "axios";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import NewsSidebar from "./newssidebar";
import SubCoursePath from "./subcoursepath";

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async (id: String) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/courses/${id}`
    );
    
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const SubCourse: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log('xxxxx');
  
  console.log({data});
  
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      {/* ส่วนข้อมูลหลัก */} 
      <div className="lg:col-span-2">
        <div className="w-full">
          {data?.products_youtube && (
            <iframe
              className="w-full h-60 md:h-96 rounded-lg"
              src={data?.products_youtube}
              title="YouTube video player"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="flex flex-col gap-10 mt-4">
          <div className="bg-white shadow rounded-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.product_image}`}
              alt={data?.product_title || ""}
              width={1000}
              height={1000}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>

        {/* รายละเอียด */}

        <div className="my-4 bg-white shadow-md rounded-md py-6 px-8">
          <h1 className="text-xl lg:text-2xl font-bold">
            {data?.product_title}
          </h1>

          <div className="text-gray-700">
            {parse(`<div>${data?.product_dec?.toString() || ""}</div>`)}
          </div>

          <div className="flex w-full flex-wrap gap-3 mt-4">
            <p
              className={`text-lg md:text-xl ${
                data?.products_price_sale > 0
                  ? "text-red-500 font-semibold"
                  : "text-red-500 font-semibold"
              } mb-2 pr-1`}
            >
              ราคา{" "}
              {data?.products_price_sale > 0
                ? data?.products_price_sale?.toLocaleString()
                : data?.products_price?.toLocaleString()}{" "}
              บาท
            </p>
            {data?.products_price_sale > 0 && (
              <p className="line-through mb-2 pr-1 text-gray-700">
                ลดจาก {data?.products_price.toLocaleString()} บาท
              </p>
            )}
          </div>
        </div>

        {/* แสดงรายละเอียดบทเรียนโดยใช้ details และ summary */}
        <div className="mt-4 mb-0 lg:mb-10">
          <h1>รายละเอียดบทเรียน</h1>
          <div className="mt-5 bg-white rounded-md shadow-md">
            {data?.result_list?.map((lesson: any, index: number) => (
              <div
                key={index}
                className="flex border-b last:border-none py-3 px-5 justify-between items-center hover:bg-gray-100 transition duration-200"
              >
                <h2 className="font-medium text-gray-800 text-base">
                  {lesson.title}
                </h2>
                <h2 className="text-gray-500 font-medium text-sm">
                  {lesson.video_count} บทเรียน
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ส่วนข้อมูลเพิ่มเติม */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <SubCoursePath data={data} />
        {/* ย้าย NewsSidebar ไปด้านขวา */}
        <NewsSidebar
          id={params.id}
          name="products"
          title="คอร์สเรียนที่เกี่ยวข้อง"
        />
      </div>
    </div>
  );
};

export default SubCourse;
