
import React from "react";

const Template: React.FC = () => {
  return (
    <div className="  w-full lg:w-2/4 bg-gradient-to-b from-indigo-400 to-purple-300 rounded-3xl shadow-lg hidden  lg:flex flex-col justify-end items-center py-10 ">
      <h1 className="text-3xl text-center text-white">คอร์สเรียนออนไลน์</h1>
      <h1 className="text-2xl text-white">แบบฉบับมืออาชีพ</h1>
      <small className="text-gray-200 mt-3">อัพเดทเนื้อหาใหม่ 2024</small>
      <img src="/login1.webp" alt="login banner" />
    </div>
  );
};

export default Template;
