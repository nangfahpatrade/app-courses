import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { toast } from "react-toastify";
import {
  Card,
  IconButton,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  MdDelete,
  MdEdit,
} from "react-icons/md";

import Swal from "sweetalert2";

import { IoIosArrowForward,IoIosArrowBack  } from "react-icons/io";
import { GrUploadOption } from "react-icons/gr";
import CryptoJS from "crypto-js";
import { authToken } from "@/app/utils/tools";


interface LearningTitleProps {
  courseSelect: number | undefined;
  formData: {
    lesson: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      category_id: string;
      image: string | null;
      videoFile: File | null;
      videoUrl: string;
      dec: string;
      title: string;
      lesson: string;
      regularPrice: number;
      discountPrice: number;
      youtube : string;
    }>
  >;
  pageTitle: number;
  setDataTitle: React.Dispatch<React.SetStateAction<any[]>>;
  dataTitle: any;
  setPageTitle: React.Dispatch<React.SetStateAction<number>>;
  setTitleId: React.Dispatch<React.SetStateAction<number>>;
}

const LearningTitle: React.FC<LearningTitleProps> = ({
  courseSelect,
  formData,
  setFormData,
  pageTitle,
  setPageTitle,
  setDataTitle,
  dataTitle,
  setTitleId,
}) => {



  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectIndex , setSelectIndex] = useState<number | null>(null)

  const fetchTitle = useCallback(
    async (id: any) => {
      const data = {
        products_id: id,
        page: pageTitle,
      };
      try {
        console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/product/title`,
          data,
          {
           ...HeaderAPI(await authToken()),
          }
        );
        console.log(res);
        if (res.status === 200) {
          setDataTitle(res.data);
        } else {
          toast.error("error");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    },
    [pageTitle, setDataTitle]
  );

  useEffect(() => {
    if (courseSelect) {
      fetchTitle(courseSelect);
    }
  }, [courseSelect, fetchTitle, pageTitle]);

  const handleAddOrEditTitle = useCallback(async () => {
    if (!courseSelect) {
      toast.error("Course not selected");
      return;
    }
    if (editingId) {
      // Edit existing title
      const data = {
        id: editingId,
        products_id: courseSelect,
        title: formData.lesson,
      };
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/product/title`,
          data,
          {
            ...HeaderAPI(await authToken()),
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
          setDataTitle(res.data);
          fetchTitle(courseSelect);
          setFormData((prevFormData) => ({
            ...prevFormData,
            lesson: "", // เคลียร์ค่า lesson หลังจากส่งข้อมูลสำเร็จ
          }));
          setEditingId(null); // Clear editing state
        } else {
          toast.error("error");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    } else {
      // Add new title
      const data = {
        products_id: courseSelect,
        title: formData.lesson,
      };
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/product/add/title`,
          data,
          {
           ...HeaderAPI(await authToken()),
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
          setDataTitle(res.data);
          fetchTitle(courseSelect);
          setFormData((prevFormData) => ({
            ...prevFormData,
            lesson: "", // เคลียร์ค่า lesson หลังจากส่งข้อมูลสำเร็จ
          }));
        } else {
          toast.error("error");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    }
  }, [
    courseSelect,
    formData.lesson,
    fetchTitle,
    setDataTitle,
    setFormData,
    setPageTitle,
    editingId,
  ]);

  // const handleDelete = async (item: any) => {
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.NEXT_PUBLIC_API}/api/product/title/${item.id}`,
  //       { ...HeaderAPI(localStorage.getItem("Token")) }
  //     );
  //     if (res.status === 200) {
  //       toast.success(res.data.message);
  //       setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
  //       fetchTitle(courseSelect);
  //     } else {
  //       toast.error("Delete failed");
  //     }
  //   } catch (err) {
  //     const error = err as { response: { data: { message: string } } };
  //     toast.error(error.response.data.message);
  //   }
  // };

  const handleDelete = async (item: any) => {
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
            `${process.env.NEXT_PUBLIC_API}/api/product/title/${item.id}`,
            {
               ...HeaderAPI(await authToken()),
            }
          );
          if (res.status === 200) {
            setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
            fetchTitle(courseSelect);
            clearForm()
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
            window.location.reload()

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

  const handleEdit = (item: any) => {
    console.log(item);
    setFormData((prevFormData) => ({
      ...prevFormData,
      lesson: item.title,
    }));
    setEditingId(item.id);
  };

  const handleUpload = async (item: any) => {
    // console.log(item)
    setTitleId(item.id);
    console.log(item);
    setSelectIndex(item.id)
    
  };

  const clearForm = () => {
    setEditingId(null)
    setFormData((prevFormData) => ({
      ...prevFormData,
      lesson: "", // เคลียร์ค่า lesson หลังจากส่งข้อมูลสำเร็จ
    }));
  }

  return (
    <div className="flex w-full   gap-3 shadow-lg">
      <div className="w-full overflow-auto  ">
        <Card className="p-3  overflow-auto border-2 ">
          <div className="flex gap-3 items-center">
            <Input
              label="สร้างบทเรียน"
              crossOrigin="anonymous"
              value={formData.lesson}
               color="gray"
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  lesson: e.target.value,
                }))
              }
              style={{backgroundColor:"#f5f5f5"}}
            />
            <div className="md:w-[100px]">
              <Button
                size="sm"
                disabled={!!!courseSelect}
                className="w-full text-sm rounded-lg"
                onClick={handleAddOrEditTitle}
                style={{backgroundColor:"#8d80d0"}}
              >
                {editingId ? "อัปเดต" : "บันทึก"}
              </Button>
            </div>
          </div>
          <div>
            <table className="w-full  mt-5  overflow-auto ">
              <thead>
                <tr>
                  <th className="border-b pb-2  p-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-sm  text-start leading-none opacity-70"
                    >
                      ลำดับ
                    </Typography>
                  </th>
                  <th className="border-b pb-2  p-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-sm  text-start leading-none opacity-70  whitespace-nowrap"
                    >
                      หัวข้อ
                    </Typography>
                  </th>
                  <th className="border-b pb-2  p-1   whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-sm text-end leading-none opacity-70 whitespace-nowrap "
                    >
                      อัพโหลด
                    </Typography>
                  </th>
                  <th className="border-b pb-2  p-1 w-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-sm  leading-none opacity-70"
                    >
                      แก้ไข/ลบ
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody className="justify-start items-start ">
                {dataTitle?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center pt-5">
                      <Typography>...ไม่พบข้อมูล...</Typography>
                    </td>
                  </tr>
                ) : (
                  dataTitle?.data?.map((item: any, index: number) => (
                    <tr key={item.id} style={{ marginTop: "3px" }}  className={`hover:bg-purple-100/20 ${selectIndex === item.id ? "bg-purple-100/40" :""}`}>
                      <td >
                        <div className="flex py-2.5  px-5  items-center  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className=" text-xs"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <div className="relative flex items-center justify-center tooltip">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className=" ps-1  text-xs overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px]"
                          >
                            {item.title}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <div className="flex  justify-end pr-5  ">
                            <GrUploadOption className="h-5 w-5 text-green-500  cursor-pointer" onClick={() => [handleUpload(item) , clearForm()] }/>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <MdEdit
                            className="h-5 w-5 text-purple-500 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />

                          <MdDelete
                            className="h-5 w-5 text-purple-500 cursor-pointer"
                            onClick={() => handleDelete(item)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 mt-5 px-2 items-center">
            <button
              className={` text-gray-400 text-xl whitespace-nowrap rounded-md border border-gray-300 shadow-md  ${
                pageTitle == 1 ? "" : "hover:text-black"
              } `}
              disabled={pageTitle == 1}
              onClick={() =>
                setPageTitle((pageTitle) => Math.max(pageTitle - 1, 1))
              }
            >
              <IoIosArrowBack />
            </button>
            <span style={{ whiteSpace: "nowrap" }} className="text-xs">
              หน้าที่ {pageTitle} / {dataTitle?.totalPages || 1}{" "}
            </span>
            <button
              className={`text-gray-400 text-xl whitespace-nowrap rounded-md border border-gray-300 shadow-md  ${
                Number(dataTitle?.totalPages) - Number(pageTitle) < 1
                  ? true
                  : false
                  ? ""
                  : "hover:text-black"
              }`}
              disabled={
                Number(dataTitle?.totalPages) - Number(pageTitle) < 1
                  ? true
                  : false
              }
              onClick={() => setPageTitle((pageTitle) => pageTitle + 1)}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LearningTitle;
