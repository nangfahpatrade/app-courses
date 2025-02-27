"use client";
import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaUserLock } from "react-icons/fa";
import axios from "axios";
import CryptoJS from "crypto-js";
import PaginationPage from "@/app/components/PaginationPage";

const TABLE_HEAD = [
  "ชื่อลูกค้า",
  "Username",
  "E-mail",
  "เบอร์โทร",
  "สถานะ",
  "เลือก",
];

const Page = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // Paginations
  const [pageStart_1, setPageStart_1] = useState<number>(1);
  const [pageEnd_1, setPageEnd_1] = useState<number>(1);

  const Pagination_1 = (pageNumber: number) => {
    if (pageNumber === 1) {
      if (pageStart_1 > 1) {
        fetchData(pageStart_1 - 1);
      }
    } else {
      if (pageStart_1 < pageEnd_1) {
        fetchData(pageStart_1 + 1);
      }
    }
  };

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchData = async (pageStart_1: number) => {
    try {
      const sendData = {
        page: pageStart_1 || 1,
        search,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/logout/all`,
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
        setData(res.data.data);
        setPageStart_1(res.data.page);
        setPageEnd_1(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleLogout = async (id:number) => {
    
    try {
      const data = {
        id: id,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/logout`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      if (res.status === 200) {
        fetchData(pageStart_1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(pageStart_1);
  }, [search]);
  return (
    <div className="container mx-auto px-2  lg:px-8 py-8">
      <div className=" bg-white px-6 py-6 rounded-lg shadow-lg">
        <div className="w-1/3">
          <Input
            crossOrigin="anonymous"
            color="purple"
            type="text"
            label="ค้นหาจากอีเมล์ และเบอร์โทร"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* section 2 */}
      <div className=" mt-6 bg-white px-6 py-6 rounded-lg shadow-lg">
        <div className="flex flex-row gap-2 justify-start items-center">
          <FaUserLock size={20} />
          <h2 className="text-base text-gray-700">
            รายการผู้ใช้งานที่เข้าสู่ระบบแล้ว
          </h2>
        </div>

        <Card className="h-full w-full overflow-y-scroll my-6 ">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
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
            <tbody>
              {data.map((item: any, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={item.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.username}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.phone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <p
                        className={`${
                          item.status_login === 0
                            ? "bg-green-100 text-green-700 "
                            : "bg-red-200 text-white"
                        } text-center rounded-md text-sm`}
                      >
                        {item?.status_login === 0
                          ? "ไม่ได้ใช้งาน"
                          : "กำลังใช้งาน"}
                      </p>
                    </td>
                    <td className={classes}>
                      {item.status_login === 1 && (
                        <button className="bg-red-500 hover:bg-red-700 text-center px-2  rounded-md text-white" onClick={()=>handleLogout(item.id)}>
                          ออกจากระบบ
                        </button>
                      )}
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
      </div>
    </div>
  );
};

export default Page;
