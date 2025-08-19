
"use client";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue } from "recoil";
import { userIdState, numberState } from "@/store/store"; // นำเข้า atom ที่สร้างไว้
import Template from "./template";
import Cookies from 'js-cookie';
import { ErrorAlert } from "@/app/utils/apiConfig";

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

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const userId = useRecoilValue(userIdState);
  const number = useRecoilValue(numberState);

  // const handleLogin = useCallback(
  //   async (e: FormEvent) => {
  //     e.preventDefault();

  //     const data = { username: user, password: password };

  //     try {
  //       const res = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API}/api/login`,
  //         data
  //       );

  //       const token = res.data.token;
  //       const decoded = jwtDecode<MyJwtPayload>(token);

  //       if (token && decoded) {
  //         toast.success("เข้าสู่ระบบสำเร็จ");
  //         // Save encrypted data
  //         localStorage.setItem("Token", encryptData(token));
  //         localStorage.setItem("Status", encryptData(decoded.status.toString()));
  //         localStorage.setItem("Id", encryptData(decoded.id.toString()));
  //         sessionStorage.setItem("login", encryptData(decoded.username));

  //         let redirectPath = "/";

  //         const status = parseInt(decryptData(localStorage.getItem("Status") || ""));
  //         Cookies.set('authToken', token, { expires: 1, secure: true });
  //         Cookies.set('status', String(status), { expires: 1, secure: true });

  //                  // if (status === 2) {
  //         //   redirectPath = "/super";
  //         // } else if (status === 1) {
  //         //   redirectPath = "/admin";
  //         // } else if (status === 0) {
  //         //   if (userId) {
  //         //     if (number === "0") {
  //         //       redirectPath = `/user/study/${userId}`;
  //         //     } else if (number === "1") {
  //         //       redirectPath = `/user/buycourse/${userId}`;
  //         //     } else {
  //         //       console.error("Unexpected number value:", number);
  //         //     }
  //         //   } else {
  //         //     redirectPath = "/user/shopcourse";
  //         //   }
  //         // }

  //         // console.log("Status:", status);
  //         // console.log("Redirect Path:", redirectPath);
  //         // console.log("User ID:", userId);
  //         // console.log("Number:", number);

  //         // router.push(redirectPath);

  //       } else {
  //         toast.error("Error: Token not found");
  //       }
  //     } catch (err) {
  //       const error = err as { response: { data: { message: string } } };
  //       toast.error(error?.response?.data.message);
  //     }
  //   },
  //   [user, password, router, userId, number]
  // );

  const handleLogin = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const data = { username: user, password: password };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/login`, data
      );

      const token = res.data.token;
      if (!token) {
        toast.error("เกิดข้อผิดพลาด: ไม่พบ Token ")
        return
      }

      const decoded = jwtDecode<MyJwtPayload>(token);
      toast.success("เข้าสู่ระบบสำเร็จ ");

      const status = decoded.status.toString();
      Cookies.set('authToken', token, { expires: 1, secure: true, sameSite: 'strict' });
      Cookies.set('status', status, { expires: 1, secure: true, sameSite: 'strict' });

      //   console.log({ status });
      //   let redirectPath = "/";

      //   switch (status) {
      //     case '0':
      //       redirectPath = '/user/shopcourse';
      //       break;
      //     case '1':
      //       redirectPath = '/admin';
      //       break;

      //     case '2':
      //       redirectPath = '/super';
      //       break;

      //     default:
      //       redirectPath = '/';
      //       break;
      //   }

      //  setTimeout(() => {
      //    window.location.href = redirectPath;
      //  }, 3000);

      window.location.reload();

    } catch (error) {

      ErrorAlert(error) 

    }

  }, [user, password, router])





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
              onClick={() => router.push("/auth/register")}
            >
              {" "}
              สมัครสมาชิก
            </button>
          </div>
          <div className="flex flex-col  gap-6 py-6 md:py-10 md:pb-14 px-8 md:px-16  ">
            <div className="flex flex-col w-full  ">
              <div>
                <Typography className=" font-medium text-3xl ">
                  เข้าสู่ระบบ
                </Typography>
              </div>
              <div>
                <Typography className=" mt-3 text-sm font-medium text-gray-500">
                  นางฟ้าพาเทรด Forex
                </Typography>
              </div>
            </div>

            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-6">
                <div>
                  <Input
                    type="text"
                    label="Username"
                    value={user}
                    color="purple"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    label="Password"
                    value={password}
                    color="purple"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="w-full rounded-lg"
                      color="indigo"

                    >
                      เข้าสู่ระบบ
                    </Button>
                    <Button
                      variant="outlined"
                      className="w-full rounded-lg"
                      color="indigo"
                      onClick={() => router.push("/")}
                    >
                      ยกเลิก
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-4">
                    <hr className="w-28 h-px my-8  bg-gray-300 border-0 dark:bg-gray-500"></hr>
                    <p className="text-gray-500 text-center w-16 text-sm">ตัวเลือกอื่น</p>
                    <hr className="w-28 h-px my-8 bg-gray-300 border-0 dark:bg-gray-600"></hr>
                  </div>

                  <div className="flex w-full  flex-row  gap-6 justify-center items-center     ">
                    <div className="w-fit  ">
                      <p
                        className=" text-center text-indigo-300  hover:bg-indigo-50 rounded-lg   py-1 px-3 cursor-pointer "
                        onClick={() => router.push("/auth/loginopt")}
                      >
                        เข้าสู่ระบบ OTP
                      </p>
                    </div>

                    <div className="w-fit  ">
                      <p
                        className=" text-center text-indigo-300 hover:bg-indigo-50 rounded-lg  py-1 px-3  cursor-pointer "
                        onClick={() => router.push("/auth/reset")}
                      >
                        ลืมรหัสผ่าน{" "}
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

export default LoginPage;
