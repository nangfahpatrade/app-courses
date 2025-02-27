'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/navigation";
import LayoutContent from "../components/layout/layoutContent";
import CryptoJS from 'crypto-js';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();

    
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

    const checkAuthorization = useCallback(() => {
        const token = parseInt(decryptData(localStorage.getItem("Token") || ""));
    const loginStatus = parseInt(decryptData(localStorage.getItem("Status") || ""));
        if (!token && loginStatus !== 2) {
            router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
        } else {
            setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        checkAuthorization();
    }, [checkAuthorization]);

    if (!isAuthorized) {
        return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
    }

    return <LayoutContent>{children}</LayoutContent>;
};

export default Layout;
