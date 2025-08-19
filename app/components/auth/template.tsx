
import Image from "next/image";
import React from "react";

const Template: React.FC = () => {
  return (
    <div className="  w-full  lg:w-2/4 bg-gradient-to-b from-indigo-800 to-blue-900 rounded-l-3xl shadow-lg hidden  lg:flex flex-col justify-end items-center py-10 px-4 ">
      <h1 className="text-3xl text-center text-white">คอร์สเรียนออนไลน์</h1>
      <h1 className="text-2xl text-white">แบบฉบับมืออาชีพ</h1>
      <small className="text-gray-200 mt-3 text-center">Nang Fah Pa Trade - นางฟ้าพาเทรด Forex</small>
      <Image width={500} height={500} src="/login1.webp" alt="login banner" />
    </div>
  );
};

export default Template;
