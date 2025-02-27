//app/[locale]/home/page.tsx

"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import OpenHomePage from "@/app/components/home/home";

const HomePage = () => {
  // const router = useRouter();
  // const t = useTranslations("");

  return (
    <>
      <OpenHomePage />
    </>
  );
};

export default HomePage;
