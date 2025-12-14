import NotFoundLeafCounter from "@/components/notFound/notFoundLeafCounter";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFound() {

  const t = useTranslations("notFoundPage");

  return (
    <div className="relative text-center pt-36 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
      
      <NotFoundLeafCounter 
        title={t("title")}
        returnHomeText={t("returnHome")}
      />

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
