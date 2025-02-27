// pages/register.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import Template from './template';

const Register = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();


        const data = { username: user, password: password, name:name ,email: email , phone:phone ,status: 0 };
        console.log(data)

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/register`,
                data
            );
            console.log(res)
            if (res?.status === 200) {
                toast.success(res?.data?.message);
                setTimeout(()=> {
                    router.push('/login'); // Redirect to login page
                },1000)
            }
        } catch (err) {
          console.log(err)
            const error = err as { response: { data: { message: string } } };
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    };

    return (
      <div className="bg-gray-200 h-screen flex   justify-center items-center  px-10 md:px-64">
         <ToastContainer autoClose={3000} theme="colored" />
      
      <div className="bg-white rounded-lg shadow-lg  flex flex-col md:flex-row  lg:h-[89%]   ">
        <Template/>

        <div className="w-full md:w-3/4 ">
        <div className="flex flex-col w-full items-center gap-3  justify-end py-4 px-8">
            <div className="flex flex-col w-full justify-center items-center">
              <div>
                <Typography className=" font-medium ">
                  ลงทะเบียนผู้ใช้
                </Typography>
              </div>
              <div className=" w-[90%] h-[1px] mt-2 bg-gray-300">{""}</div>
              <div>
                <Typography className="text-gray-600 mt-3 font-medium">
                  ระบบห้องเรียน Online
                </Typography>
              </div>
            </div>
            <form onSubmit={handleRegister} className="w-full">
              <div className="flex flex-col gap-5">
                <div>
                  <Input
                    type="text"
                    label="User"
                    value={user}
                    color="purple"
                    onChange={(e) => setUser(e.target.value)}
                    // required
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
                    // required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="name"
                    value={name}
                    color="purple"
                    onChange={(e) => setName(e.target.value)}
                    // required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    label="email"
                    value={email}
                    color="purple"
                    onChange={(e) => setEmail(e.target.value)}
                    // required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    label="Phone"
                    value={phone}
                    maxLength={10}
                    color="purple"
                    onChange={(e) => setPhone(e.target.value)}
                    // required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="w-full rounded-full"
                      color="purple"
                      style={{
                        backgroundImage:
                          "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                      }}
                    >
                      ลงทะเบียน
                    </Button>
                    <Button
                      variant="outlined"
                      className="w-full rounded-full"
                      color="purple"
                      onClick={() => router.push("/")}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                  <div className="flex justify-between px-1 mt-3">
                    <div
                      className="mt-3 underline  justify-end cursor-pointer"
                      onClick={() => router.push("/login")}
                    >
                      <Typography  className="text-purple-500 font-semibold text-xs">
                        กลับไปหน้า login
                      </Typography>
                    </div>
                    {/* <div className="mt-3 underline justify-end cursor-pointer">
                      <Typography className='text-xs'>ลืมรหัสผ่าน</Typography>
                    </div> */}
                  </div>
                </div>
              </div>
            </form>
          </div>


        </div>

      </div>
      
    </div>
    );
};

export default Register;
