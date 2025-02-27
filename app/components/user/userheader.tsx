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
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const navItems = [
  { href: "/user/shopcourse", label: "เลือกซื้อคอร์สเรียน" },
  { href: "/user/mycourse", label: "คอร์สเรียนของฉัน" },
  { href: "/user/myorder", label: "รายการสั่งซื้อของฉัน" },
  { href: "/user/manageprofile", label: "จัดการข้อมูลผู้ใช้" },
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
  let newCurrentPath = "";

  if (currentPath.startsWith("/user/buycourse")) {
    newCurrentPath = "/user/shopcourse";
  }

  return (
    <Typography
      as="li"
      key={href}
      variant="small"
      className={`relative pb-1 flex justify-center items-center text-white font-semibold  ${
        currentPath === href || newCurrentPath.startsWith(href) ? "active" : ""
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
      style={{ background: "#DF9E10" }}
      className="hidden lg:inline-block"
      onClick={() => router.push(href)}
    >
      <span>{children}</span>
    </Button>
  );
};

export function UserHeader() {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();

  const login = sessionStorage.getItem("login");

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

  // const handleLogout = () => {
  //   router.push("/home");
  //   localStorage.clear();
  // };

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const userId = decryptData(localStorage.getItem("Id") || "");

  // ต้องการลบ cookie  authToken และ status

  const handleLogout = async () => {
    try {
      const data = {
        id: userId,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/logout`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      if (res.status === 200) {
        sessionStorage.removeItem("login");
        localStorage.removeItem("Token");
        localStorage.removeItem("Status");
        // ลบ Cookies
        Cookies.remove("authToken", { path: "/" });
        Cookies.remove("status", { path: "/" });
        window.location.reload(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navList = useMemo(
    () => (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            currentPath={currentPath}
            onClick={handleNavigation}
          />
        ))}
      </ul>
    ),
    [handleNavigation, currentPath]
  );

  return (
    <div className="max-h-[768px]  ">
      {/* <Navbar className="sticky min-w-full top-0 z-10 h-max rounded-none px-4 py-1 lg:px-8" py-1 lg:px-8 2xl:px-[270px] */}
      <Navbar
        className="sticky min-w-full  top-0 z-10 h-max  min-h-[50px]   lg:h-[80px]  rounded-none  "
        style={{
          backgroundColor: "#042044",
          borderBottom: "3px solid #DF9E10",
        }}
      >
        <div className="flex w-full  items-center justify-between gap-5 px-6 md:px-10 container mx-auto ">
          <div className=" items-center  ">
            <Image
              src={"/logonavbar.svg"}
              alt=""
              width={100}
              height={100}
              className=" object-cover "
            />
          </div>
          <div className="flex items-center gap-4  whitespace-nowrap ">
            <div className="mr-4 hidden lg:block ">{navList}</div>
            <div className="flex ">
              {/* <HeaderButton href="/register" variant="outlined">Register</HeaderButton> */}
              {login ? (
                <Button
                  variant="outlined"
                  size="sm"
                  color="white"
                  className="hidden lg:inline-block "
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </Button>
              ) : (
                <HeaderButton href="/login" variant="gradient">
                  เข้าสู่ระบบ
                </HeaderButton>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              <IoMenu className="text-2xl" />
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center justify-center gap-x-1">
            <Button
              fullWidth
              variant="outlined"
              size="sm"
              className="mb-3 bg-indigo-800 text-indigo-100"
              onClick={handleLogout}
            >
              <span>ออกจากระบบ </span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
