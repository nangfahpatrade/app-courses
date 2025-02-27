"use client";
import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import CryptoJS from "crypto-js";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MdDelete,
  MdEdit,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import { useState, useEffect, useCallback } from "react";
import AddEditModal from "./addEditModal";

import Swal from "sweetalert2";
import PaginationPage from "../PaginationPage";
import Image from "next/image";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

interface pay {
  id: number;
  code: string;
  start_pay: string;
  end_pay: string;
  name: string;
  title: string;
  status: number;
}

const PayPage: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Paginations
  const [pageStart, setPageStart] = useState<number>(1);
  const [pageEnd, setPageEnd] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    image: "",
  });

  // Modal
  const handleOpenModal = (image: string) => {
    console.log({ image });
    setModalData({
      image,
    });

    // เปิด Modal
    setIsModalOpen(true);
  };

  const Pagination = (pageNumber: number) => {
    if (pageNumber === 1) {
      if (pageStart > 1) {
        fetchData(pageStart - 1);
      }
    } else {
      if (pageStart < pageEnd) {
        fetchData(pageStart + 1);
      }
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  // const fetchPay = useCallback(async () => {
  //   const requestData = {
  //     page: page,
  //     search: searchQuery,
  //   };
  //   // console.log(requestData)
  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/api/pay`,
  //       requestData,
  //       {
  //         ...HeaderAPI(localStorage.getItem("Token")),
  //       }
  //     );
  //     console.log(res.data);
  //     if (res.status === 200) {
  //       setData(res.data);
  //     } else {
  //       toast.error("error");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("error");
  //   }
  // }, [page, searchQuery]);

  // useEffect(() => {
  //   fetchPay();
  // }, [fetchPay, page]);

  //------------- modal Add Product -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState<pay | null>(null);

  const fetchData = async (pageStart: number) => {
    try {
      const requestData = {
        page: pageStart || 1,
        search: search,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res.data);

      if (res.status === 200) {
        setData(res.data.data);
        setPageStart(res.data.page);
        setPageEnd(res.data.totalPages);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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

  const handleDelete = async (customer: pay) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ ?",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          if (res.status === 200) {
            fetchData(pageStart);
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

  useEffect(() => {
    fetchData(pageStart);
  }, [search]);

  return (
    <div className="flex justify-center gap-3 ">
      <ToastContainer autoClose={2000} theme="colored" />

      {/* <ModalImage
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        modalData={modalData}
      /> */}
      
      <Card className="flex w-full h-[85vh]">
        <div className="w-full p-5 justify-center items-center">
          <div className="w-72">
            <Input
              label="ค้นหาการซื้อคอร์ดเรียน"
              crossOrigin="anonymous"
              onChange={(e) => setSearch(e.target.value)}
              color="purple"
              
            />
          </div>

          <div className="overflow-auto  lg:h-[100%]">
            <Card className="mt-5 h-96 sm:h-[48vh] md:h-[58vh] lg:h-[60vh] overflow-auto mb-3 border-2 ">
              <table className="w-full text-sm text-center   ">
                <thead className="text-gray-800   bg-gray-200 border border-gray-300 ">
                  <tr>
                    <th className="px-2 py-3">ลำดับ</th>
                    <th className="px-2 py-3">เลขที่บิล</th>
                    <th className="px-2 py-3">ชื่อผู้ซื้อ</th>
                    <th className="px-2 py-3">หัวข้อ</th>
                    <th className="px-2 py-3">วันที่เริ่มซื้อ</th>
                    <th className="px-2 py-3">วันที่สิ้นสุด</th>
                    <th className="px-2 py-3">สลิปโอนเงิน</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 ">
                  {data.map((item: any, index: any) => (
                    <tr className="" key={item.id}>
                      <td className="px-2 py-3"> {index + 1}</td>
                      <td className="px-2 py-3"> {item.code}</td>
                      <td className="px-2 py-3"> {item.name}</td>
                      <td className="px-2 py-3"> {item.title}</td>
                      <td className="px-2 py-3"> {item.start_pay}</td>
                      <td className="px-2 py-3"> {item.end_pay}</td>
                      <td className="px-2 py-3">
                        <button
                          className="bg-purple-400 hover:bg-purple-600 text-white text-xs px-2 py-1 rounded-md"
                          onClick={() => handleOpenModal(item.image)}
                        >
                          สลิปโอนเงิน
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* PaginationPage */}
            <div className="flex  justify-end">
              <PaginationPage
                Pagination={Pagination}
                pageStart={pageStart}
                pageEnd={pageEnd}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PayPage;

// interface ModalImageProps {
//   isModalOpen: boolean;
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   modalData: { image: string };
// }

// export const ModalImage: React.FC<ModalImageProps> = ({
//   isModalOpen,
//   setIsModalOpen,
//   modalData,
// }) => {
//   return (
//     <div>
//       <Dialog
//         open={isModalOpen}
//         handler={setIsModalOpen}
//         className="bg-gray-200 "
//         size="sm"
//       >
//         <DialogBody divider>
//           {modalData.image && (
//             <div className="w-full flex justify-center">
//               <Image
//                 src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${modalData.image}`}
//                 alt=""
//                 width={400}
//                 height={400}
//                 className=" rounded-md"
//               />
//             </div>
//           )}
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             size="sm"
//             color="red"
//             onClick={() => setIsModalOpen(false)}
//             className="mr-1 text-sm"
//           >
//             <span>ปิด</span>
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// };
