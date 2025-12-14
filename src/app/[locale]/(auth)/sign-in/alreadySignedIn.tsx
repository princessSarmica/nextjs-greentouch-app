import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AlreadySignedIn() {

    const t = await getTranslations("signInPage.alreadySignedIn");

    return (
        <main>
            <div className="relative text-center pt-12 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

                <p className="text-lg mb-6 text-gray-700 max-w-md">{t("description")}</p>

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
        </main>
    );
}