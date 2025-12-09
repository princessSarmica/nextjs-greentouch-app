"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale } from "use-intl";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function HeaderLanguageSwitcher() {

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (newLocale: string) => {
        if(newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
        }
    };

    //console.log("HeaderLanguage component rendered");

    return (
        <div className="flex items-center space-x-1 pr-2 cursor-pointer text-gray-700 flex-shrink-0">
            <Select value={locale} onValueChange={switchLanguage}>
                <SelectTrigger className="w-20 h-7 px-1 border-0 bg-transparent shadow-none focus:ring-0 focus:outline-none">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="en">
                            <Image src="/flag-en.svg" alt="English" width={20} height={15} /> EN
                        </SelectItem>
                        <SelectItem value="lv">
                            <Image src="/flag-lv.svg" alt="Latviešu" width={20} height={15} /> LV
                        </SelectItem>
                        <SelectItem value="pt">
                            <Image src="/flag-pt.svg" alt="Português" width={20} height={15} /> PT
                        </SelectItem>
                        <SelectItem value="si">
                            <Image src="/flag-si.svg" alt="Slovenščina" width={20} height={15} /> SI
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
