"use client";
import { useCallback, useState, useEffect, useMemo } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  ButtonProps,
} from "@material-tailwind/react";
import { IoMenu } from "react-icons/io5";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


const navItems = [
  { href: "/home", label: "หน้าหลัก" },
  { href: "/home/course", label: "คอร์สเรียน" },
  { href: "/home/broker", label: "โบรกเกอร์" },
  { href: "/home/ebook", label: "Ebook" },
  { href: "/home/about", label: "เกี่ยวกับเรา" },
  { href: "/home/portfolio", label: "ผลงาน" },
  { href: "/home/activity", label: "กิจกรรม" },
  { href: "/home/bycourse", label: "วิธีการซื้อคอร์ส" },
  { href: "/home/contact", label: "ติดต่อเรา" },
];

interface NavItemProps {
  href: string;
  label: string;
  currentPath: string;
  onClick: (href: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  currentPath,
  onClick,
}) => {
  return (
    //
    // const navItems = [
    //   { href: "/home", label: "หน้าหลัก" },
    //   { href: "/home/course", label: "คอร์สเรียน" },

  //  ต้องการให้ active  start with /home/course และอื่นๆ โดยไม่นับ /home นำหน้า
  // 
    <Typography
      as="li"
      key={href}
      variant="small"
      className={`relative pb-1 flex justify-center items-center text-white   ${
        currentPath === href ? "active " : ""
      }`}
    >
      <button
        onClick={() => onClick(href)}
        className="inline-block py-1 pr-2 pt-3 text-[16px] transition-transform hover:scale-105"
      >
        {label}
      </button>
    </Typography>
  );
};

interface HeaderButtonProps {
  href: string;
  variant: ButtonProps["variant"];
  children: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  href,
  variant,
  children,
}) => {
  const router = useRouter();
  return (
    <Button
      variant={variant}
      size="sm"
      className="hidden lg:inline-block"
      style={{ background: "#DF9E10" }}
      onClick={() => router.push(href)}
    >
      <span className="font-semibold px-1 text-[16px]">{children}</span>
    </Button>
  );
};

export function HeaderHome({ locale }: { locale: string }) {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
// const locale22 = useLocale()

  // const changeLanguage = (lang: string) => {
  //   const params = searchParams ? `?${searchParams.toString()}` : "";
  //   const pathWithoutLang = currentPath.replace(/\/(en|th)$/, "");
  //   const newPath = `${pathWithoutLang}/${lang}`;
  //   // เปลี่ยนเส้นทาง
  //   window.location.href = `${newPath}${params}`;
  // };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href);
      if (openNav) {
        setOpenNav((prevOpenNav) => !prevOpenNav);
      }
    },
    [router, openNav]
  );

  const navList = useMemo(
    () => (
      <ul className="mt-2 mb-4 flex flex-col gap-2 2xl:gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-5  ">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={`/${locale}${item.href}`}
            label={item.label}
            currentPath={currentPath}
            onClick={handleNavigation}
          />
        ))}
      </ul>
    ),
    [handleNavigation, currentPath]
  );


  {}
  const changeLanguage = (locale: string) => {
    const normalizationPath = currentPath.replace(/^\/(th|en)/,"")
    router.push(`/${locale}/${normalizationPath}`);
  };

  return (
    <div className="max-h-[768px]">
      <Navbar
        className="sticky min-w-full  top-0 z-10 h-max    rounded-none  lg:px-60  mx-auto container "
        style={{
          backgroundColor: "#042044",
          borderBottom: "3px solid #DF9E10",
        }}
      >
        {/* {(currentPath == "/home" ||
          currentPath == "/home/th" ||
          currentPath == "/home/en" ||
          currentPath == "/home/course") && (
          <div>
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("th")}>ไทย</button>
          </div>
        )} */}

        <div className="flex flex-row  items-center justify-between gap-4 ">
          <div className=" w-full     ">
            <Link href="/home">
              <Image
                src={"/logo_3.png"}
                alt=""
                width={900}
                height={900}
                className=" w-36  md:w-36  object-cover "
              />
            </Link>
          </div>
          <div className="w-full   ">
            <div className="flex items-center xl:gap-2 whitespace-nowrap">
              <div className="mr-4 hidden   lg:block">{navList}</div>
              <div className="flex rounded-lg gap-2">
                <div className="w-full">
                  <HeaderButton href="/login" variant="gradient">
                    เข้าสู่ระบบ
                  </HeaderButton>
                </div>

                <div className="w-full flex gap-2">
                  <button className="flex items-center justify-center w-8 h-8   " onClick={()=>changeLanguage("th")}>
                    <Image src={"/th.png"} alt="th" width={300} height={300} className=" rounded-sm" />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 " onClick={()=>changeLanguage("en")}>
                    <Image src={"/en.png"} alt="en" width={300} height={300} className=" rounded-sm" />
                  </button>
                </div>
              </div>

              <IconButton
                variant="text"
                className=" ml-auto pt-10 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                <IoMenu className="text-2xl " />
              </IconButton>
            </div>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center justify-center gap-x-1">
            <Button
              fullWidth
              variant="outlined"
              size="sm"
              style={{ background: "#DF9E10" }}
              className="mb-3 text-white "
              onClick={() => router.push("/login")}
            >
              <span className=" font-semibold text-sm">เข้าสู่ระบบ </span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
