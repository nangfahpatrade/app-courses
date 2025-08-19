"use client";
import { Button } from "@material-tailwind/react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaChalkboardTeacher, FaChartLine, FaCheckSquare, FaChevronRight } from "react-icons/fa";
import { FaApple, FaGooglePlay, FaCheck } from "react-icons/fa";

export default function Page() {
  const locale = useLocale()
  return (
    <div className="">
      <div className="  relative  overflow-hidden">
        <div className="absolute inset-0 z-0   flex justify-start items-start opacity-5 pointer-events-none">
          <Image
          width={500}
          height={500}
            src="/images/home/broker_wallpaper_2.png"
            alt="สมัครสมาชิกเครื่องมือเทรดเดอร์"
            className="w-full"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center mx-auto container px-6 md:px-36 py-14 lg:py-20">
          <section className="w-full md:w-7/12 ">
            <h1 className="text-2xl lg:text-3xl  leading-relaxed">
              สมัครสมาชิกเครื่องมือเทรดเดอร์
            </h1>
            <p className="mt-2 text-lg text-gray-700">แบบที่มืออาชีพใช้กัน HFM</p>


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
              <Button className="text-base bg-indigo-900" size="sm">
                สมัครโบรกเกอร์
              </Button>
              <Button className="text-base  bg-yellow-800" size="sm">
                <Link href="/home/course">คอร์สเรียนทั้งหมด</Link>
              </Button>
            </div>
          </section>

          <section className="w-full md:w-5/12 ">
            <div className="flex flex-col gap-4 items-start justify-center mt-8 lg:mt-0 border border-gray-300 rounded-md p-8 shadow-xl bg-gray-100 ">
              <section className="w-full  mt-6 lg:mt-0 ">
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
              <section className="w-full  flex justify-center gap-4   ">
                <Image
                  src="/broker_2.webp"
                  width={900}
                  height={900}
                  alt=""
                  loading="lazy"
                  className="w-60 lg:w-48  rounded-md  "
                />

                <Image
                  src="/broker_2.webp"
                  width={900}
                  height={900}
                  alt=""
                  loading="lazy"
                  className="w-60 lg:w-48  rounded-md  "
                />
              </section>
            </div>
          </section>
        </div>


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
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <div className="w-full md:w-3/12">
                  <FaChartLine size={100} color="indigo" className="text-green-700 w-full" />
                </div>
                <div className="w-full md:w-9/12">
                  <h3 className="text-xl">ทำไมถึงเลือกเทรดกับ HFM?</h3>
                  <p className="text-gray-700 mt-2">
                    มีจุดเด่นหลายประการที่ทำให้ผู้ลงทุนเลือกใช้บริการ
                    เหมาะสมกับทั้งมือใหม่และนักเทรดมืออาชีพ
                    อีกทั้งยังมีการสนับสนุนลูกค้าอย่างมืออาชีพตลอด 24 ชั่วโมง
                  </p>
                </div>
              </div>

              <ul className="mt-6 flex flex-col gap-2">
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-indigo-500" />
                  <p>ค่าธรรมเนียมต่ำ เลเวอเรจที่สูง </p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-indigo-500" />
                  <p>อัพเดทเครื่องมือเทรดที่ทันสมัย</p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-indigo-500" />
                  <p>เครื่องมือจัดการความเสี่ยง ป้องกันการขาดทุน </p>
                </li>
              </ul>
              <div className="mt-4 flex flex-row gap-2 justify-end items-center">
                <Link href="/" className="text-gray-900 font-semibold text-sm">
                  <Button color="indigo" size="sm"> หน้าหลัก</Button>
                </Link>

              </div>
            </section>

            <section className="w-full bg-gray-300 rounded-lg px-6 py-8">
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <div className="w-full md:w-3/12">
                  <FaChalkboardTeacher size={100} color="indigo" className="text-green-700 w-full" />
                </div>
                <div className="w-full md:w-9/12">
                  <h3 className="text-xl">เทคนิคและกลยุทธ์การเทรดแนะนำสำหรับมือใหม่</h3>
                  <p className="text-gray-700 mt-2">
                    มีคอร์สเรียนออนไลน์ที่ช่วยให้นักลงทุนมือใหม่ได้เรียนรู้กลยุทธ์การเทรดแบบมืออาชีพ
                    เทคนิคการวิเคราะห์กราฟและการคาดการณ์แนวโน้มตลาด
                  </p>
                </div>
              </div>


              <ul className="mt-6 flex flex-col gap-2">
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-indigo-500" />
                  <p>มีบทเรียนช่วยให้นักลงทุนมือใหม่ได้เรียนรู้กลยุทธ์การเทรดเบื้องต้น</p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-indigo-500" />
                  <p>เทรดได้หลายแพลตฟอร์ม เช่น คู่สกุลเงินฟอเร็กซ์ ดัชนีหุ้นต่างประเทศเป็นต้น </p>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <FaCheck size={16} className="text-indigo-500" />
                  <p>ช่วยให้นักลงทุนมีตัวเลือกที่มากมายในการสร้างผลกำไร</p>
                </li>
              </ul>
              <div className="mt-4 flex flex-row gap-2 justify-end items-center">
                <Link href={`/${locale}/home/course`} className="text-gray-900 font-semibold text-sm">
                  <Button color="indigo" size="sm"> คอร์สเรียนทั้งหมด</Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
