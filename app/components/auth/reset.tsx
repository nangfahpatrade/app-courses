"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Template from "./template";

const Reset: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [sendotp, setSendotp] = useState(0);
  const [sendCheck, setSendCheck] = useState(0);
  const [otp, setotp] = useState("");
  const [idOtp, setIdOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const handleReset = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      let data: any = { phone: phone }; // กำหนด data เริ่มต้น

      try {
        if (sendotp === 200 && sendCheck === 200) {
          // ถ้า sendotp และ sendCheck เท่ากับ 200 จะเป็นการเปลี่ยนรหัสผ่านใหม่
          data = {
            phone: phone,
            otp: otp,
            id: idOtp, // รหัส OTP ที่ใช้สำหรับการตรวจสอบ
            password: newPassword, // รหัสผ่านใหม่
          };
          console.log(data);

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/register/forget`,
            data
          );
          console.log(res);
          if (res.status === 200) {
            toast.success(res.data.message);
            router.push("/login");
          }
        } else if (sendotp === 200) {
          // ถ้า sendotp เท่ากับ 200 ตรวจสอบ OTP
          data = {
            phone: phone,
            otp: otp,
          };

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/otp/check`,
            data
          );
          console.log(res);

          if (res.status === 200) {
            setSendCheck(200); // เปลี่ยนสถานะหลังจาก OTP ตรวจสอบสำเร็จ
            setIdOtp(res.data); // เก็บ ID OTP
          }
        } else {
          // กรณีที่ยังไม่ส่ง OTP จะทำการขอ OTP
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/otp/add`,
            data
          );
          console.log(res);

          if (res.status === 200) {
            setSendotp(200); // เปลี่ยนสถานะหลังจากขอ OTP สำเร็จ
          }
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error?.response?.data.message);
      }
    },
    [phone, otp, sendotp, sendCheck, idOtp, newPassword]
  );

  console.log(idOtp);

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
                  DEV SRIWARARAK (ลืมรหัสผ่าน)
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
                  sendCheck === 200 ? (
                    <div>
                      <Input
                        type="password"
                        label="new password"
                        value={newPassword}
                        color="purple"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mb-4"
                        crossOrigin=""
                      />
                    </div>
                  ) : (
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
                  )
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
                      sendCheck === 200 ? (
                        <Button
                          type="submit"
                          className="w-full rounded-full"
                          color="deep-purple"
                          style={{
                            backgroundImage:
                              "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                          }}
                        >
                          เปลี่ยนรหัสผ่าน
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
                          ส่ง OTP
                        </Button>
                      )
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

export default Reset;
