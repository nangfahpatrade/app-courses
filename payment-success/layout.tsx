// app/(dashboard)/layout.tsx
import React, { Suspense } from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <section className="bg-gray-100  h-screen flex flex-col justify-center items-center">
                {children}
            </section>

        </Suspense>

    );
}
