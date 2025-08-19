"use client";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

const SliderComponent = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full xl:w-[1030px] h-auto relative mt-10">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        // loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true, // ทำให้จุด Pagination สามารถคลิกได้
          // dynamicBullets: true, // ทำให้จุดแสดงขนาดต่าง ๆ ตามการเลื่อน
        }}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          340: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >

        {/* กล่อง 1: สมัครสมาชิก */}
        <SwiperSlide className="mb-14">
          <div
            className="bg-[#252525] w-[250px] h-[250px] p-6  rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              height={500}
              width={500}
              src="/icon-create-account.svg"
              alt="สมัครสมาชิก"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">สมัครสมาชิก</h2>
            <p className="text-[17px] font-[400] text-white text-center">
              สมัครสมาชิกเพื่อลงทะเบียนคอร์สเรียน
            </p>
          </div>
        </SwiperSlide>

        {/* กล่อง 2: เลือกคอร์สเรียน */}
        <SwiperSlide>
          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              height={500}
              width={500}
              src="/icon-select.svg"
              alt="เลือกคอร์สเรียน"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">
              เลือกคอร์สเรียน
            </h2>
            <p className="text-[17px] font-[400] text-white text-center">
              ชำระเงินผ่านระบบอัตโนมัติ
            </p>
          </div>
        </SwiperSlide>

        {/* กล่อง 3: ชำระเงิน */}
        <SwiperSlide>
          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              height={500}
              width={500}
              src="/icon-payment.svg"
              alt="ชำระเงิน"
              className="w-12 h-12 mb-4 -mt-9"
            />
            <h2 className="text-[22px] font-[700] text-white">ชำระเงิน</h2>
            <p className="text-[17px] font-[400] text-white text-center">
              ชำระเงินผ่านระบบอัตโนมัติ
            </p>
          </div>
        </SwiperSlide>

        {/* กล่อง 4: รับชมคอร์สเรียน */}
        <SwiperSlide>
          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              height={500}
              width={500}
              src="/icon-play.svg"
              alt="รับชมคอร์สเรียน"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">
              รับชมคอร์สเรียน
            </h2>
            <p className="text-[17px] font-[400] text-white text-center">
              คอร์สเรียนมีอายุ 1 ปี นับตั้งแต่วันที่สมัคร
            </p>
          </div>
        </SwiperSlide>

        {/* กล่อง 5: ทำแบบทดสอบ */}
        <SwiperSlide>
          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              height={500}
              width={500}
              src="/icon-test.svg"
              alt="ทำแบบทดสอบ"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">ทำแบบทดสอบ</h2>
            <p className="text-[17px] font-[400] text-white text-center">
              ทำแบบทดสอบหลังเรียน คุณครูตรวจให้คะแนน
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* ปุ่ม Navigation */}
      {/* <div className="swiper-button-prev-custom absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <img src="/icon-arrow-left.svg" alt="Previous" className="h-6 w-6" />
      </div>
      <div className="swiper-button-next-custom absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <img src="/icon-arrow-right.svg" alt="Next" className="h-6 w-6" />
      </div> */}

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5);
        }

        .swiper-pagination-bullet-active {
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default SliderComponent;
