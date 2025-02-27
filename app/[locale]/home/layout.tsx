

import { FooterHome } from "../../components/home/footer";
import { HeaderHome } from "../../components/home/header";
import Part8 from "../../components/home/part8";
export default function Layout({ children, params }: { children: React.ReactNode; params: {locale : string} }) {

  

  return (
    <div className=" flex flex-col min-h-screen bg-gray-100  ">
 
      <div className=" sticky top-0 z-50">
        <HeaderHome locale={params.locale} />
      </div>
      <div className="flex-grow -mt-1">
      {children}
      </div>
      <Part8 />
    </div>
  );
}
