import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Part8 = () => {
  const t = useTranslations("HomePage.section_7");

  return (
    <footer>
      <div className="bg-[#042044] text-white py-14 ">
        <div className="container mx-auto  grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:gap-8 ">
          {/* โลโก้และที่อยู่ */}
          <div className="flex flex-col space-y-4  ">
            {/* <h2 className="text-xl font-semibold">Nang Fah Pa Trade</h2>
            <span className="text-[#DF9E10]">If i want it ,i get it.</span> */}
            <div className="flex flex-col gap-5 items-center">
              <Image
                src="/logo_3.png"
                alt="FAQ Image"
                width={500}
                height={500}
                className=" rounded-lg w-48   "
              />
              <div className=" text-center ">
                <p className="text-[16px] ">{t('address')}</p>
              </div>
            </div>
          </div>

          {/* ลิงก์เมนู */}
          <div className="flex gap-20 md:mt-8 justify-center 2xl:mt-6 ">
            <div className="flex flex-col space-y-3">
              <ul className="space-y-1">
                <li className="text-[16px]  text-nowrap">
                  <Link href="/home/course" className="hover:text-gray-500">
                    คอร์สเรียนทั้งหมด
                  </Link>
                </li>
                <li className="text-[16px]  text-nowrap">
                  <Link href="/home/broker" className="hover:text-gray-500">
                    โบรกเกอร์
                  </Link>
                </li>
                <li className="text-[16px]  text-nowrap">
                  <Link href="/home/ebook" className="hover:text-gray-500">
                    Ebook
                  </Link>
                </li>
                <li className="text-[16px]  text-nowrap">
                  <Link href="/home/about" className="hover:text-gray-500">
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li className="text-[16px] ">
                  <Link href="/home/portfolio" className="hover:text-gray-500">
                    ผลงาน
                  </Link>
                </li>
                <li className="text-[16px]  text-nowrap">
                  <Link href="/home/activity" className="hover:text-gray-500">
                    กิจกรรมทั้งหมด
                  </Link>
                </li>
                <li className="text-[16px] ">
                  <Link href="/home/contact" className="hover:text-gray-500">
                    ติดต่อเรา
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <ul className="space-y-1">
                <li className="text-[16px] text-nowrap">
                  <Link href="/home/bycourse" className="hover:text-gray-500">
                    วิธีการซื้อคอร์สเรียน
                  </Link>
                </li>
                <li className="text-[16px] ">
                  <Link href="/" className="hover:text-gray-500">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ไอคอนโซเชียลมีเดีย */}
          <div className="flex space-x-5 items-center justify-center">
            <a href="#">
              <Image
                src="/icon-youtube.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-email.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-call.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a
              target="_bank"
              href="https://www.facebook.com/people/Nang-Fah-Pa-Trade-%E0%B8%99%E0%B8%B2%E0%B8%87%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%9E%E0%B8%B2%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94Forex/100047611106918/"
            >
              <Image
                src="/icon-fb.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a
              target="_bank"
              href="https://www.tiktok.com/@nangfahpatrade88888"
            >
              <Image
                src="/icon-tiktok.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a target="_bank" href="https://line.me/R/ti/p/@nangfahpatrade">
              <Image
                src="/icon-line.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#07172D]  py-4 text-white     ">
        <div className="container mx-auto px-6 lg:px-60 flex flex-row items-center justify-between gap-2- lg:gap-4">
          <div className=" w-3/5 lg:w-2/3">
            <p className="  text-[12px] md:text-[16px]  ">
              Copyright © 2024 all rights reserved. | Nang Fah Pa Trade
            </p>
          </div>
          <div className=" w-2/5 lg:w-1/3  bg-[#df9310] flex py-2 justify-center -mb-6 lg:-mb-3  rounded-t-xl ">
            <Image
              src="/icon-chat.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
              alt="youtube"
              width={200}
              height={200}
              className=" w-6 md:w-[30px] h-6 md:h-[30px] "
            />
            <p className="  px-2 text-[12px] md:text-[18px] font-[300] text-nowrap  ">
              สอบถามเพิ่มเติม
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Part8;
