import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import { getTranslations } from "next-intl/server";

export default async function NatureVideoGallery() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  const t = await getTranslations("natureVideoGalleryPage");

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
        <p className="text-lg text-gray-700">
          {t('heroSection.paragraph3')}
        </p>
      </section>

      {/* Line divider + Heading */}
      <section className="w-full max-w-5xl px-4 mx-auto mt-12 mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('heroSection.label1')}</h2>
        <div className="border-t border-gray-300" />
      </section>

      {/* Categories grid */}
      <section className="w-full max-w-5xl px-4 pb-20 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: "water", href: "/nature-video-gallery/water" },
            { name: "fire", href: "/nature-video-gallery/fire" },
            { name: "air", href: "/nature-video-gallery/air" },
            { name: "earth", href: "/nature-video-gallery/earth" },
            { name: "animals", href: "/nature-video-gallery/animals" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src={`/nature-video-gallery-${item.name}.jpg`}
                alt={`${item.name} image`}
                fill
                className="object-cover brightness-[0.9] will-change-transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-[#f5f5f5]">
                <h3 className="text-3xl font-semibold mb-2">{t(`categoryPage.categories.${item.name}.title`)}</h3>
                <p className="text-base underline">{t('heroSection.label2')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
