// Super.tsx
"use client";
import {
  Card,
  Button,
  Input,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdDelete, MdEdit } from "react-icons/md";

import { useState, useEffect, useCallback } from "react";
import AddEditModal from "@/app/components/super/addEditModal";
import CryptoJS from "crypto-js";

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

const SuperHomePage: React.FC = () => {
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });


  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchCustomer = useCallback(async () => {
    const requestData = {
      status: 1,
      page: page,
      search: searchQuery,
    };
    // console.log(requestData)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/admin`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
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
  }, [page, searchQuery]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer, page]);

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


  const handleAddCustomer = async () => {
    if (dataEdit) {
      const updateData = { ...formData, id: dataEdit.id };
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/admin`,
          updateData,
          {
            ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
          }
        );
        if (res.status === 200) {
          fetchCustomer();
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
      // Adding new customer
      const data = {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        status: 1,
      };

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/register`,
          data,
          {
            ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
          }
        );
        if (res.status === 200) {
          fetchCustomer();
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
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/api/admin/${customer.id}`,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      console.log(res);
      if (res.status === 200) {
        fetchCustomer();
        toast.success(res?.data?.message);
      } else {
        toast.error("เกิดข้อผิดพลาด");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  //   console.log(page);
  console.log(dataEdit);

  return (
    <div className="flex justify-center gap-3">
      <ToastContainer autoClose={2000} theme="colored" />

      <Card className="flex w-full h-[85vh] ">
        <div className="w-full p-5 justify-center items-center">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center">
            <div className="flex gap-3">
              <Input
                label="ค้นหาผู้ใช้"
                crossOrigin="anonymous"
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setPage(1)}
              />
              {/* <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap">
                ล้างค้นหา
              </Button> */}
            </div>
            <div>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap"
                onClick={handleModalAdd}
              >
                เพิ่มข้อมูล
              </Button>
            </div>
          </div>
          <div className="overflow-auto lg:h-[100%]">
            <Card className="mt-5 h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[60vh] overflow-auto mb-3 border-2 ">
              <table className="w-full min-w-max ">
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
                        ชื่อ-สกุล
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 whitespace-nowrap"
                      >
                        Username
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
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item?.username}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-center gap-2  ">
                            <IconButton
                              size="sm"
                              className=" text-white max-w-7 max-h-7 bg-yellow-700  "
                              onClick={(e) => [
                                handleModalAdd(),
                                setDataEdit(item),
                              ]}
                            >
                              <MdEdit className="h-5 w-5   " />
                            </IconButton>
                            <IconButton
                              size="sm"
                              className=" bg-red-300 max-w-7 max-h-7 "
                              onClick={() => {
                                handleDelete(item);
                              }}
                            >
                              <MdDelete className="h-5 w-5   " />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>
            <div className="flex justify-end gap-5 mt-3 px-2 items-center ">
              <Button
                className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                disabled={page == 1}
                onClick={() => setPage((page) => Math.max(page - 1, 1))}
              >
                ก่อนหน้า
                {/* <IoIosArrowBack /> */}
              </Button>
              <span style={{ whiteSpace: "nowrap" }}>
                หน้าที่ {page} / {data?.totalPages || 1}{" "}
              </span>
              <Button
                className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                disabled={
                  Number(data?.totalPages) - Number(page) < 1 ? true : false
                }
                onClick={() => setPage((page) => page + 1)}
              >
                ถัดไป
              </Button>
            </div>
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
        handleAddCustomer={handleAddCustomer}
        dataEdit={dataEdit}
      />
    </div>
  );
};

export default SuperHomePage;
