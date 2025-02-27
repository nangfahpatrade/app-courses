// // ต้องการใช้งาน 2 ภาษา

// import { Inter } from "next/font/google";
// import "./globals.css";
// import RecoilProvider from "./recoilProvider"; // นำเข้า RecoilProvider

// const inter = Inter({ subsets: ["latin"] });

// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "ระบบคอร์สเรียน (เฉพาะธุรกิจ)",
//   description: "ระบบการเรียนการสอนออนไลน์ที่ออกแบบมาเฉพาะสำหรับธุรกิจ",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <RecoilProvider>{children}</RecoilProvider>
//       </body>
//     </html>
//   );
// }
