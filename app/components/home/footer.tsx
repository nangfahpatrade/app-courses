'use client'
import { Button, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const SITEMAP = [
    {
        title: "Company",
        // links: ["About Us", "Careers", "Our Team", "Projects"],
        links: ["About Us", "Careers"],
    },
    {
        title: "Help Center",
        // links: ["Discord", "Twitter", "GitHub", "Contact Us"],
        links: ["Discord", "Contact Us"],
    },
    {
        title: "Resources",
        // links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
        links: ["Blog", "Affiliate Program"],
    },
    {
        title: "Products",
        // links: ["Templates", "UI Kits", "Icons", "Mockups"],
        links: ["Templates", "UI Kits"],
    },
];

const currentYear = new Date().getFullYear();

export function FooterHome() {
    const router = useRouter();

    return (
        <>
              <div className="bg-purple-200 bg-opacity-10">
                <div className=" relative mt-10 bg-purple-300 mx-8  lg:mx-[530px] text-center shadow-lg rounded-2xl lg:rounded-xl py-10 border border-gray-300 -mb-10 z-10">
                    <div className="flex flex-col md:flex-row gap-1  items-center px-10">
                        <h2 className=" w-2/3 text-2xl text-white ">ติดต่อเรา</h2>
                        <Input className="w-1/3 bg-white" type="text" crossOrigin={""} label="E-mail" />
                    </div>
                </div>
                <footer className=" w-full bg-deep-purple-100 border-t-2 border-gray-300 mt-auto   "


                >
                    <div className="mx-auto w-full max-w-7xl py-10 px-4 mt-10">
                        <div className="mx-auto grid w-full grid-cols-2 gap-8 mt-1 sm:grid-cols-4 md:grid-cols-4 ">
                            {SITEMAP.map(({ title, links }, key) => (
                                <div key={key} className="w-full">
                                    <Typography
                                        variant="small"
                                        color="black"
                                        className="mb-2 font-bold uppercase opacity-70"
                                    >
                                        {title}
                                    </Typography>
                                    <ul className="space-y-1 ">
                                        {links.map((link, key) => (
                                            <Typography
                                                key={key}
                                                as="li"
                                                color="blue-gray"
                                                className="font-normal text-sm"
                                            >
                                                <button
                                                    onClick={() => router.push(`/${link.toLowerCase().replace(/ /g, '-')}`)}
                                                    className="inline-block py-1 pr-2 transition-transform hover:scale-105  whitespace-nowrap"
                                                >
                                                    {link}
                                                </button>
                                            </Typography>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className=" mt-2 px-4 md:px-28 py-2 bg-purple-200  flex w-full flex-col items-center justify-center border-t border-blue-gray-50  md:flex-row md:justify-between">
                        <Typography
                            variant="small"
                            className="mb-4 text-center font-normal text-white md:mb-0 w-full "
                        >
                            &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>. All
                            Rights Reserved.
                        </Typography>
                    </div>


                </footer>
            </div>


        </>

    );
}
