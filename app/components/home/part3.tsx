import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Part3 = () => {
  const t = useTranslations("HomePage.section_2");

  return (
    <div className="bg-[#070e20] py-16 flex flex-col items-center">
      <h2 className="text-white text-3xl  md:text-[60px] font-[400] text-center mb-10">
        {t("title")}
      </h2>

      <div className="flex flex-col lg:flex-row  gap-10   xl:gap-0 w-full xl:w-9/12 container mx-auto px-10 md:px-0">
        {/* ข้อความด้านซ้าย */}
        <div className="flex flex-col  text-white space-y-16 2xl:space-y-28 2xl:pt-10  lg:w-5/12">
          <div className="text-center xl:w-[400px]">
            <h3 className="text-2xl md:text-[28px] font-[700]"> {t("result_1.title")}</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-400">
            {t("result_1.dec")}
            </p>
          </div>
          <div className="text-center  2xl:ps-[180px]">
            <h3 className="text-2xl md:text-[28px] font-[700] ">{t("result_2.title")}</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-400">
            {t("result_2.dec")}
            </p>
          </div>
          <div className="text-center lg:w-[400px] ">
            <h3 className="text-2xl md:text-[28px] font-[700]">{t("result_3.title")}</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-400">
            {t("result_3.dec")}
            </p>
          </div>
        </div>

        {/* รูปภาพโทรศัพท์ */}
        <div className="relative flex lg:w-4/12 items-center text-center  justify-center">
          <Image
            src="/iphone.png" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
            alt="Phone with Trading Screen"
            width={500}
            height={500}
            loading="lazy"
            className="w-[300px] lg:w-[400px] mx-auto  object-cover"
          />
        </div>

        {/* ข้อความด้านขวา */}
        <div className="flex flex-col item-start lg:items-start    text-white space-y-16  2xl:space-y-28 2xl:mt-[100px] text-left lg:w-5/12">
        <div className="text-center xl:w-[400px]  ">
            <h3 className="text-2xl md:text-[28px] font-[700] ">{t("result_4.title")}</h3>
            <p className="text-lg md:text-[20px]  font-[400] 2xl:ps-[70px] mt-4 text-gray-400 ">
            {t("result_4.dec")}
            </p>
          </div>
          <div className="text-center  ">
            <h3 className="text-2xl md:text-[28px] font-[700]">{t("result_5.title")}</h3>
            <p className="text-lg md:text-[20px]  font-[400] xl:w-[300px] mt-4 text-gray-400">
            {t("result_5.dec")}
            </p>
          </div>
          <div className="text-center  ">
            <h3 className="text-2xl md:text-[28px] font-[700]">{t("result_6.title")}</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-400">
            {t("result_6.dec")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
