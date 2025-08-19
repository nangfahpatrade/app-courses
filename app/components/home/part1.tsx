import Image from "next/image";
import Carousel from "../carousel";
import { useTranslations } from "next-intl";

const Part1: React.FC = () => {
  const t = useTranslations("HomePage");
  return (
    <div
      style={{
        // backgroundImage: `url('/top-banner-bg.jpg')`,
        backgroundImage: `url('/banner_2.jpg')`,

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" pb-20 md:pb-0   "
    >
      
      <div className="flex flex-col   mx-auto container lg:px-28 py-20  md:py-40    h-full ">

        <h1 className=" text-white text-4xl md:text-[80px] text-center lg:text-start   font-[700]">
          {t("banner.title_1")}
        </h1>

        <div>
          <h1 className=" mt-4 md:mt-10 lg:md-0 text-4xl md:text-[60px] 2xl:ps-[130px] font-[700] text-[#DF9E10] text-center lg:text-start ">
            {t("banner.title_2")}
          </h1>
        </div>

        <div className=" py-6 px-14 md:px-10  2xl:px-0 md:mt-10   ">
          <Carousel />
        </div>


        <div
          className="flex  xl:w-[838px]   mx-3   py-3 rounded-t-2xl shadow-md mt-6 lg:mt-16 -mb-40"
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
                className="w-6 h-6"
              />
              <span className="text-[#093165] text-sm  md:text-[17px] font-[400] xl:text-nowrap">
                Nang Fah Pa Trade-นางฟ้าพาเทรดForex
              </span>
            </div>
            <div className="flex items-center  space-x-2">
              <Image
                src="/icon-tiktok-blue.svg"
                alt="Facebook Icon"
                width={100}
                height={100}
                className="w-6 h-6"
              />
              <span className="text-[#093165]  text-sm  md:text-[17px] font-[400] ">nangfahpatrade88888</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="/icon-line-blue.svg"
                alt="Facebook Icon"
                width={100}
                height={100}
                className="w-6 h-6"
              />
              <span className="text-[#093165]  text-sm  md:text-[17px] font-[400]">@nangfahpatrade</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Part1;
