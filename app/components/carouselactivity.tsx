"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const SliderActivity = ({ data }: { data: string[] }) => {
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
    <div className="w-full xl:w-[1030px] h-auto relative ">
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          340: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
      >
        {data.map((image, index) => (
          <SwiperSlide key={index} className="mb-14">
            <div
              className="relative w-full h-48 cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Image
                style={{ objectFit: "cover" }}
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${image}`}
                alt={`Slide ${index + 1}`}
                layout="fill"
                className="w-full h-full rounded-md shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
            <Image
              src={selectedImage}
              alt="Selected"
              width={1500}
              height={1500}
              style={{ objectFit: "contain" }}
              className="rounded-lg w-full h-auto max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderActivity;
