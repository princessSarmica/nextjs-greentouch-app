import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Resources() {

  //console.log("Resources Page rendered");

  const t = await getTranslations('resourcesPage');

  return (
    <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">

      {/* Top gradient header */}
      <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
          <div className="max-w-5xl mx-auto px-4">
              <h1 className="text-3xl font-bold text-left">{t('header.title')}</h1>
          </div>
      </section>

      {/* Hero section (textual content) */}
      <section className="w-full max-w-5xl px-4 pt-12 mx-auto">
        <p className="text-lg mb-4 text-gray-700">
          {t('heroSection.paragraph1')}
        </p>
        <p className="text-lg mb-4 text-gray-700">
          {t('heroSection.paragraph2')}
        </p>
        <p className="text-lg mb-4 text-gray-700">
          {t('heroSection.paragraph3')}
        </p>
      </section>

      {/* Line divider */}
      <section className="w-full px-4">
        <div className="max-w-5xl border-t border-gray-300 mt-8 mb-8 mx-auto" />
      </section>

      {/* Articles card */}
      <section className="w-full max-w-5xl px-4 pt-6 pb-60 mx-auto">
        <div className="bg-[#0A3730] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow">
          {/* Left - Text content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-3">{t('card1.title')}</h2>
            <p className="text-base mb-4">
              {t('card1.paragraph1')}
            </p>
            <Button asChild variant={"default"} className="px-4 py-4">
              <Link href="/resources/articles">
                {t('card1.button')}
              </Link>
            </Button>
          </div>

          {/* Right - Icon */}
            <div className="w-[100px] h-[100px] p-1">
            <Image
                src="/paper-icon.svg"
                alt="Article icon"
                width={100}
                height={100}
                className="object-contain"
            />
            </div>
        </div>
      </section>
    </main>
  );
}
