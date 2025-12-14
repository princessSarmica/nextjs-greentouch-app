"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export default function Error({error, reset,}: 
    {
    error: Error & { digest?: string };
    reset: () => void;
    }) {

    const t = useTranslations("errorPage");

    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error])

    return (
        <div className="relative text-center pt-36 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
            
            <p className="text-gray-600 mb-6">{t("description")}</p>

            <Link
                href="/"
                className="text-[#1F566E] text-xl hover:underline font-medium mb-12"
            >
                {t("returnHome")}
            </Link>

            <Button
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                {t("buttonTryAgain")}
            </Button>

            {/* Top-left tree */}
            <Image
            src="/tree.svg"
            alt="Decorative tree top left"
            width={25}
            height={25}
            className="absolute rotate-180 top-0 left-0 pointer-events-none w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
            />
    
            {/* Bottom-right tree */}
            <Image
            src="/tree.svg"
            alt="Decorative tree bottom right"
            width={25}
            height={25}
            className="absolute bottom-0 right-0 pointer-events-none w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
            />

        </div>
    );
}