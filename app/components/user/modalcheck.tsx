import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { AiOutlineStop } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";

import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import axios from "axios";
import CryptoJS from "crypto-js";

interface ReviewFormData {
  products_name: string;
  products_price: number; // Adjust type as needed
  code: string;
  pay_image: string;
  start_pay: string;
  end_pay: string;
  status: number;
  pay_id: number;
}

interface AddEditModalReviewProps {
  open: boolean;
  handleModal1: () => void;
  item: ReviewFormData | null;
  fetchData: () => Promise<void>; 
}

const ModalCheck: React.FC<AddEditModalReviewProps> = ({
  open,
  handleModal1,
  item,
  fetchData,
}) => {
 
  const [file, setFile] = useState(null);

  console.log(item);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("กรุณาแนบไฟล์สลิป!");
      return;
    }
    MySwal.fire({
      title: "กำลังส่งข้อมูล...",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("pay_id", String(item?.pay_id || "")); // Convert to string
    formData.append("price", String(item?.products_price || "")); // Convert to string
    formData.append("file", file);

    try {
      console.log(Object.fromEntries(formData));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/upload_slip`,
        formData,
        { ...HeaderMultiAPI(decryptData(localStorage.getItem("Token") || "")) }
      );

      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        MySwal.close();
        await fetchData(); 
        handleModal1();
     
      } else {
        toast.error("Form submission failed!");
        MySwal.close();
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} size={"xs"} handler={handleModal1} className="h-auto">
      <DialogHeader
        className="py-3 px-3 justify-center text-lg  opacity-80"
        style={{ backgroundColor: "#f4f2ff" }}
      >
        <Typography variant="h5">เช็คข้อมูลใบเสร็จ</Typography>
      </DialogHeader>
      <DialogBody divider className="overflow-auto">
        <div>
          <ToastContainer autoClose={2000} theme="colored" />
          <Card className="shadow-lg relative">
            <CardBody>
              <div className="mt-5">
                <div className=" ">
                  <Input
                    type="file"
                    label="แนบสลิป files"
                    onChange={handleFileChange}
                    crossOrigin
                  />
                </div>
                <div className=" flex gap-2  item-end justify-end w-full  mt-3 ">
                  <Button
                    className="w-[100px] text-base font-normal mb-0"
                    size="sm"
                    style={{
                      backgroundImage:
                        "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                    }}
                    onClick={handleSubmit}
                  >
                    ส่ง
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          //   variant="text"
          color="red"
          size="sm"
          onClick={handleModal1}
          className="flex mr-1 text-sm"
        >
          <span className="text-lg mr-2">
            <AiOutlineStop />
          </span>
          ยกเลิก
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalCheck;
