import Image from "next/image";
import React from "react";

const data = [
  {
    id: 0,
    title: "คอร์สเรียนเทรดออนไลน์เหมาะสำหรับผู้ที่ไม่มีพื้นฐานหรือไม่ ?",
    dec: "คอร์สเรียนเทรดออนไลน์หลายหลักสูตรถูกออกแบบมาเพื่อให้ผู้ที่ไม่มีพื้นฐานสามารถเริ่มต้นได้ โดยจะสอนตั้งแต่พื้นฐานการเทรด การวิเคราะห์ตลาด ไปจนถึงการใช้เครื่องมือเทรดต่างๆ นอกจากนี้ยังมีคอร์สขั้นสูงสำหรับผู้ที่มีประสบการณ์แล้วด้วย",
  },
  {
    id: 1,
    title: "หลังจากเรียนจบคอร์สแล้วจะสามารถเทรดเองได้ทันทีหรือไม่ ?",
    dec: "เมื่อจบคอร์สเรียนเทรดออนไลน์แล้ว ผู้เรียนจะมีความรู้พื้นฐานที่จำเป็นในการเริ่มต้นเทรด อย่างไรก็ตาม การฝึกฝนเป็นสิ่งสำคัญ การทดลองเทรดด้วยบัญชีเดโมหรือเริ่มต้นด้วยจำนวนเงินที่น้อยจะช่วยเสริมทักษะและประสบการณ์ในการเทรด",
  },
  {
    id: 2,
    title: "คอร์สเรียนเทรดออนไลน์มีใบรับรองหรือไม่ ?",
    dec: "คอร์สเรียนเทรดออนไลน์บางแห่งจะมีใบรับรองเมื่อคุณเรียนจบหลักสูตร ซึ่งสามารถใช้เป็นการยืนยันความรู้และความสามารถในการเทรดได้ ใบรับรองนี้อาจมีประโยชน์ในการสร้างความน่าเชื่อถือเมื่อสมัครงานหรือเริ่มต้นการเทรดอย่างจริงจัง",
  },
];

const Part7 = () => {
  return (
    <div
      className=" py-16 md:py-32  "
      style={{
        background: "linear-gradient(89.98deg, #151519 12.72%, #232325 89.74%)",
      }}
    >
      <div className="px-10 lg:px-18  mx-auto container flex flex-col lg:flex-row 2xl:gap-24 items-center">
        {/* ภาพทางด้านซ้าย  */}
        <div className="w-full 2xl:w-[450px]">
          <Image
            src="/banner-faq.jpg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
            alt="FAQ Image"
            width={500}
            height={500}
            className="w-full rounded-lg lg:w-[550px] xl:w-[650px] 2xl:w-full"
          />
        </div>

        {/* กล่องข้อความด้านขวา */}
        <div className="w-full lg:w-7/12  pt-5 space-y-6">
          <h2 className="text-white text-2xl md:text-[50px]   font-[700] mb-6">
            FAQ
            <span className="text-white text-2xl  md:text-[30px] font-[700]   ps-6">
              คำถามที่พบบ่อย เรื่องคอร์สเรียนเทรดออนไลน์
            </span>
          </h2>

          {/* <div className="bg-[#F3F4F6] rounded-lg p-4 mb-4 2xl:mr-52">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer">
                <h3 className="text-[#093165] font-[700] text-[24px]">
                  มีคอร์สสำหรับทดลองเรียนหรือไม่?
                </h3>
                <span className="text-2xl font-bold text-[#093165] group-open:hidden">
                  <Image
                    src="/icon-plus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                    alt="บวก"
                    width={500}
                    height={500}
                    className=" w-full h-auto "
                  />
                </span>
                <span className="text-2xl font-bold text-[#093165] hidden group-open:inline">
                  <Image
                    src="/icon-minus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                    alt="ลบ"
                    width={500}
                    height={500}
                    className=" w-full h-auto "
                  />
                </span>
              </summary>
              <p className="text-[#2c2c2c] text-[16px] font-[400] mt-2">
                เรามีคอร์สสอนเทรดพื้นฐานให้คุณทดลองเรียนฟรี
                ให้คุณกล้าที่จะเริ่มต้นครั้งใหม่ ไปกับเรา สามารถเริ่มเรียนได้ฟรี
                ไม่มีค่าใช้จ่ายเพิ่มเติม
              </p>
            </details>
          </div> */}

          {/* FAQ Item */}
          <div>
            {data.map((item, index) => (
              <div className="bg-[#F3F4F6] rounded-lg p-4 mb-4 2xl:mr-52" key={item.id}>
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer ">

                    <section className="w-5/6">
                      <h3 className="text-[#093165] font-[700] text-base md:text-lg">
                        {item.title}
                      </h3>
                    </section>

                    <section className="w-1/6  flex justify-end">
                      <span className="text-2xl font-bold text-[#093165] group-open:hidden">
                        <Image
                          src="/icon-plus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                          alt="บวก"
                          width={100}
                          height={100}
                          className=" w-10 h-auto "
                        />
                      </span>
                      <span className="text-2xl font-bold text-[#093165] hidden group-open:inline">
                        <Image
                          src="/icon-minus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                          alt="ลบ"
                          width={100}
                          height={100}
                          className=" w-10 h-auto "
                        />
                      </span>
                    </section>
                  </summary>

                  <p className="text-[#2c2c2c] text-sm  md:text-base font-[400] mt-6">
                    {item.dec}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part7;
