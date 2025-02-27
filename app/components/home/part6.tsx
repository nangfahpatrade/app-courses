import React from "react";

const Part6 = () => {
  return (
    <div
      className="py-14 px-6 text-center "
      style={{
        background:
          "linear-gradient(92.31deg, #050F20 12.18%, #0C1F43 104.06%, #0B224E 149.78%)",
      }}
    >
      <h2 className="text-white text-2xl md:text-[32px] sm:text-4xl font-[700] mb-4">
        ถ้าไม่เริ่ม ก็เหมือนเดิมทั้งชีวิต...
      </h2>
      <p className="text-white text-[16px] font-[400] mb-8">
        <span className="text-yellow-700">สนใจลงทะเบียน </span>คอร์สเทรดทั้งด้านความรู้ และการควบคุมจิตใจ
      </p>
      <button className="bg-white text-[#1f58a1] text-[16px] font-[700] px-8 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-gray-200">
        ลงทะเบียน
      </button>
    </div>
  );
};

export default Part6;
