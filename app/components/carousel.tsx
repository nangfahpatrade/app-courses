"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: string;
  image: string;
  title: string;
}

const SliderComponent = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchCourses = useCallback(async () => {
    const requestData = {
      search: "",
      page: 1,
      full: false,
      filter_price: 1,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/courses`,
        requestData
      );
      if (res.status === 200) {
        setSlides(res?.data?.data || []); // อัพเดต state
        setIsDataLoaded(true); // ตั้งค่าว่าโหลดข้อมูลเสร็จแล้ว
      } else {
        console.error("Error fetching products");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      console.error(error.response?.data?.message || "Error fetching data");
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Update swiper on resize
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

  // ฟังก์ชันทำซ้ำสไลด์ถ้าจำนวนน้อยเกินไป
  // const getSlides = (slides: Slide[]) => {
  //   if (slides.length < 4) {
  //     const duplicateSlides = [...slides, ...slides, ...slides]; // ทำซ้ำ 3 รอบ
  //     return duplicateSlides.slice(0, 4); // เลือกแค่ 4 ชิ้น
  //   }
  //   return slides;
  // };

  // หากข้อมูลยังไม่โหลดเสร็จ จะไม่แสดง Swiper
  if (!isDataLoaded) {
    return <p className="text-center text-white">Loading slides...</p>;
  }

  return (
    <div className="w-full  h-auto relative">
      <Swiper
        key={slides.length} // ใช้ key เพื่อบังคับให้ Swiper รีเรนเดอร์เมื่อข้อมูลเปลี่ยน
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={20}
        // slidesPerView={Math.min(slides.length, 4)}
        // slidesPerGroup={Math.min(slides.length, 4)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        // loop={slides.length >= 4}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        // breakpoints={{
        //   340: { slidesPerView: 1 },
        //   640: { slidesPerView: 2 },
        //   768: { slidesPerView: 3 },
        //   1024: { slidesPerView: 4 },
        // }}
        breakpoints={{
          640: {
            // สำหรับหน้าจอที่กว้างกว่า 640px (sm)
            slidesPerView: 1,
          },
          768: {
            // สำหรับหน้าจอที่กว้างกว่า 768px (md)
            slidesPerView: 2,
          },
          1024: {
            // สำหรับหน้าจอที่กว้างกว่า 1024px (lg)
            slidesPerView: 4,
          },
        }}
        modules={[Navigation, Autoplay]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Link href={`/th/home/course/${slide.id}`}>
              <div className="relative w-full h-48">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${slide.image}`}
                  loading="lazy"
                  className="  w-full rounded-md"
                  alt={slide.title}
                />
              </div>

              <p className="text-white text-sm  py-2 rounded-b-md px-2 text-center bg-black bg-opacity-40">
                {slide.title}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <Image
          width={500}
          height={500}
          src="/icon-arrow-left.svg"
          alt="Previous"
          className=" h-3 md:h-4 w-3 md:w-4"
        />
      </div>
      <div className="swiper-button-next-custom absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <Image
          width={500}
          height={500}
          src="/icon-arrow-right.svg"
          alt="Next"
          className="h-3 md:h-4 w-3 md:w-4"
        />
      </div>
    </div>
  );
};

export default SliderComponent;
