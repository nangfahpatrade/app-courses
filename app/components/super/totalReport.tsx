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
import CryptoJS from "crypto-js";
import AddEditModal from "@/app/components/super/addEditModal";

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

const TotalReport: React.FC = () => {
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
      <div className="flex flex-col w-full gap-5 ">
        <div className="flex flex-col lg:flex-row gap-10 px-20">
          <Card className="flex px-10 w-full py-5 gap-1  rounded-lg lg:w-8/12 ">
            <div className="gap-1">
              <div className="flex justify-between items-center align-middle ">
                <Typography className="text-center text-xl font-semibold">
                  รายงานยอดขายรวม{" "}
                </Typography>
                <Button color="green" size="sm" className="text-sm">
                  Excel
                </Button>
              </div>
              <div className="flex flex-col md:flex-row gap-3 mt-5 justify-center">
                <div>
                  <Input label="วันที่เริ่มต้น" type="date" crossOrigin />
                </div>
                <div>
                  <Input label="วันที่สิ้นสุด" type="date" crossOrigin />
                </div>
                <div>
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
              </div>
            </div>
          </Card>
          <Card className="flex w-full py-5 px-14 rounded-lg  lg:w-4/12  gap-3 ">
            <div>
              <Typography className=" text-2xl font-semibold text-red-500">
                ยอดขาย : xxxxx บาท{" "}
              </Typography>
            </div>
            <div>
              <Typography className=" text-xl font-semibold">
                ขายได้ : 10 คอร์ส{" "}
              </Typography>
            </div>
          </Card>
        </div>

        <div className="px-10 mt-3">
          {/* <Card className="flex w-full   "> */}
            <div className="w-full  justify-center items-center">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center"></div>
              <div className="overflow-auto">
                <Card className=" h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[47vh] overflow-auto  border-2 ">
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
                            คอร์สเรียน
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70 whitespace-nowrap"
                          >
                            หมวดหมู่
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70 whitespace-nowrap"
                          >
                            ราคาขาย
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70 whitespace-nowrap"
                          >
                            ราคาซื้อ
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4  whitespace-nowrap">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ผู้ซื้อ
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4  whitespace-nowrap">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            วันที่ซื้อ
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
                                  {/* {item?.name} */}xxx
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
                                  {/* {item?.username} */}xxx
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
                                  {/* {item?.username} */}xxx
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
                                  {/* {item?.username} */}xxxx
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
                                  {/* {item?.username} */}xxxx
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
                                  {/* {item?.username} */} xxx
                                </Typography>
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
                    className=" text-white whitespace-nowrap hover:bg-gray-600"
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
                    className=" text-white whitespace-nowrap hover:bg-gray-600"
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
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
};

export default TotalReport;
