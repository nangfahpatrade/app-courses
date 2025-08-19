"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const SliderPortFolio = ({ data }: { data: string[] }) => {
  const swiperRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ฟังก์ชันเปิด Modal พร้อมกับแสดงรูปภาพที่เลือก
  const handleImageClick = (image: string) => {
    setSelectedImage(`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${image}`);
    setIsModalOpen(true);
  };

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="flex flex-wrap">
        {data.map((item:any, index:any)=> (
          <div className=" lg:w-1/4 p-1" key={index}>
            <div onClick={()=>handleImageClick(item)} className=" cursor-pointer">
            <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${item}`}
                alt=""
                width={500}
                height={500}
                className=" rounded-md"
              />
              </div>
            </div>
        ))}

      </div>



      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              className="absolute top-2 right-2 bg-blue-500 text-2xl font-bold text-white rounded-full w-10 h-10 shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300 focus:outline-none"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2>{selectedImage}</h2>
            <Image
              src={selectedImage}
              alt="Selected"
              width={700}
              height={700}
              style={{ objectFit: "contain" }}
              className="rounded-lg w-full h-auto max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderPortFolio;
