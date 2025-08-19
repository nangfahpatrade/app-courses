"use client";
import { useRecoilValue } from "recoil";
import { BuyCourseStore } from "@/store/store";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Router } from "next/router";
import { useRouter, useParams } from "next/navigation"; // Correct import
import Topsale from "../topsale";
import parse from "html-react-parser";

import CryptoJS from "crypto-js";
import ModalHowToPay from "./ModalHowToPay";
import getStripe from "@/app/utils/getStripe";
import { headers } from "next/headers";
import Link from "next/link";
import { authToken } from "@/app/utils/tools";

const MySwal = withReactContent(Swal);

const BuyCourse = () => {
  // const buyData = useRecoilValue(BuyCourseStore);
  const [buyData, setBuyData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [bill, setBill] = useState("");
  const [payId, setPayId] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingQrcode, setLoadingQrcode] = useState(false);
  const [file, setFile] = useState(null);
  const [imageQrCode, setImageQrCode] = useState("");

  // check Pay
  const [checkPay, setCheckPay] = useState<any>({
    id: "",
    code: "",
    status: "",
    start_pay: "",
    end_pay: ""
  });

  const { id } = useParams();

  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);


  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);

        setBuyData(res.data);
        const price = res.data.products_price_sale
          ? res.data.products_price_sale
          : res.data.products_price;

        await fetchDataMyPay(price);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data from server.");
    }
  };

  const fetchDataMyPay = async (price: number) => {
    try {
      const sendData = {
        products_id: id,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users/check_pay`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        if (res.data.status > 0) {
          setShow(false)
          setLoading(false);
        } else {
          setShow(true)
        }


        setCheckPay({
          id: res.data.id,
          code: res.data.code,
          status: res.data.status,
          start_pay: res.data.start_pay,
          end_pay: res.data.end_pay
        });

        // setLoadingQrcode(true);
        // await fetchDataCreateQrCode(price);

      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create QR Code
  const fetchDataCreateQrCode = async (price: number) => {
    try {
      const sendData = { price: price || 0 };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users/qr_code/create`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      const qrCodePath = await res.data.qrCodePath;
      if (qrCodePath) {
        setImageQrCode(qrCodePath);
        setLoadingQrcode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [show]);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]); // Capture the file when the input changes
  };

  const handleCheckPay = async () => {
    setLoading(false);
    MySwal.fire({
      title: "ทำรายการซื้อ .....",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const data = {
      users_id: Number(userId),
      product_id: Number(buyData?.product_id),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/add`,
        data,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        MySwal.close();
        toast.success(res.data.message);
        setPayId(res.data.pay_id);
        setShow(true);
        setBill(res?.data?.bill_number);

      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("กรุณาแนบไฟล์สลิป!"); // Display an error message if no file is selected
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
    formData.append("pay_id", payId ? payId : checkPay.id);

    const price = buyData?.products_price_sale
      ? buyData?.products_price_sale.toLocaleString()
      : buyData?.products_price.toLocaleString();

    formData.append("price", price);
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
        await fetchDataMyPay(0);
        toast.success(response.data.message);
        setSuccess(true);
        MySwal.close();
      } else {
        setLoading(false);
        toast.error("Form submission failed!");
        MySwal.close();
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  //TypeError: Cannot read properties of undefined (reading 'match')
  const handleCheckout = async () => {
    try {
      const payload = {
        productId: id,
        orderId: checkPay.id
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/create-payment-session`,
        payload,
        HeaderAPI(await authToken())
      );

      if (res.status === 200) {
        const sessionId = res.data.id
        const stripe = await getStripe()
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.warn('Stripe redirect error:', error.message);
          }
        }
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-start  lg:flex-row gap-5 py-0 lg:py-10 px-3 lg:px-36   ">
      <ToastContainer autoClose={2000} theme="colored" />
      <ModalHowToPay open={open} handleOpen={handleOpen} />


      <div className="w-full md:w-3/5 ">
        <Card className="lg:h-full w-full  gap-5 !bg-white  ">
          <div className="w-full flex justify-center bg-gray-300 rounded-sm   ">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${buyData?.product_image}`}
              alt=""
              width={400}
              height={400}
              className="flex w-auto h-auto lg:w-[400px]  "
            />
          </div>

          <div className="flex flex-col  gap-3 py-4 px-6 md:px-8  ">
            <div className=" flex flex-col lg:flex-row  gap-2  ">
              <div className="w-full lg:w-1/6">
                <Typography className="font-bold text-base text-black ">
                  หัวข้อ :
                </Typography>
              </div>
              <div className="w-full text-sm lg:w-5/6 ">
                <Typography className="text-base  " >
                  {buyData?.product_title || ""}
                </Typography>
              </div>
            </div>

            <div className=" flex flex-col lg:flex-row gap-2  ">
              <div className="w-full lg:w-1/6">
                <Typography className="font-bold text-black  text-base">
                  ราคา :
                </Typography>
              </div>
              <div className="w-full text-sm lg:w-5/6">
                <Typography className="text-base">
                  {/* {buyData?.products_price_sale
                    ? buyData?.products_price_sale.toLocaleString()
                    : buyData?.products_price.toLocaleString()}{" "} */}
                  {buyData?.products_price?.toLocaleString()}
                  <span className="ml-1.5">บาท</span>
                </Typography>
              </div>
            </div>

            <div className=" flex flex-col lg:flex-row gap-2    ">
              <div className="w-full lg:w-1/6">
                <Typography className="font-bold text-base text-red-500  ">
                  ลดเหลือ :
                </Typography>
              </div>
              <div className="w-full text-sm lg:w-5/6">
                <Typography className="text-base text-red-500">
                  {/* {buyData?.products_price_sale
                    ? buyData?.products_price.toLocaleString()
                    : 0} */}
                  {buyData?.products_price_sale?.toLocaleString()}
                  <span className="ml-1.5">บาท</span>
                </Typography>
              </div>
            </div>

            <div className=" flex flex-col lg:flex-row gap-2 items-start ">
              <div className=" w-full lg:w-1/6">
                <Typography className="font-bold text-black ">
                  รายละเอียด :
                </Typography>
              </div>
              {/* <Typography>{truncateText(buyData?.dec || "", 70)}</Typography> */}
              <div className="w-full text-sm lg:w-5/6">
                {parse(buyData?.product_dec || "")}
              </div>
            </div>

            <div className="mt-4 mb-10">
              <h2 className="text-lg text-black">รายละเอียดบทเรียน</h2>
              <div className="mt-5 bg-gray-50 rounded-md">
                {buyData?.result_list?.map((lesson: any, index: number) => (
                  <div
                    key={index}
                    className="flex border-b  py-3 px-5 justify-between items-center border  border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <h2 className="font-medium text-sm text-gray-900">
                      {lesson.title}
                    </h2>
                    <p className="text-gray-900 text-sm ">
                      จำนวน {lesson.video_count} บทเรียน
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="w-full md:w-2/5  ">
        {/* <Card className="lg:h-[550px] w-full overflow-auto gap-5 px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 ">
            <div className="w-full sm:w-[150px]">
              <Button
                className="w-full justify-center items-center text-base font-normal mb-0"
                size="sm"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                }}
                onClick={handleCheck}
                disabled={checkPay.id}
              >
                ทำรายการซื้อ
              </Button>
            </div>

            <div className="w-full sm:w-[150px]">
              <Button
                className="w-full justify-center items-center text-base font-normal mb-0"
                size="sm"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                }}
                onClick={handleOpen}
                
              >
                วิธีการชำระเงิน
              </Button>
            </div>
          </div>

          <hr className=" " />

          {loading && <p>{loading}</p>}
    

        {show && (
              <div className="flex flex-col gap-3 ">
              <>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full">
                    { loadingQrcode
                      ? imageQrCode && (
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${imageQrCode}`}
                            className="w-32"
                            alt=""
                          />
                        )
                      : "กำลังสร้าง QR Code ...."}
                  </div>
                  <div className="w-full">
                    <ul className="text-base">
                      <li>บัญชี : พร้อมเพย์</li>
                      <li>เลขที่บัญชี : 1360400163514</li>
                      <li>ชื่อบัญชี : น.ส. ปรัศนี เดชจำเริญ</li>
                    </ul>
                  </div>
                </div>
              </>

              <div className="flex flex-col 2xl:flex-row gap-5 2xl:gap-[57px] items-center mb-2 ">
                <div className="w-full">
                  <Typography className="font-bold whitespace-nowrap  ">
                    บิลเลขที่ :
                  </Typography>
                  <Typography className="text-base">
                    {bill || checkPay.code}
                  </Typography>
                </div>

                <div className="w-full">
                  <div
                    className={`${
                      checkPay.status == 0
                        ? "bg-red-500"
                        : checkPay.status === 1
                        ? "bg-green-500"
                        : ""
                    } py-2 px-4  flex gap-2 rounded-md`}
                  >
                    <Typography className="font-semibold text-white">
                      สถานะ :
                    </Typography>
                    <Typography className="font-semibold text-white">
                      {checkPay.status == 0
                        ? "ยังไม่ชำระ"
                        : checkPay.status === 1
                        ? "ชำระเงินแล้ว"
                        : ""}
                    </Typography>
                  </div>
                </div>
              </div>

              {success ? (
                ""
              ) : (
                <div className="">
                  <hr className="" />

                  <div className="flex flex-col 2xl:flex-row items-center gap-5 2xl:gap-[34px]  py-2">
                    <div className="w-full">
                      <Typography className="font-bold text-base whitespace-nowrap ">
                        ราคารวมภาษีมูลค่าเพิ่ม :
                      </Typography>
                      <Typography className="text-lg">
                        ราคา{" "}
                        {buyData?.products_price_sale || 0 > 0
                          ? buyData?.products_price_sale?.toLocaleString()
                          : buyData?.products_price?.toLocaleString()}{" "}
                        บาท
                      </Typography>
                    </div>
                
                    {checkPay.status === 0 && (
                      <div className="w-full">
                        <Input
                          type="file"
                          label="แนบสลิป files"
                          onChange={handleFileChange}
                          crossOrigin="anonymous"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <hr className="" />
              {success || checkPay.status === 1 ? (
                <div className=" flex gap-2  w-full sm:w-[200px] mt-5">
                  <Button
                    className="w-full justify-center items-center text-base font-normal mb-0"
                    size="sm"
                    style={{
                      backgroundImage:
                        "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                    }}
                    onClick={() => router.push("/user/mycourse")}
                  >
                    ไปที่คอร์สเรียนของคุณ
                  </Button>
                </div>
              ) : (
                <div className=" flex gap-2 w-full sm:w-[150px] mt-3 ">
                  <Button
                    className="w-full justify-center items-center text-base font-normal mb-0"
                    size="sm"
                    style={{
                      backgroundImage:
                        "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                    }}
                    onClick={handleSubmit}
                  >
                    สั่งซื้อคอร์สเรียนนี้
                  </Button>
                </div>
              )}
              <small className="text-red-700 mt-1">
                ** เราใช่ระบบตรวจจับสลิปโอนเงิน กรุณาตรวจสอบให้ถูกต้องก่อนโอน
              </small>
            </div>
        )}
      

        </Card> */}
        <Card className="w-full overflow-auto gap-5 px-6 py-4 lg:h-[620px] ">

          {buyData?.products_price === 0 && buyData?.products_price_sale === 0 ? ('ฟรี') : (
            <Button onClick={handleCheckout} disabled={!show} color="indigo">
              {show ? 'สั่งซื้อและชำระเงิน' : 'ซื้อคอร์สเรียนนี้แล้ว '}
            </Button>
          )}

          <hr />
          <ul className="flex flex-col gap-3">
            <li>สถานะ : {checkPay.status === 0 ? "ยังไม่ซื้อ" : checkPay.status === 1 ? "ซื้อแล้ว" : " - "}</li>
            <li>รหัสบิล : {checkPay.code || " - "}</li>
            <li>วันที่ซื้อ :  {checkPay.start_pay || " - "} </li>
            <li>วันที่หมดอายุ :  {checkPay.end_pay || " - "} </li>
          </ul>

          <hr />
          {/* 
          { checkPay.status === 1 && (
            <Link href={`/user/study/${id}`}>
              <Button className="w-full">ดูคลิปวีดีโอ</Button>
            </Link>
          )} */}

          {(checkPay?.status === 1 || buyData?.products_price === 0 && buyData?.products_price_sale === 0) && (
            <Link href={`/user/study/${id}`}>
              <Button className="w-full">ดูคลิปวีดีโอ</Button>
            </Link>
          )}

        </Card>
      </div>
    </div>
  );
};

export default BuyCourse;
