import Image from "next/image";
import CarouselBanner from "../carouselbanner";

const Banner: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/top-banner-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" lg:h-[650px]   "
    >
      <div className="flex flex-col  2xl:px-[300px] pt-[80px]  h-full">
        <div>
          <h1 className=" text-white text-[80px] text-center lg:text-start   font-[700]">
            คอร์สสอนเทรด
          </h1>
        </div>
        <div>
          <h1 className=" text-[60px] 2xl:ps-[130px] font-[700] text-[#DF9E10] text-center lg:text-start ">
            สู่นักเทรดมืออาชีพ
          </h1>
        </div>

        <div className="mt-[100px] 2xl:mt-[90px] px-10  2xl:px-0  bor">
          <CarouselBanner />
        </div>

        <div
          className="flex justify-center xl:w-[838px] mt-20 lg:mt-auto items-baseline mx-3 2xl:mx-0  py-3 rounded-t-2xl shadow-md"
          style={{
            background: "linear-gradient(352.09deg, rgba(153, 153, 153, 0) -221.84%, #FFFFFF 103.95%)",
          }}
        >

          <div className="flex flex-col md:flex-row space-x-6 items-baseline  px-6 gap-2">
            <div className="flex  items-center space-x-2">
              <Image
                src="/icon-fb-blue.svg"
                alt="Facebook Icon"
                width={100}
                height={100}
                className="w-6 h-6" // ปรับขนาดตามต้องการ
              />
              <span className="text-[#093165] pt-2 text-[17px] font-[400] xl:text-nowrap">
                Nang Fah Pa Trade-นางฟ้าพาเทรดForex
              </span>
            </div>
            <div className="flex items-center  space-x-2">
              <Image
                src="/icon-tiktok-blue.svg"
                alt="Facebook Icon"
                width={100}
                height={100}
                className="w-6 h-6" // ปรับขนาดตามต้องการ
              />
              <span className="text-[#093165] pt-2 text-[17px] font-[400] ">nangfahpatrade88888</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="/icon-line-blue.svg"
                alt="Facebook Icon"
                width={100}
                height={100}
                className="w-6 h-6" // ปรับขนาดตามต้องการ
              />
              <span className="text-[#093165] pt-2 text-[17px] font-[400]">@nangfahpatrade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
