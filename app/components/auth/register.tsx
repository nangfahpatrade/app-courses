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


    const data = { username: user, password: password, name: name, email: email, phone: phone, status: 0 };
    console.log(data)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/register`,
        data
      );
      console.log(res)
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          router.push('/auth/login'); // Redirect to login page
        }, 1000)
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

      <div className="bg-white rounded-lg shadow-lg  flex flex-col md:flex-row rounded-l-3xl   w-full   ">
        <Template />

        <div className="w-full md:w-3/4 py-6  ">

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

          <div className="flex flex-col w-full items-center gap-3  justify-end  px-8 pb-8">

            <div className="flex flex-col w-full  ">
              <div>
                <Typography className=" font-medium text-3xl ">
                  สมัครสมาชิก
                </Typography>
              </div>
              <div>
                <Typography className=" mt-3 text-sm font-medium text-gray-500">
                  นางฟ้าพาเทรด Forex
                </Typography>
              </div>
            </div>

            <form onSubmit={handleRegister} className="w-full">

              <div className='flex flex-row gap-4 '>

                <div className='w-full'>
                  <Input
                    type="text"
                    label="User"
                    value={user}
                    color="indigo"
                    onChange={(e) => setUser(e.target.value)}
                    // required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div className='w-full'>
                  <Input
                    type="password"
                    label="Password"
                    value={password}
                    color="indigo"
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
              </div>

              <div className='py-3'>
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

              <div className='flex flex-col md:flex-row gap-4'>

                <div className='w-full'>
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
                <div className='w-full'>
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

              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  type="submit"
                  className="w-full rounded-lg"
                  color="indigo"
                // style={{
                //   backgroundImage:
                //     "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                // }}
                >
                  ลงทะเบียน
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



            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
