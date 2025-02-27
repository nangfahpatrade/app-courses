"use client";
import { Button } from "@material-tailwind/react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { VscVmActive } from "react-icons/vsc";
import { MdAppShortcut } from "react-icons/md";


import Link from "next/link";
import { useLocale } from "next-intl";

export default function Page() {
  const locale = useLocale()

  return (
    <div className="">
      {/* Location 1 */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mx-auto container  py-10 px-6 lg:px-0 ">
        <section className="w-full ">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/95swkQaFKVU?si=Dp6duli8vtn-HF6Y&start=248&autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className=" rounded-md"
          ></iframe>
        </section>
        <section className="w-full ">
          <p className="text-gray-500">สอนเทรดมือใหม่ ให้เป็นมืออาชีพ </p>
          <h1 className="text-3xl lg:text-4xl mt-2 leading-relaxed">นางฟ้าพาเทรด สอนเทรดออนไลน์ </h1>
          <p className="mt-6 text-gray-600 ">
            <span className=" font-semibold text-indigo-900">
              บริษัทนางฟ้าพาเทรดเปิดมา 3 ปี
            </span>{" "}
            {""}
            ดำเนินการในด้านการเรียนการสอนเรื่องเทรดทองทองคำ มีครอสสอนมากมาย
            สอนแบบเจอตัว สอนแบบออนไลน์ จัดสัมนา
            และทำเว็บไซต์สอนในรูปแบบมหาวิทยาลัย
            ซึ่งมีวัตถุประสงค์เพื่อให้สะดวกกับทุกคนที่เข้ามาเรียนรู้
            ไม่ว่าจะเป็นคนที่มีพื้นฐานมาแล้วหรือไม่มีพื้นฐานเกี่ยวกับการเทรดเลยก็สามารถเรียนรู้ได้
          </p>

          <div className="flex flex-col lg:flex-row gap-5 py-6  ">
            <section className="w-full">
              <div className="flex flex-row gap-2 items-start">
                <div>
                  <FaCheckSquare size={18} className="text-indigo-800" />{" "}
                </div>
                <div>
                  <p className="font-semibold">
                    แนะนำการเทรดออนไลน์{" "}
                    <span className="text-gray-600">
                      สำหรับผู้ที่ต้องการพัฒนาทักษะการเทรดของตนเอง
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full">
              <div className="flex flex-row gap-2 items-start">
                <div>
                  <FaCheckSquare size={18} className="text-indigo-800" />{" "}
                </div>
                <div>
                  <p className="font-semibold">
                    กลยุทธ์การเทรดที่มืออาชีพใช้{" "}
                    <span className="text-gray-600">
                      ได้รับการสนับสนุนจากผู้เชี่ยวชาญด้านการเทรด
                      อย่างมีประสิทธิภาพ
                    </span>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className=" flex flex-col lg:flex-row gap-6 items-start lg:items-center mt-4">
            <Link href={`/${locale}/home/course`} >
            <Button className="text-sm bg-indigo-900">คอร์สเรียนทั้งหมด</Button>
            </Link>
            <div className="flex flex-row gap-3">
              <Link href="xxx">
                <FaFacebookSquare
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <FaLine
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <IoLogoYoutube
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <AiFillTikTok
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <FaPhoneSquareAlt
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Location 2 bg-gradient-to-b from-transparent via-indigo-50 to-purple-100 */}
      <div className="bg-gray-200 mt-2 lg:mt-8">
        <div className="   mx-auto container py-16 pb-24  px-6 lg:px-0 ">
          <p className="text-sm text-left lg:text-center text-gray-700">
            สอนเทรดออนไลน์ จาก zero ถึง Hero
          </p>
          <h2 className="mt-2 text-2xl lg:text-4xl text-left lg:text-center leading-relaxed">
            ข้อดีของการเรียนเทรดออนไลน์กับนางฟ้าพาเทรด
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center bg-red mt-8">
            <section className=" w-full lg:w-2/4 px-6 py-6 bg-white rounded-md shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <section className="w-1/7">
                  <FaChalkboardUser className="text-indigo-800" size={40} />
                </section>
                <section className="w-6/7">
                  <h3 className="text-base">พื้นฐานการเทรดสำหรับผู้เริ่มต้น</h3>
                  <p className="text-sm mt-2 text-gray-700">
                    แนะนำเกี่ยวกับการเทรดออนไลน์และการลงทุนประเภทต่าง ๆ เช่น
                    ฟอเร็กซ์, หุ้น, และสกุลเงินดิจิทัล
                    เพื่อให้เข้าใจพื้นฐานก่อนเริ่มต้นเทรด
                  </p>
                  <div className="mt-4 text-indigo-800 font-semibold">
                    <Link href={`/${locale}/home/activity`}>กิจกรรมล่าสุด</Link>
                  </div>
                </section>
              </div>
            </section>

            <section className="w-full lg:w-3/4 px-6 py-6 bg-white rounded-md shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <section className="w-1/6">
                  <VscVmActive className="text-indigo-800" size={70} />
                </section>
                <section className="w-5/6">
                  <h3 className="text-base">การวิเคราะห์ทางเทคนิค</h3>
                  <p className="text-sm mt-2 text-gray-700">
                    สอนการวิเคราะห์ทางเทคนิคเพื่ออ่านกราฟราคา
                    รวมถึงการใช้เครื่องมือและอินดิเคเตอร์ต่าง ๆ
                    และการวิเคราะห์ปัจจัยพื้นฐานเพื่อประเมินมูลค่าสินทรัพย์
                  </p>
                  <h3 className="text-base mt-4">
                    จัดการความเสี่ยงและการวางแผนการลงทุน
                  </h3>
                  <p className="text-sm mt-2 text-gray-700">
                    เรียนรู้วิธีจัดการความเสี่ยงในการเทรด เพื่อป้องกันการสูญเสีย
                    และการวางแผนการลงทุนอย่างมีระบบเพื่อเพิ่มโอกาสในการทำกำไร
                  </p>
                  <div className="mt-4 text-indigo-800 font-semibold">
                    <Link href={`/${locale}/home/activity`}>กิจกรรมล่าสุด</Link>
                  </div>
                </section>
              </div>
            </section>

            <section className="w-full lg:w-2/4 px-6 py-6 bg-white rounded-md shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <section className="w-1/7">
                  <MdAppShortcut className="text-indigo-800" size={40} />
                </section>
                <section className="w-6/7">
                  <h3 className="text-base">
                    ใช้แพลตฟอร์มเทรดออนไลน์
                  </h3>
                  <p className="text-sm mt-2 text-gray-700">
                    แนะนำวิธีการใช้แพลตฟอร์มการเทรด เช่น MetaTrader หรือ
                    TradingView และเครื่องมือเสริมต่าง ๆ
                    ที่ช่วยในการตัดสินใจลงทุน
                  </p>
                  <div className="mt-4 text-indigo-800 font-semibold">
                    <Link href={`/${locale}/home/activity`}>กิจกรรมล่าสุด</Link>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
