"use client";
import { Input, Option, Radio, Select } from "@material-tailwind/react";
import axios from "axios";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// กำหนดโครงสร้างของข้อมูลคอร์ส
interface Course {
  id: number;
  image: string;
  title: string;
  category_name: string;
  price: number;
  price_sale: number;
}

const dataSelecttest = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

const CoursesPage: React.FC = () => {
  // กำหนดชนิดข้อมูลให้กับ state
  const [filterPrice, setFilterPrice] = useState<number>(1);
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [dataSelect, setDataSelect] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectType, setSelectType] = useState<any>("");
  const [selectTypeName, setSelectTypeName] = useState<any>("");
  const locale = useLocale()

  // ฟังก์ชันดึงข้อมูลจาก API โดยรับชนิดข้อมูลที่ชัดเจน
  const fetchData = async (): Promise<{ data: Course[] } | undefined> => {
    const requestData = {
      search: search,
      page: "",
      full: true,
      filter_price: filterPrice,
      category_id: selectType,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/courses`,
        requestData
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSelect = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/category`
      );
      if (res.status === 200) {
        setDataSelect(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectType = (e: any) => {
    const id = e.target.value;
    const findData = dataSelect.find((item) => item.id == id);
    console.log(id);
    
    if (id) {
      setSelectType(id);
    } else {
      setSelectType("");
    }
    if (findData) {
      setSelectTypeName(findData.name);
    }else {
      setSelectTypeName("");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await fetchData();
      setCoursesData(data?.data || []);
    };
    fetchCourses();
    fetchDataSelect();
  }, [filterPrice, search, selectType]);

  // ฟังก์ชันเปลี่ยนค่า filter
  const handleFilterChange = (value: number) => {
    setFilterPrice(value);
  };

  // ฟังก์ชันรีเซ็ต filter
  const resetFilters = () => {
    setFilterPrice(1);
    setSearch("");
    setSelectType(null);
  };

  return (
    <div className=" container mx-auto py-8 px-6 lg:px-0  flex flex-col md:flex-row  bg-gray-100">
      {/* Sidebar Filters p-5 md:p-10 2xl:px-10 */}
      {/* lg:w-3/12 2xl:w-2/12 */}
      <div className="w-full md:w-4/12 lg:w-1/5 p-4  bg-white shadow-md rounded-lg mb-5 md:mb-0 md:mr-4">
        <div className="flex flex-row items-center lg:items-start justify-between md:flex-col mb-3 gap-3">
          <h2 className="font-light text-lg">คอร์เรียนใหม่</h2>
          <h2 className="text-indigo-800 text-sm font-light">
            คอร์เรียนทั้งหมด 
          </h2>
        </div>
        <hr className="border border-gray-200 my-1" />
        <div className="flex justify-between mb-2">
          <h2 className="text-lg md:text-sm font-bold ">ตัวกรองคอร์สเรียน</h2>
          <button
            className="text-lg md:text-sm text-red-500 font-light "
            onClick={resetFilters}
          >
            ล้างตัวกรอง
          </button>
        </div>

        {/* Radio Buttons for Price Filter */}

        <small className="text-gray-500"> ราคา</small>
        <div className="flex flex-row md:flex-col ">
          <Radio
            crossOrigin="anonymous"
            name="type"
            label="ราคา น้อย-มาก"
            value="1"
            checked={filterPrice === 1}
            onChange={() => handleFilterChange(1)}
            color="indigo"
            className=""
          />

          <Radio
            crossOrigin="anonymous"
            name="type"
            label="ราคา มาก-น้อย"
            value="2"
            checked={filterPrice === 2}
            onChange={() => handleFilterChange(2)}
            color="indigo"
          />
        </div>

        <hr className="border border-gray-200 my-2" />

        <div className="">
          <small className="text-gray-500"> หมวดหมู่</small>

          <div className="mt-3 ">
            <select
              onChange={(e) => handleSelectType(e)}
              value={selectType || ""}
              className="w-full bg-gray-100 py-1.5 px-2 border border-gray-300 rounded-md "
            >
              <option value="">ทั้งหมด</option>
              {dataSelect.map((item, index) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div className="w-full md:w-8/12 lg:w-4/5 px-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center mb-4 bg-white">
          <Input
            crossOrigin="anonymous"
            type="text"
            label="ค้นหา"
            value={search}
            className="flex-grow p-2 border rounded-md md:rounded-l-md mb-2 md:mb-0 md:mr-2"
            onChange={(e) => setSearch(e.target.value)}
            color="indigo"
          />
          {/* <button className="bg-purple-500 text-white px-4 py-2 rounded-md md:rounded-r-md">
            ค้นหา
          </button> */}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-5 ">
          <div>
            <p className="text-xl md:text-2xl font-bold">
              คอร์สเรียน{" "}
              <span className="text-indigo-800 font-bold">
                {selectTypeName ? selectTypeName : "ทั้งหมด"}
              </span>
            </p>
            <p className="mb-4 text-sm text-gray-700">
              ผลลัพท์การค้นหา <span>{coursesData.length} คอร์ส </span>
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
          {coursesData.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-100 pb-3 shadow-sm rounded-md flex flex-col justify-between"
            >
              <Link href={`/${locale}/home/course/${course.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course.image}`}
                  alt={course.title}
                  width={500}
                  height={500}
                  className="rounded-t-md mb-4 object-cover h-60 md:h-48 w-full"
                />
                <div className="px-2 md:px-5">
                  <h2 className="text-sm  ">{course.title}</h2>
                  <p className="text-gray-600 text-sm">
                    หมวดหมู่ {course.category_name}
                  </p>
                  <div className="flex w-full flex-wrap gap-3 mt-2 items-center">
                    <p
                      className={`text-md ${
                        course.price_sale > 0
                          ? "text-red-500 font-semibold"
                          : "text-red-500 font-semibold"
                      } mb-2 pr-1`}
                    >
                      ราคา{" "}
                      {course.price_sale > 0
                        ? course.price_sale.toLocaleString()
                        : course.price.toLocaleString()}{" "}
                      บาท
                    </p>
                    {course.price_sale > 0 && (
                      <p className="line-through text-sm  text-gray-600">
                        {course.price.toLocaleString()} บาท
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-auto px-5">
                  {course.price === 0 ? (
                    <button className="bg-green-500 text-white px-4 py-1 rounded-md w-full">
                      ดูคอร์สเรียนนี้
                    </button>
                  ) : (
                    <button className="bg-indigo-900  text-white px-4 py-1 rounded-md w-full">
                      ซื้อคอร์สเรียนนี้
                    </button>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
