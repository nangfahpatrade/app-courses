import React from "react";
import Carousel2 from "../carousel2";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Part2 = () => {
  const t = useTranslations("HomePage.section_1");
  const results = t.raw("results");

  return (
    <div
      style={{
        background: "#19191A",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-auto py-16 md:py-20"
    >
      <div className="flex flex-col mx-auto container px-10  lg:px-18  h-full">
        <div className="flex flex-col lg:flex-row w-full gap-10">
          <div className="flex flex-col w-full items-start lg:w-7/12">
            <p className="text-2xl md:text-[45px] text-[#F9F0CD] font-[400] ">
              {t("left.title_1")}
            </p>
            <p className="mt-2 md:mt-8 text-4xl md:text-[60px] font-[700] text-[#F9F0CD] text-nowrap">
              {t("left.title_2")}
            </p>
            <p className="text-base md:text-[18px] font-[400] text-gray-500 xl:pr-24 mt-6 md:mt-10">
              {t("left.dec")}
            </p>
          </div>
          <div className="flex w-full lg:w-5/12 items-center">
            <div className="relative w-full h-[400px]">
              <img
                src="/banner-step.jpg"
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 text-white">
                <p className="text-[22px] font-[400]">{t("right.title_1")}</p>
                <h1 className="text-[26px] sm:text-[35px] font-[700] text-nowrap">
                  {t("right.title_2")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* กล่องข้อความด้านล่างแบบ Fixed Size พร้อมระยะห่าง */}


        <div className=" hidden 2xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5 gap-4 mt-10 justify-center">
          {Array.isArray(results) &&
            results.map((item: any) => (
              <div
                className="bg-[#252525] w-[230px] h-[230px]  p-4  rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
                key={item.id}
              >
                <Image
                  src={item.icon}
                  alt="เลือกคอร์สเรียน"
                  loading="lazy"
                  width={100}
                  height={100}
                  className="w-12 h-12 mb-4"
                />
                <h2 className="text-xl font-[700] text-white">{item.title}</h2>
                <p className="text-[17px] font-[400] text-gray-500 mt-2 text-center">
                  {item.dec}
                </p>
              </div>
            ))}
        </div>

        <div className="flex justify-center 2xl:hidden ">
          <Carousel2 />
        </div>
      </div>
    </div>
  );
};

export default Part2;
