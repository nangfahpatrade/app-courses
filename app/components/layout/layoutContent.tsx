// components/LayoutContent.tsx
import React, { useState, ReactNode, useEffect } from "react";
import dynamic from 'next/dynamic';
import AppbarComponent from "./appbar";
import { useMediaQuery } from "react-responsive";
import CryptoJS from "crypto-js";

const Sidebar = dynamic(() => import("./sidebar"), { ssr: false });

interface LayoutContentProps {
  children: ReactNode;

}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const loginStatus = parseInt(decryptData(localStorage.getItem("Status") || ""));;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // const isSmallScreenQuery = useMediaQuery({ query: "(max-width: 751px)" });
  const [menuCount, setMenuCount] = useState(false);


  const isSmallScreenQuery = useMediaQuery({
    query: loginStatus === 1 ? "(max-width: 1200px)" : "(max-width: 751px)"
  });

  useEffect(() => {
    setIsSmallScreen(isSmallScreenQuery);
  }, [isSmallScreenQuery]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    //   const [menuCount, setMenuCount] = useState(false)
    // และต้องการส่ง setMenuCount={setMenuCount} ไปที่ question component ผ่าน children เพื่อทำให้เป็น true

// md:overflow-hidden
    <div className="flex h-screen overflow-auto    bg-[#f6f7fc]">
      {!isSmallScreen && <Sidebar />}

      {isSmallScreen && isDrawerOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50" onClick={handleDrawerToggle}></div>
      )}
      <AppbarComponent
        isSmallScreen={isSmallScreen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {isSmallScreen && (
        <div className={` fixed inset-y-0 left-0 z-30 w-64 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <Sidebar setDrawerOpen={setDrawerOpen}  />
        </div>
      )}

      <div className="flex-1 flex flex-col  ">
        <div className="mr-3 mt-[75px] px-3 w-screen lg:w-full  ">
          {children}


        </div>
      </div>
    </div>
  );
};

export default LayoutContent;
