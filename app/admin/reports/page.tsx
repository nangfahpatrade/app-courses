"use client";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  VscGraphLine,
  VscOrganization,
  VscSettings,
  VscVmRunning,
} from "react-icons/vsc";
import moment from "moment";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import PaginationPage from "@/app/components/PaginationPage";
import ModalImage from "@/app/components/admin/modals/ModalImage";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const TABLE_HEAD = [
  "รหัส",
  "คอร์สเรียน",
  "วันที่ซื้อ",
  "วันหมดอายุ",
  "สถานะ",
  "สลิปโอนเงิน",
];

// const TABLE_ROWS = [
//   {
//     name: "John Michael",
//     job: "Manager",
//     date: "23/04/18",
//   },
//   {
//     name: "Alexa Liras",
//     job: "Developer",
//     date: "23/04/18",
//   },
//   {
//     name: "Laurent Perrier",
//     job: "Executive",
//     date: "19/09/17",
//   },
//   {
//     name: "Michael Levi",
//     job: "Developer",
//     date: "24/12/08",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
// ];

const Page = () => {
  const dateNow2 = moment(Date.now()).format("YYYY-MM-DD");

  // ทำไมใน value ไม่โชว์วันที่ defaule
  const [dateStart, setDateStart] = useState<string>(dateNow2);
  const [dateEnd, setDateEnd] = useState<string>(dateNow2);
  const [dataHeader, setDataHeader] = useState<any>({
    totalSales: 0,
    salesWithinDate: 0,
    customerCount: 0,
    topCourse: {
      product_title: "",
      product_price: "",
      product_image: "",
    },
  });

  // data table
  const [dataPay, setDataPay] = useState<any>([]);

  // Paginations
  const [pageStart_1, setPageStart_1] = useState<number>(1);
  const [pageEnd_1, setPageEnd_1] = useState<number>(1);

  // Search
  const [search, setSearch] = useState<string>("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    image: "",
  });
  const handleOpenModal = (image: string) => {
    console.log({ image });
    setModalData({
      image,
    });
    // เปิด Modal
    setIsModalOpen(true);
  };

  // search Button
  const handleSearch = async () => {
    try {
      const sendData = {
        date_start: dateStart,
        date_end: dateEnd,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/report/header`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      if (res.status === 200) {
        setDataHeader({
          totalSales: res.data.totalSales,
          salesWithinDate: res.data.salesWithinDate,
          customerCount: res.data.customerCount,
          topCourse: {
            product_title: res.data.topCourse.product_title,
            product_price: res.data.topCourse.product_price,
            product_image: res.data.topCourse.product_image,
          },
        });
      }
    } catch (error: any) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const fetchDataPay = async (pageStart_1: number) => {
    try {
      const sendData = {
        page: pageStart_1 || 1,
        search,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setDataPay(res.data.data);
        setPageStart_1(res.data.page);
        setPageEnd_1(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Pagination_1 = (pageNumber: number) => {
    if (pageNumber === 1) {
      if (pageStart_1 > 1) {
        fetchDataPay(pageStart_1 - 1);
      }
    } else {
      if (pageStart_1 < pageEnd_1) {
        fetchDataPay(pageStart_1 + 1);
      }
    }
  };

  useEffect(() => {
    handleSearch();
    fetchDataPay(pageStart_1);
  }, [search]);

  return (
    <div className=" container mx-auto px-2  lg:px-8 py-8">
      <ToastContainer autoClose={2000} theme="colored" />

      <ModalImage
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        modalData={modalData}
      />

      {/* Box 1 */}
      <div className="flex flex-col lg:flex-row gap-4">
        <section className="w-full lg:w-2/3 ">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white">
              <Input
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                type="date"
                label="วันที่เริ่มต้น"
                crossOrigin="anonymous"
                color="purple"
              />
            </div>
            <div className="bg-white">
              <Input
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                type="date"
                label="วันที่สิ้นสุด"
                crossOrigin="anonymous"
                color="purple"
              />
            </div>
            <Button
              color="purple"
              size="sm"
              className="text-sm"
              onClick={handleSearch}
            >
              ค้นหา
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <section className="w-full bg-white rounded-md shadow-lg px-4 py-5">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-gray-700">ยอดขายทั้งหมด</h2>
                <VscGraphLine
                  className="bg-purple-50 p-2 rounded-full text-purple-600"
                  size={40}
                />
              </div>
              <h3 className="mt-3 text-2xl">{dataHeader.totalSales} ฿</h3>
            </section>
            <section className="w-full bg-white rounded-md shadow-lg px-4 py-5">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-gray-700">ยอดขายตามที่เลือก</h2>
                <VscSettings
                  className="bg-purple-50 p-2 rounded-full text-purple-600"
                  size={40}
                />
              </div>
              <h3 className="mt-3 text-2xl">{dataHeader.salesWithinDate} ฿</h3>
            </section>
            <section className="w-full bg-white rounded-md shadow-lg px-4 py-5">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-gray-700">จำนวนคนซื้อตามที่เลือก</h2>
                <VscVmRunning
                  className="bg-purple-50 p-2 rounded-full text-purple-600"
                  size={40}
                />
              </div>
              <h3 className="mt-3 text-2xl">{dataHeader.customerCount} ท่าน</h3>
            </section>
          </div>
        </section>
        <section className="w-full lg:w-1/3 bg-white rounded-md shadow-lg  px-4 py-5">
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-gray-700 text-xl">
              คอร์สเรียนที่ขายดี อันดับ 1
            </h2>

            <VscOrganization
              className="bg-purple-50 p-2 rounded-full text-purple-600"
              size={40}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-between items-end">
            <section className="w-full lg:w-2/3">
              <div className="mt-3">
                <label htmlFor="" className="text-gray-900 font-semibold">
                  ชื่ออคร์สเรียน :
                </label>
                <p className="text-gray-700">
                  {dataHeader.topCourse.product_title}
                </p>
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-gray-900 font-semibold">
                  ราคา :
                </label>
                <p className="text-gray-700">
                  {dataHeader.topCourse.product_price}
                </p>
              </div>
            </section>
            <section className="w-full lg:w-1/3">
              {dataHeader.topCourse.product_image ? (
                <Image
                  width={500}
                  height={500}
                  loading="lazy"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${dataHeader.topCourse.product_image}`}
                  alt=""
                  className=" rounded-md"
                />
              ) : (
                "ไม่พบข้อมูล"
              )}
            </section>
          </div>
        </section>
      </div>

      {/* Box 2 */}

      <div className="flex flex-col lg:flex-row gap-4 mt-8 ">
        <section className="bg-white rounded-md shadow-lg py-8 px-4 md:px-6  w-full  h-[600px]  ">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center">
            <div className="flex flex-row gap-4 items-start justify-start w-full md:w-2/3  ">
              <VscOrganization
                className="bg-purple-50 p-2 rounded-full text-purple-600"
                size={40}
              />
              <h2 className="text-gray-700 text-xl">ข้อมูลการชำระเงิน</h2>
            </div>
            <div className="w-full md:w-1/3">
              <Input
                crossOrigin="anonymous"
                color="purple"
                type="text"
                label="ค้นหา"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Body */}
          <Card className=" w-full overflow-scroll mt-3">
            <table className="w-full min-w-max table-auto text-left  overflow-scroll ">
              <thead className="  ">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {dataPay.map((item: any, index: number) => {
                  const isLast = index === dataPay.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.code}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.start_pay}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.end_pay}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <p
                          className={`text-sm text-center px-2 rounded-md ${
                            item.status === 0
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status === 0 ? "ยังไม่ชำระ" : "ชำระแล้ว"}
                        </p>
                      </td>
                      <td className={classes}>
                        <button
                          disabled={item.status === 0}
                          className={`${
                            item.status === 0
                              ? "bg-gray-400 "
                              : "bg-purple-400 hover:bg-purple-600"
                          } text-white text-xs px-2 py-1 rounded-md`}
                          onClick={() => handleOpenModal(item.image)}
                        >
                          สลิปโอนเงิน
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          {/* PaginationPage */}
          <div className="flex  justify-end py-2">
            <PaginationPage
              Pagination={Pagination_1}
              pageStart={pageStart_1}
              pageEnd={pageEnd_1}
            />
          </div>
        </section>
        {/* <section className="bg-white rounded-md shadow-lg px-6 py-64  w-full overflow-y-scroll ">
          111
        </section> */}
      </div>
    </div>
  );
};

export default Page;

