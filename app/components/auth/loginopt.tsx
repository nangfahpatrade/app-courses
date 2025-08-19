"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import CryptoJS from "crypto-js";
import React, { FormEvent, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Template from "./template";
import Cookies from 'js-cookie';
import { ErrorAlert } from "@/app/utils/apiConfig";


const LoginOTPPage: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [sendotp, setSendotp] = useState(0);
  const [sendCheck, setSendCheck] = useState(0);
  const [otp, setotp] = useState("");
  const [idOtp, setIdOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  interface MyJwtPayload extends JwtPayload {
    username: string;
    status: number;
    id: number;
  }

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // const handleLogin = async (id: number, otp: string) => {
  //   try {
  //     const data = { id, otp };
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/api/login/otp`,
  //       data
  //     );

  //     if (res.status === 200) {
  //       toast.success(res.data.message);
  //       const token = res.data.token;
  //       const decoded = jwtDecode<MyJwtPayload>(token);

  //       if (token && decoded) {
  //         // เข้ารหัสและเก็บข้อมูล
  //         localStorage.setItem("Token", encryptData(token));
  //         localStorage.setItem(
  //           "Status",
  //           encryptData(decoded.status.toString())
  //         );
  //         sessionStorage.setItem("login", encryptData(decoded.username));
  //         localStorage.setItem("Id", encryptData(decoded.id.toString()));

  //         let redirectPath = "/";
  //         const status = parseInt(
  //           decryptData(localStorage.getItem("Status") || "")
  //         );

  //         // ตรวจสอบสถานะเพื่อเปลี่ยนเส้นทาง
  //         if (status === 2) {
  //           redirectPath = "/super";
  //         } else if (status === 1) {
  //           redirectPath = "/admin";
  //         } else if (status === 0) {
  //           redirectPath = "/user/shopcourse";
  //         }

  //         setTimeout(() => {
  //           router.push(redirectPath);
  //         }, 1500);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogin = async (id: number, otp: string) => {
    try {
      const data = { id, otp };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/login/otp`,
        data
      );

      if (res.status === 200) {
        const token = res.data.token;
        if (!token) {
          toast.error("เกิดข้อผิดพลาด: ไม่พบ Token ")
          return
        }

        const decoded = jwtDecode<MyJwtPayload>(token);
        toast.success(res.data.message);
        const status = decoded.status.toString();
        Cookies.set('authToken', token, { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('status', status, { expires: 1, secure: true, sameSite: 'strict' });
        window.location.reload();


      }
    } catch (error) {
      console.log(error);
       ErrorAlert(error)
    }
  };

  const handleReset = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      let data: any = { phone }; // ใช้ค่าที่เก็บไว้ ไม่ต้องประกาศซ้ำ
      let check: any = 0;

      try {
        if (sendotp === 200) {
          data = { phone, otp }; // ส่งแค่ phone และ otp
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/otp/check`,
            data
          );

          if (res.status === 200) {
            setSendCheck(200); // เปลี่ยนสถานะหลังจาก OTP ตรวจสอบสำเร็จ
            setIdOtp(res.data); // เก็บ ID OTP

            check = 200;
            console.log("check1" + check);
            if (check === 200) {
              // ขั้นตอนต่อไป
              await handleLogin(res.data, otp);
            }
          }

          // ถ้าไม่ได้ขอ OTP จะทำการขอ OTP
        } else {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/otp/add`,
            data
          );

          if (res.status === 200) {
            setSendotp(200); // เปลี่ยนสถานะหลังจากขอ OTP สำเร็จ
          }
        }
      } catch (error) {
        ErrorAlert(error)
      }
    },
    [phone, otp, sendotp, sendCheck, idOtp]
  );

  return (
    <div className="bg-gray-200 h-screen flex   justify-center items-center  px-10 md:px-64">
      <ToastContainer autoClose={3000} theme="colored" />
      <div className="bg-white rounded-3xl shadow-xl  flex flex-col lg:flex-row  ">
        <Template />

        <div className="w-full lg:w-3/4 ">

          <div className="flex flex-row w-full items-center gap-3  justify-end py-4 px-8">
            <p className="text-gray-600 text-xs">
              เข้าสู่ระบบเพื่อเรียนคอร์สออนไลน์
            </p>
            <button
              className=" text-[10px]  border border-gray-500 px-4 py-2 rounded-full"
              onClick={() => router.push("/auth/login")}
            >
              {" "}
              เข้าสู่ระบบ
            </button>
          </div>

          <div className="flex flex-col  gap-6 py-6 md:py-10 md:pb-14 px-8 md:px-16  ">
            <div className="flex flex-col w-full  ">
              <div>
                <Typography className=" font-medium text-3xl ">
                  {sendotp === 200 ? ("กรุณากรอก (OTP)") : ("เข้าสู่ระบบด้วย (OTP)")}
                </Typography>
              </div>
              <div>
                <Typography className=" mt-3 text-sm font-medium text-gray-500">
                  ระบบห้องเรียน Online
                </Typography>
              </div>
            </div>

            <form onSubmit={handleReset} className="w-full">
              <div className="flex flex-col gap-6">
                {sendotp === 200 ? (
                  <div>
                    <Input
                      type="text"
                      label="กรอก OTP"
                      value={otp}
                      color="indigo"
                      onChange={(e) => setotp(e.target.value)}
                      required
                      className="mb-4"
                      crossOrigin=""
                    />
                  </div>
                ) : (
                  <div>
                    <Input
                      type="tel"
                      label="เบอร์โทรศัพท์"
                      value={phone}
                      color="indigo"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mb-4"
                      crossOrigin=""
                    />
                  </div>
                )}

                <div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {sendotp === 200 ? (
                      <Button
                        type="submit"
                        className="w-full rounded-lg"
                        color="indigo"

                      >
                        เข้าสู่ระบบ
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full rounded-lg"
                        color="indigo"

                      >
                        ขอรับ OTP
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      className="w-full rounded-lg"
                      color="indigo"
                      onClick={() => router.push("/")}
                    >
                      ยกเลิก
                    </Button>
                  </div>

                  <div className="flex justify-end px-1"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOTPPage;
