"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import { useRecoilState } from "recoil";
import { BuyCourseStore } from "@/store/store";

interface Course {
  title: string;
  dec: string;
  image: string;
  price: number;
  price_sale: number;
}

const topSale: Course[] = [
  {
    title:
      "Course 1 asfksdmkf dskjfjsdj;fjksd jkdsjfdllkljf  jkjsdjfjsldf kjsdkjfkljs",
    dec: "Description for course 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat tempora suscipit ipsum, doloribus maiores in recusandae amet? Harum laboriosam facere, explicabo vero odit odio earum nulla consequatur similique magnam, eaque commodi id animi voluptatibus at. Exercitationem eligendi illo odit, recusandae esse, labore a incidunt hic nisi sit qui doloribus!",
    image: "/pic4.jpg",
    price: 5900,
    price_sale: 0,
  },
  {
    title: "Course 2",
    dec: "Description for course 2  sit amet consectetur adipisicing elit. Cupiditate placeat tempora suscipit ipsum, doloribus maiores in recusandae amet? Harum laboriosam facere, explicabo vero odit odio earum nulla consequatur similique magnam, eaque commodi id animi voluptatibus at. Exercitationem eligendi illo odit, recusandae esse, labore a incidunt hic nisi sit qui doloribus!",
    image: "/pic7.jpg",
    price: 2500,
    price_sale: 0,
  },
  {
    title: "Course 3",
    dec: "Description for course 3",
    image: "/pic12.jpg",
    price: 4200,
    price_sale: 250,
  },
  {
    title: "Course 4",
    dec: "Description for course 2",
    image: "/pic6.jpg",
    price: 3000,
    price_sale: 1500,
  },
  // Add more courses as needed
];

const Topsale = () => {
  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="px-6 lg:px-56 mt-10 bg-white">
        <div className=" p-5 ">
      <div>
        <Typography className="text-lg font-bold">คอร์สแนะนำ Tops Salse</Typography>
      </div>
      <div className="flex justify-center mt-4 ">
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 ">
          {topSale.map((course, index) => (
            <Card
              key={index}
              className="w-full mt-5  flex flex-col justify-between border border-gray-300"
            >
              <div>
                <div className="flex w-full h-[200px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={500}
                    height={500}
                    priority
                    className=" object-cover "
                    style={{width:"100%" , height:"100%"}}
                  />
                </div>

                <div className="px-2 md:px-4 mt-5 ">
                <Typography className="text-lg font-semibold text-black ps-2">
                    {truncateText(course.title, 30)}
                  </Typography>

                  <Typography className="text-sm mt-2 text-gray-800 ps-3 pr-1">
                    {truncateText(course.dec, 90)}
                  </Typography>

                </div>
            
              </div>
              
              <div className="flex flex-col mt-4 px-6 pb-5 ">
                <div className="flex w-full text-wrap gap-3">
                  <Typography
                    className="text-xl  line-through  mb-2  pr-1"
                  >
                    {course?.price_sale > 0
                      ? course?.price.toLocaleString()
                      : ""}{" "}
                  </Typography>
                  <Typography
                    className={`text-xl ${
                      course.price_sale > 0
                        ? "text-red-500 font-semibold"
                        : "text-black"
                    }  mb-2  pr-1`}
                  >
                    {course?.price_sale > 0
                      ? course?.price_sale.toLocaleString()
                      : course?.price.toLocaleString()}{" "}
                    บาท
                  </Typography>
                </div>
                <Button
                  className="w-full justify-center items-center text-base font-normal "
                  variant="outlined"
                  color="purple"
                  size="sm"
                  // style={{
                  //   backgroundImage:
                  //     "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                  // }}
                //   onClick={() => handleBuyNow(course)}
                >
                  ซื้อตอนนี้
                </Button>
              </div>
            </Card>
          ))}
          
        </div>
      </div>
      </div>
        </div>
  );
};

export default Topsale;
