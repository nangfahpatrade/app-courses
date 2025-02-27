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

  const handleLogin = async (id: number, otp: string) => {
    try {
      const data = { id, otp };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/login/otp`,
        data
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        const token = res.data.token;
        const decoded = jwtDecode<MyJwtPayload>(token);

        if (token && decoded) {
          // เข้ารหัสและเก็บข้อมูล
          localStorage.setItem("Token", encryptData(token));
          localStorage.setItem(
            "Status",
            encryptData(decoded.status.toString())
          );
          sessionStorage.setItem("login", encryptData(decoded.username));
          localStorage.setItem("Id", encryptData(decoded.id.toString()));

          let redirectPath = "/";
          const status = parseInt(
            decryptData(localStorage.getItem("Status") || "")
          );

          // ตรวจสอบสถานะเพื่อเปลี่ยนเส้นทาง
          if (status === 2) {
            redirectPath = "/super";
          } else if (status === 1) {
            redirectPath = "/admin";
          } else if (status === 0) {
            redirectPath = "/user/shopcourse";
          }

          setTimeout(() => {
            router.push(redirectPath);
          }, 1500);
        }
      }
    } catch (error) {
      console.log(error);
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
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error?.response?.data.message);
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
              สมัครสมาชิกเพื่อซื้อคอร์สเรียน
            </p>
            <button
              className=" text-[10px]  border border-gray-500 px-4 py-2 rounded-full"
              onClick={() => router.push("/register")}
            >
              {" "}
              สมัครสมาชิก
            </button>
          </div>
          <div className="flex flex-col  gap-6 py-6 md:py-10 md:pb-14 px-8 md:px-16  ">
            <div className="flex flex-col w-full  ">
              <div>
                <Typography className=" font-medium text-3xl ">
                  DEV SRIWARARAK (OTP)
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
                      color="purple"
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
                      color="purple"
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
                        className="w-full rounded-full"
                        color="deep-purple"
                        style={{
                          backgroundImage:
                            "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                        }}
                      >
                        เข้าสู่ระบบ
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full rounded-full"
                        color="deep-purple"
                        style={{
                          backgroundImage:
                            "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                        }}
                      >
                        ขอรับ OTP
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      className="w-full rounded-full"
                      color="deep-purple"
                      onClick={() => router.push("/")}
                    >
                      ยกเลิก
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-4">
                    <hr className="w-28 h-px my-8  bg-gray-300 border-0 dark:bg-gray-500"></hr>
                    <p className="text-gray-500 text-center w-16 text-sm">
                      ตัวเลือกอื่น
                    </p>
                    <hr className="w-28 h-px my-8 bg-gray-300 border-0 dark:bg-gray-600"></hr>
                  </div>

                  <div className="flex w-full  flex-row  gap-0 justify-center items-center     ">
                    <div className="w-2/2 lg:w-2/4 ">
                      <p
                        className=" text-center text-purple-300  hover:bg-purple-50 rounded-lg px-2   py-1 cursor-pointer "
                        onClick={() => router.push("/login")}
                      >
                        เข้าสู่ระบบแบบปกติ
                      </p>
                    </div>
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
