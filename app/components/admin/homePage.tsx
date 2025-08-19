// Super.tsx
"use client";
import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";


import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { IoIosArrowForward,IoIosArrowBack  } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MdDelete,
  MdEdit,
} from "react-icons/md";

import { FaSearch, FaChalkboardTeacher } from "react-icons/fa";

import { useState, useEffect, useCallback } from "react";
import AddEditModal from "./addEditModal";
import CryptoJS from "crypto-js";

import Swal from "sweetalert2";
import { authToken } from "@/app/utils/tools";

interface Customer {
  id: number;
  username: string;
  name: string;
  address: string;
}

interface ResponseData {
  data: Customer[];
  totalPages: number;
}



const AdminPage: React.FC = () => {
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData =  useCallback((ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  },[secretKey])
 


  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const fetchCategory = useCallback(async () => {
    const requestData = {
      page: page,
      search: searchQuery,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/category`,
        requestData,
        {
          ...HeaderAPI(await authToken()),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  },  [decryptData, page, searchQuery]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory, page]);

  console.log(searchQuery);

  //------------- modal Add Product -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState<Customer | null>(null);

  const handleModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
    if (!openModalAdd) {
      setFormData({
        username: "",
        password: "",
        name: "",
      });
      setDataEdit(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCategory = async () => {
    if (dataEdit) {
      const updateData = { ...formData, id: dataEdit.id };
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/category`,
          updateData,
          {
            ...HeaderAPI(await authToken()),
          }
        );
        if (res.status === 200) {
          fetchCategory();
          toast.success("ข้อมูลถูกแก้ไขเรียบร้อยแล้ว");
          handleModalAdd();
        } else {
          toast.error("เกิดข้อผิดพลาด");
        }
      } catch (err) {
        handleModalAdd();
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    } else {
      const data = {
        name: formData.name,
      };

      console.log(data);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/category/add`,
          data,
          {
            ...HeaderAPI(await authToken()),
          }
        );
        console.log(res);
        if (res.status === 200) {
          fetchCategory();
          toast.success(res.data.message);
          setFormData({ username: "", password: "", name: "" });
          handleModalAdd();
        } else {
          toast.error("เกิดข้อผิดพลาด");
        }
      } catch (err) {
        handleModalAdd();
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    }
  };

  const handleDelete = async (customer: Customer) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ ?",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8d80d0",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
      background: "#f9f9f9", // สีพื้นหลังของกรอบข้อความ
      width: "350px", // ปรับขนาดความกว้าง
      padding: "1em", // ปรับขนาดความสูง
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `, // ปรับแต่ง backdrop
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API}/api/category/${customer.id}`,
            {
              ...HeaderAPI(await authToken()),
            }
          );
          if (res.status === 200) {
            fetchCategory();
            Swal.fire({
              // title: "ลบแล้ว !",
              text: "ข้อมูลของคุณถูกลบแล้ว.",
              icon: "success",
              width: "400px", // ปรับขนาดความกว้าง
              background: "#f9f9f9", // สีพื้นหลังของกรอบข้อความ
              timer: 1000, // กำหนดเวลาให้ปิดเอง (2000 มิลลิวินาที = 2 วินาที)
              timerProgressBar: true, // แสดงแถบความคืบหน้า
              // willClose: () => {
              //   console.log("Alert is closed"); // คุณสามารถเพิ่มการทำงานเพิ่มเติมได้ที่นี่
              // },
              backdrop: `
              rgba(0,0,0,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `, // ปรับแต่ง backdrop
            });
          } else {
            toast.error("เกิดข้อผิดพลาด");
          }
        } catch (err) {
          const error = err as { response: { data: { message: string } } };
          toast.error(error.response.data.message);
        }
      }
    });
  };


  return (
   
    <div className="flex justify-center gap-3 container mx-auto py-4 ">
      <ToastContainer autoClose={3000} theme="colored" />
      <Card className="flex w-full h-[85vh] mb-2">
        <div className="w-full p-5 justify-center items-center">
          <div className="flex flex-col sm:flex-row  gap-3 items-center ">
              <div className="flex gap-2 items-center text-xl  ">
                <FaChalkboardTeacher  />
                <Typography className="font-bold">จัดการหมวดหมู่</Typography>
              </div>
              <div>
                <Input
                  label="ค้นหา"
                  color="deep-purple"
                  crossOrigin="anonymous"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setPage(1)}
                  icon={<FaSearch className=" text-deep-purple-300 " />}
                  style={{ backgroundColor: "#f4f2ff"}}
                />
              </div>
              <div>
                <Button
                  size="sm"
                  className=" text-xs w-full lg:w-[100px] text-white rounded-lg whitespace-nowrap custom-hover"
                  onClick={handleModalAdd}
                  style={{backgroundColor:"#8d80d0"}}
                >
                  เพิ่มข้อมูล
                </Button>
              </div>
              {/* <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap">
                ล้างค้นหา
              </Button> */}
      
          </div>
          <div className="overflow-auto  ">
            {/* <Card className="mt-5 h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[60vh] overflow-auto mb-3 border-2 "> */}           
              <table className="w-full min-w-max  mt-5">
                <thead>
                  <tr>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 "
                      >
                        ลำดับ
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        ชื่อ
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        แก้ไข/ลบ
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center pt-5">
                        <Typography>...ไม่พบข้อมูล...</Typography>
                      </td>
                    </tr>
                  ) : (
                    data?.data?.map((item, index) => (
                      <tr key={item.id} style={{ marginTop: "3px" }}>
                        <td className="py-2">
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item?.name}
                            </Typography>
                          </div>
                        </td>

                        <td>
                          <div className="flex justify-center gap-2  ">
                            <MdEdit
                              className="h-5 w-5 text-purple-500 cursor-pointer "
                              onClick={(e) => [
                                handleModalAdd(),
                                setDataEdit(item),
                              ]}
                            />

                            <MdDelete
                              className="h-5 w-5 text-purple-500 cursor-pointer "
                              onClick={() => {
                                handleDelete(item);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </div>
            <div className="flex justify-end gap-2 mt-7 px-2 items-center ">
              <button
                className={` text-gray-400  text-2xl  whitespace-nowrap rounded-full border border-gray-300 shadow-md  ${
                  page == 1 ? "" : "hover:text-black"
                } `}
                disabled={page == 1}
                onClick={() => setPage((page) => Math.max(page - 1, 1))}
              >
                <IoIosArrowBack />
              </button>
              <span style={{ whiteSpace: "nowrap" }} className="text-sm">
                หน้าที่ {page} / {data?.totalPages || 1}{" "}
              </span>
              <button
                className={`text-gray-400 text-2xl whitespace-nowrap rounded-full border border-gray-300 shadow-md  ${
                  Number(data?.totalPages) - Number(page) < 1
                    ? true
                    : false
                    ? ""
                    : "hover:text-black"
                }`}
                disabled={
                  Number(data?.totalPages) - Number(page) < 1 ? true : false
                }
                onClick={() => setPage((page) => page + 1)}
              >
                <IoIosArrowForward />
              </button>
            </div>
        </div>
      </Card>

      {/* modal Add and Edit  */}
      <AddEditModal
        open={openModalAdd}
        handleModalAdd={handleModalAdd}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleAddCategory={handleAddCategory}
        dataEdit={dataEdit}
      />
    </div>
  );
};

export default AdminPage;
