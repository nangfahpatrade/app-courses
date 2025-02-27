import axios from "axios";
import Image from "next/image";
import React from "react";
import CarouselPortFolio from "@/app/components/carouselportfolio";
import NewsSidebar from "./newssidebar";

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/reviews/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const SubPortFolioPage: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-6 lg:px-12 py-10">
      {/* คอลัมน์ซ้าย: เนื้อหาและรูปภาพ */}
      <div className="flex-1 lg:pr-8">
        <h1 className="text-2xl font-bold mb-5 text-center lg:text-left">
          {data?.title}
        </h1>

        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.image_title}`}
          alt=""
          className="w-full"
        />
        {/* <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.image_title}`}
          alt={data?.title}
          width={500}
          height={500}
        /> */}
        <div className="px-5">
          <p className="text-gray-700 leading-relaxed mt-5">{data?.dec}</p>
        </div>

        {/* CarouselPortFolio ด้านล่าง */}
        <div className="mt-6">
          <CarouselPortFolio data={data?.result_list || []} />
        </div>
      </div>

      {/* คอลัมน์ขวา: NewsSidebar */}
      <div className="flex-shrink-0 w-full lg:w-1/3">
        <NewsSidebar id={params.id} name="reviews" title="แนะนำ กิจกรรม" />
      </div>
    </div>
  );
};

export default SubPortFolioPage;
