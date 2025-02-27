"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import Carousel from "../carousel";

import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import { useRecoilState } from "recoil";
import { BuyCourseStore } from "@/store/store";

const courseCategories = [
  "ทั้งหมด",
  "การตลาดออนไลน์",
  "ธุรกิจ",
  "การเงิน & ลงทุน",
  "การพัฒนาตนเอง",
  "การพัฒนาซอฟต์แวร์",
  "การออกแบบ",
  "ถ่ายภาพ & วีดิโอ",
];

interface Course {
  id: number; 
  title: string;
  dec: string;
  image: string;
  price: number;
  price_sale: number;
}

const recommendedCourses: Course[] = [
  {
    id:1,
    title:
      "Course 1 asfksdmkf dskjfjsdj;fjksd jkdsjfdllkljf  jkjsdjfjsldf kjsdkjfkljs",
    dec: "Description for course 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat tempora suscipit ipsum, doloribus maiores in recusandae amet? Harum laboriosam facere, explicabo vero odit odio earum nulla consequatur similique magnam, eaque commodi id animi voluptatibus at. Exercitationem eligendi illo odit, recusandae esse, labore a incidunt hic nisi sit qui doloribus!",
    image: "/pic4.jpg",
    price: 5900,
    price_sale: 0,
  },
  {
    id:2,
    title: "Course 2",
    dec: "Description for course 2  sit amet consectetur adipisicing elit. Cupiditate placeat tempora suscipit ipsum, doloribus maiores in recusandae amet? Harum laboriosam facere, explicabo vero odit odio earum nulla consequatur similique magnam, eaque commodi id animi voluptatibus at. Exercitationem eligendi illo odit, recusandae esse, labore a incidunt hic nisi sit qui doloribus!",
    image: "/pic4.jpg",
    price: 2500,
    price_sale: 0,
  },
  {
    id:3,
    title: "Course 3",
    dec: "Description for course 3",
    image: "/pic4.jpg",
    price: 4200,
    price_sale: 250,
  },
  {
    id:4,
    title: "Course 4",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 3000,
    price_sale: 1500,
  },
  {
    id:5,
    title: "Course 5",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 5500,
    price_sale: 0,
  },
  {
    id:6,
    title: "Course 6",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 7000,
    price_sale: 5000,
  },
  {
    id:7,
    title: "Course 7",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 3000,
    price_sale: 0,
  },
  {
    id:8,
    title: "Course 8",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 6000,
    price_sale: 0,
  },
  // Add more courses as needed
];



const truncateText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const HomeUser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const [buyCourse, setBuyCourse] = useRecoilState(BuyCourseStore);

  const handleBuyNow = (course: Course) => {
    setBuyCourse(course);
    router.push("/user/buycourse");
  };

  return (
    <div
      className=" h-full "
      style={{
        backgroundImage:
          "linear-gradient(109.6deg,   rgba(215,223,252,1) 0%, rgba(255,255,255,1) 0%, rgba(215,223,252,1) 84% )",
      }}
    >
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="p-10">
        <div
          className="flex flex-col lg:flex-row mt-10  w-full  rounded-lg gap-5"
          style={{
            backgroundColor:"#E7C6FF"
          }}
          // style={{
          //   backgroundImage:
          //     "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
          // }}
        >
          <div className="w-full lg:w-5/12 pt-4 px-5 lg:ps-4   ">
            <div className="flex flex-col gap-5">
              <div>
                <Typography className="text-xl  text-white font-bold">
                  Hearder Title
                </Typography>
                <Typography className="text-md mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti obcaecati dolore pariatur labore magnam excepturi
                  autem ea laudantium similique sint.
                </Typography>
              </div>
              <div className=" bg-white rounded-lg p-2 lg:mb-2 w-full xl:w-[60%]">
                <Input
                  label="ค้นหาคอร์สเรียน"
                  icon={<FaSearch />}
                  crossOrigin
                  className="bg-white  !bg-opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-center w-full lg:w-7/12 ">
            <div className="flex justify-center  w-[550px] h-[220px] py-2 px-2 ">
              {/* <Image
              src="/pic1.jpg"
              alt=""
              width={400}
              height={200}
              p-0
              m-0
              className=" rounded-lg object-cover shadow-lg"
            /> */}
              <Carousel  />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Typography className="text-lg font-bold">คอร์สแนะนำ</Typography>
      </div>
      <div className=" flex flex-wrap gap-2 justify-center ">
        {courseCategories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className={`${
              selectedCategory === category
                ? "bg-purple-500 opacity-75 text-white"
                : " hover:border hover:border-purple-500 hover:text-purple-800 hover:font-bold"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="flex justify-center ">
        <div className="p-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 ">
          {recommendedCourses.map((course, index) => (
            <Card
              key={index}
              className="w-[310px] mt-5  flex flex-col justify-between"
              style={{
                backgroundImage:
                  "linear-gradient(180.6deg,  rgba(228,107,232,1) 11.2%, rgba(87,27,226,1) 96.7% )",
              }}
            >
              <div>
                <div className="flex w-full h-[200px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={310}
                    height={0}
                    priority
                    className="rounded-lg rounded-b-none object-cover mb-4"
                  />
                </div>
                <div>
                  <Typography className="text-lg font-semibold text-white ps-2">
                    {truncateText(course.title, 30)}
                  </Typography>
                </div>
                <div className="flex w-full text-wrap">
                  <Typography className="text-sm mt-2 text-white ps-3 pr-1">
                    {truncateText(course.dec, 90)}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col mt-auto px-4 pb-5">
                <div className="flex w-full text-wrap">
                  <Typography
                    className={`text-sm ${
                      course.price_sale > 0
                        ? "text-red-500 font-semibold"
                        : "text-white"
                    } mt-5 mb-2  pr-1`}
                  >
                    {course?.price_sale > 0
                      ? course?.price_sale.toLocaleString()
                      : course?.price.toLocaleString()}{" "}
                    บาท
                  </Typography>
                </div>
                <Button
                  className="w-full justify-center items-center text-base font-normal mb-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                  }}
                  onClick={() => handleBuyNow(course)}
                >
                  ซื้อตอนนี้
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
