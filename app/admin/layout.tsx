// // layouts/AdminLayout.tsx
// "use client";
// import { useEffect, useState, ReactNode, useCallback } from "react";

// import { useRouter } from "next/navigation";
// import LayoutContent from "@/app/components/layout/layoutContent";
// import CryptoJS from "crypto-js";
// import { ThemeProvider } from "@material-tailwind/react";


// interface AdminLayoutProps {
//   children: ReactNode;
// }
// const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
//   const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
//   const router = useRouter();

//   const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

//   const decryptData = (ciphertext: string) => {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   };

//   const checkAuthorization = useCallback(() => {
//     const token = parseInt(decryptData(localStorage.getItem("Token") || ""));
//     const loginStatus = parseInt(decryptData(localStorage.getItem("Status") || ""));
//     if ((!token && loginStatus === 1) || loginStatus === 2) {
//       setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
//     } else {
//       router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [router]);

//   useEffect(() => {
//     checkAuthorization();
//   }, [checkAuthorization]);

//   if (!isAuthorized) {
//     return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
//   }
//   return (
//     // <ThemeProvider value={theme}>
//       <LayoutContent>{children}</LayoutContent>
//     // </ThemeProvider>
//   );
// };

// export default AdminLayout;

// layouts/AdminLayout.tsx
"use client";
import { useEffect, useState, ReactNode, useCallback } from "react";

import { useRouter } from "next/navigation";
import LayoutContent from "@/app/components/layout/layoutContent";
import CryptoJS from "crypto-js";
import { ThemeProvider } from "@material-tailwind/react";
import { useAuth } from "../hooks/userAuth";
import Loading from "../components/auth/Loading";


interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isLoading, isAuthorized } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthorized) {
    return (
      // <ThemeProvider value={theme}>
      <LayoutContent>{children}</LayoutContent>
      // </ThemeProvider>
    );
  }

};

export default AdminLayout;

