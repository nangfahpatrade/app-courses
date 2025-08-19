import { useTranslations } from "next-intl";
import Part4_data from "./Part4_data";


const Part4 = ({ children }: { children: React.ReactNode }) => {

  const t = useTranslations("HomePage.section_3");

  return (
    <div className="bg-[#222222] py-14 md:py-20  h-full   ">
      <div className="px-8 lg:px-18  mx-auto container">
        <h2 className="text-white text-[28px] sm:text-[35px] font-[700] text-nowrap">
          {t("title")}
        </h2>

        {/* <Part4_data /> */}
        {children}
      </div>
    </div>
  );
};

export default Part4;
