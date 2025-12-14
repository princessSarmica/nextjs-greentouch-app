"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";


export default function ErrorPage({ error }: { error: Error }) {

    const t = useTranslations("errorPage");

    useEffect(() => {
        console.error("Error occurred:", error);
    }, [error]);

    return (
        <div className="text-center pt-12 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
            
            <p className="text-gray-600 mb-6">{t("description")}</p>

            <Link
                href="/"
                className="text-[#1F566E] text-xl hover:underline font-medium mb-12"
            >
                {t("returnHome")}
            </Link>

        </div>
    );
}