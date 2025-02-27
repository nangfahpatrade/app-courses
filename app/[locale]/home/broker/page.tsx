"use client";
import { Button } from "@material-tailwind/react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaChevronRight } from "react-icons/fa";
import { FaApple, FaGooglePlay, FaCheck } from "react-icons/fa";

export default function Page() {
  const locale = useLocale()
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-3 items-end mx-auto container px-6 md:px-20 py-14 lg:py-20">
        <section className="w-full">
          <h1 className="text-2xl lg:text-3xl  leading-relaxed">
            สมัครสมาชิกเครื่องมือเทรดเดอร์แบบที่มืออาชีพใช้กัน HFM
          </h1>
          

          <ul className="text-indigo-600 mt-6 flex flex-col gap-2">
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p className="text-base lg:text-xl">เลเวอเรจ 1:2000</p>
            </li>
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p className="text-base lg:text-xl">การดำเนินการที่รวดเร็วเป็นพิเศษ</p>
            </li>
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p className="text-base lg:text-xl">ไม่มีค่าสวอป</p>
            </li>
          </ul>

          <div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start items-center mt-8">
            <Button className="text-base bg-indigo-900" size="md">
              สมัครโบรกเกอร์
            </Button>
            <Button className="text-base  bg-yellow-800" size="md">
              <Link href="/home/course">คอร์สเรียนทั้งหมด</Link>
            </Button>
          </div>
        </section>

        <section className="w-full ">
          <div className="flex flex-col lg:flex-row gap-4 items-end justify-center mt-8 lg:mt-0 ">
            <section className="w-full lg:w-1/3 flex justify-center   ">
              <Image
                src="/broker_2.webp"
                width={900}
                height={900}
                alt=""
                loading="lazy"
                className="w-60 lg:w-48  rounded-md  "
              />
            </section>
            <section className="w-full lg:w-2/3 mt-6 lg:mt-0 ">
              <h2 className="text-2xl">Install Our Apps</h2>
              <p className="text-gray-700 mt-2">install from the link</p>

              <div className="mt-4 flex flex-row gap-2">
                <button className=" w-full flex flex-row justify-center items-center gap-2 border-2 border-whtite bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-xl">
                  <FaApple size={23} /> <p>App Store</p>
                </button>
                <button className="w-full flex flex-row justify-center items-center gap-2 border-2 border-whtite bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-xl">
                  <FaGooglePlay size={23} /> <p>Google Play</p>
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* Location - 2 */}

      <div className=" bg-gray-200">
        <div className=" mx-auto container px-6 md:px-20 py-16 lg:py-20">
          <h2 className="text-2xl leading-relaxed lg:text-3xl text-left lg:text-center">
            HFM (HotForex Markets) เป็นโบรกเกอร์การเทรดออนไลน์
          </h2>
          <p className="mt-3 text-gray-700 tet-sm text-left lg:text-center">
            ให้บริการด้านการเทรดสินทรัพย์ต่าง ๆ เช่น ฟอเร็กซ์, สินค้าโภคภัณฑ์,
            ดัชนี, หุ้น, และสกุลเงินดิจิทัล
            โบรกเกอร์นี้ได้รับความนิยมในกลุ่มนักลงทุนทั่วโลก
          </p>

          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-10">
            <section className="w-full bg-gray-300 rounded-lg px-6 py-8">
              <h3 className="text-xl">ทำไมถึงเลือกเทรดกับ HFM?</h3>
              <p className="text-gray-700 mt-2">
                มีจุดเด่นหลายประการที่ทำให้ผู้ลงทุนเลือกใช้บริการ
                เหมาะสมกับทั้งมือใหม่และนักเทรดมืออาชีพ
                อีกทั้งยังมีการสนับสนุนลูกค้าอย่างมืออาชีพตลอด 24 ชั่วโมง
              </p>

              <ul className="mt-6 flex flex-col gap-2">
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-green-700" />
                  <p>ค่าธรรมเนียมต่ำ เลเวอเรจที่สูง </p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-green-700" />
                  <p>อัพเดทเครื่องมือเทรดที่ทันสมัย</p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-green-700" />
                  <p>เครื่องมือจัดการความเสี่ยง ป้องกันการขาดทุน </p>
                </li>
              </ul>
              <div className="mt-4 flex flex-row gap-2 justify-end items-center">
                <Link href="/" className="text-gray-900 font-semibold text-sm">
                  หน้าหลัก
                </Link>
                <FaChevronRight
                  size={20}
                  className="bg-gray-200 p-1 rounded-full"
                />
              </div>
            </section>

            <section className="w-full bg-gray-300 rounded-lg px-6 py-8">
              <h3 className="text-xl">
                เทคนิคและกลยุทธ์การเทรดที่แนะนำสำหรับมือใหม่
              </h3>
              <p className="text-gray-700 mt-2">
                มีคอร์สเรียนออนไลน์ที่ช่วยให้นักลงทุนมือใหม่ได้เรียนรู้กลยุทธ์การเทรดแบบมืออาชีพ
                เทคนิคการวิเคราะห์กราฟและการคาดการณ์แนวโน้มตลาด
              </p>
          
              <ul className="mt-6 flex flex-col gap-2">
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-green-700" />
                  <p>มีบทเรียนช่วยให้นักลงทุนมือใหม่ได้เรียนรู้กลยุทธ์การเทรดเบื้องต้น</p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-green-700" />
                  <p>เทรดได้หลายแพลตฟอร์ม เช่น คู่สกุลเงินฟอเร็กซ์ ดัชนีหุ้นต่างประเทศเป็นต้น </p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-green-700" />
                  <p>ช่วยให้นักลงทุนมีตัวเลือกที่มากมายในการสร้างผลกำไร</p>
                </li>
              </ul>
              <div className="mt-4 flex flex-row gap-2 justify-end items-center">
                <Link href={`/${locale}/home/course`} className="text-gray-900 font-semibold text-sm">
                  คอร์สเรียนทั้งหมด
                </Link>
                <FaChevronRight
                  size={20}
                  className="bg-gray-200 p-1 rounded-full"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
