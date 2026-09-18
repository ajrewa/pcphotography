"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import VideoFooter from "@/components/VideoFooter";
import MainNav from "@/components/MainNav";

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAboutUs = pathname === "/about";
    console.log("isAboutUs", isAboutUs);
    return (
        <SmoothScroll>
            {!isAboutUs && <MainNav />}
            <div className={isAboutUs ? "" : "lg:pl-[230px]"}>
                <main>{children}</main>
                {!isAboutUs && <VideoFooter />}
            </div>
        </SmoothScroll>
    );
}