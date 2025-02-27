import axios from "axios";
import Image from "next/image";
import React from "react";
import CarouselActivity from "@/app/components/carouselactivity";
import NewsSidebar from "@/app/components/home/newssidebar";

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const ActivityPage: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log(data);

  return (
    <div className="container mx-auto flex flex-col mb-5 gap-6 px-6 lg:px-0 mt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* คอลัมน์ด้านซ้าย (เนื้อหาหลัก) */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-5 text-center lg:text-start">
            {data.title}
          </h1>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.image_title}`}
            alt={data?.title}
            width={2500}
            height={2500}
            objectFit="cover"
            layout="responsive"
            className="w-full h-auto rounded-xl object-cover"
          />
          <div className="px-5">
            <p className="text-gray-700 leading-relaxed mt-5">{data?.dec}</p>
          </div>
        </div>

        {/* คอลัมน์ด้านขวา (NewsSidebar) */}
        <div className="w-full lg:w-3/12 2xl:mt-12">
          <NewsSidebar id={params.id} name="activity" title="กิจกรรม" />
        </div>
      </div>

      {/* คอมโพเนนต์ CarouselActivity */}
      <div className="p-5">
        <CarouselActivity data={data?.result_list || []} />
      </div>
    </div>
  );
};

export default ActivityPage;
