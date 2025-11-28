import { useTranslations } from "next-intl";
import Image from "next/image";

export default function DiscoverGreenTouch() {

  //console.log("Discover GreenTouch Page rendered");

  const t = useTranslations('discoverGreenTouchPage');

  return (
    <main className="w-full text-gray-900 bg-[#f5f5f5]  min-h-screen">
      <div>
        {/* Top gradient header */}
        <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-left">{t('header.title')}</h1>
          </div>
        </section>

        {/* Hero section (textual content + tree) */}
        <div className="relative bg-[#f5f5f5] overflow-hidden pb-20">
          <div className="max-w-5xl mx-auto text-left pt-6 w-full px-4 space-y-10 relative z-10">
            {/* Hero text */}
            <div>
              <p className="text-lg mt-8 mb-12">
                {t('heroSection.heroText')}
              </p>
            </div>

            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4">{t('heroSection.card1.title')}</h3>
              <p className="mb-2 text-base">
                {t('heroSection.card1.paragraph1')}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>{t('heroSection.card1.list.0')}</li>
                <li>{t('heroSection.card1.list.1')}</li>
                <li>{t('heroSection.card1.list.2')}</li>
                <li>{t('heroSection.card1.list.3')}</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4">{t('heroSection.card2.title')}</h3>
              <p className="mb-2 text-base">
                {t('heroSection.card2.paragraph1')}
              </p>
              <p className="mb-2 text-base">{t('heroSection.card2.paragraph2')}</p>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>{t('heroSection.card2.list.0')}</li>
                <li>{t('heroSection.card2.list.1')}</li>
                <li>{t('heroSection.card2.list.2')}</li>
              </ul>
              <p className="mt-4 text-base">
                {t('heroSection.card2.paragraph3')}
              </p>
            </div>
          </div>

          {/* Bottom-right tree */}
          <Image
            src="/tree.svg"
            alt="Decorative tree bottom right"
            width={25}
            height={25}
            className="absolute bottom-0 right-0 pointer-events-none w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          />
        </div>

      </div>

      {/* Project philosophy section */}
      <section className="bg-[#0A3730] text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-stretch">
          {/* Text content */}
          <div className="pl-6 pr-16 py-20 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">{t('projectPhilosophySection.title')}</h2>
            <p className="text-base mb-8">
              {t('projectPhilosophySection.paragraph1')}
            </p>
            <p className="text-base mb-8">
              {t('projectPhilosophySection.paragraph2')}
            </p>
            <p className="text-base mb-8">
              {t('projectPhilosophySection.paragraph3')}
            </p>
            <p className="text-base mb-8">
              {t('projectPhilosophySection.paragraph4')}
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            <Image
              src="/discover-greentouch-image-1.jpg"
              alt="Hands holding plant"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* EcoMind section */}
      <section className="bg-[#f5f5f5] px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <Image
              src="/discover-greentouch-image-2.svg"
              alt="EcoMind leaf image"
              width={350}
              height={350}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-8">{t('ecoMindSection.title')}</h2>
            <p className="text-lg mb-4 text-gray-700">
              {t.rich("ecoMindSection.paragraph1", {
                b: (chunks) => <b>{chunks}</b>
              })}
            </p>
            <p className="text-lg text-gray-700">
              {t.rich("ecoMindSection.paragraph2", {
                b: (chunks) => <b>{chunks}</b>
              })}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
