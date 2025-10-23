"use client";

import Image from "next/image";

export const HeaderLanguage = () => {

    //console.log("HeaderLanguage component rendered");

    return (
        <div className="flex items-center space-x-1 px-2 cursor-pointer text-gray-700 flex-shrink-0">
        <Image src="/english-flag.svg" alt="English" width={20} height={15} />
        <span className="text-sm">EN</span>
        </div>
    );
};
