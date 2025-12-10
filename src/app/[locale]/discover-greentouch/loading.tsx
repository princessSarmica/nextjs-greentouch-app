import { useTranslations } from "next-intl";

export default function Loading() {

  const t = useTranslations('discoverGreenTouchPage');

  return (
    <div>
        <div className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-left">{t('header.title')}</h1>
          </div>
        </div>
        <div className="flex items-center justify-center h-screen bg-[#f5f5f5]">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#1F566E] border-[#d3d3d3]"></div>
        </div>
    </div>
  );
}
