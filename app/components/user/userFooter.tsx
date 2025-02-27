'use client'
import { Button, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Part8 from "../home/part8";

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

export function UserFooter() {
    const router = useRouter();

    return (
        <div>
       <Part8 />

        </div>

    );
}
