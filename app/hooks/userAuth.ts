"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useAuth() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = Cookies.get("authToken");
        const status = Cookies.get("status");

        if (token && status === "0") {
            setIsAuthorized(true);
        } else if (token && status === "1") {
            setIsAuthorized(true);
        }
        else {
            router.replace("/");
        }

        // ตรวจสอบเสร็จสิ้น ให้ปิดสถานะ Loading
        setIsLoading(false);
    }, [router]);

    return { isLoading, isAuthorized };
}