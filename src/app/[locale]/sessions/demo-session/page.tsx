import { TreeDeciduous } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function DemoSessionPage() {

    const t = await getTranslations('sessionsPage');

    return(
        <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Hero section (textual content) */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <div className="text-sm text-gray-500 mb-20">
                    <Link href="/sessions" className="text-[#1F566E] hover:underline font-medium">
                        {t('greentouchSessions.demoSession.breadcrumbItem1')}
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>{t('greentouchSessions.demoSession.breadcrumbItem2')}</span>
                </div>

                {/* Navigation link (next only) */}
                <div className="flex justify-end items-center mb-10 underline">
                    <Link
                        href="/sessions/session-1"
                        className="text-[#1F566E] hover:underline font-medium flex items-center gap-1"
                    >
                        {t('greentouchSessions.demoSession.rightNavigationLink')}
                    </Link>
                </div>

                <p className="text-xl font-semibold mb-4 text-left text-green-800">{t('greentouchSessions.demoSession.titleCapitals')}</p>
                <h1 className="text-3xl font-bold mb-8 text-left">{t('greentouchSessions.demoSession.description')}</h1>
                <p className="text-lg mb-4 text-gray-700"></p>
                <p className="text-lg mb-2  font-semibold text-green-800"> 
                    {t('greentouchSessions.demoSession.labelGoal')}
                </p>
                <p className="text-lg mb-4 text-gray-700"> 
                    {t('greentouchSessions.demoSession.paragraph1')}
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-10 mb-10 mx-auto" />
            </section>

            {/* Welcome section */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <p className="text-base font-semibold mb-4 text-gray-700"> 
                    {t('greentouchSessions.demoSession.welcomeTitle')}
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    {t('greentouchSessions.demoSession.welcomeParagraph1')}
                </p>
            </section>

            {/* Outdoor Task Card */}
            <section className="w-full max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow p-8 mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <TreeDeciduous className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">{t('greentouchSessions.demoSession.outdoorTaskCard.cardTitle')}</h3>
                        <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                            {t('greentouchSessions.demoSession.outdoorTaskCard.requiredLabel')}
                        </span>
                    </div>

                    {/* Video placeholder */}
                    <div className="w-full mb-8 aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/tl-X8fEWzKo"
                            title="Outdoor Task Video"
                            allowFullScreen
                        />
                    </div>

                    <h4 className="text-xl font-semibold mb-3">{t('greentouchSessions.demoSession.outdoorTaskCard.cardTitle')}</h4>
                    <p className="text-base mb-4 text-gray-700">
                        {t('greentouchSessions.demoSession.outdoorTaskCard.taskDescription')}
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                        <span className="font-semibold text-green-800">{t('greentouchSessions.demoSession.outdoorTaskCard.step1')}</span><br/> 
                        {t('greentouchSessions.demoSession.outdoorTaskCard.step1taskInstructions')}
                    </li>
                    <li>
                        <span className="font-semibold text-green-800">{t('greentouchSessions.demoSession.outdoorTaskCard.step2')}</span><br/> 
                        {t('greentouchSessions.demoSession.outdoorTaskCard.step2taskInstructions')}
                    </li>
                    <li>
                        <span className="font-semibold text-green-800">{t('greentouchSessions.demoSession.outdoorTaskCard.step3')}</span><br/> 
                        {t('greentouchSessions.demoSession.outdoorTaskCard.step3taskInstructions')}
                    </li>
                    </ul>
                </div>
            </section>

            {/* Reflection Card */}
            <section className="w-full max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow p-8 mb-20">
                    <div className="flex items-center gap-2 mb-6">
                        <Image
                            src="/reflection-icon.svg"
                            alt="Reflection icon"
                            width={18}
                            height={18}
                            className="text-green-700"
                        />
                        <h3 className="text-xl font-semibold">{t('greentouchSessions.demoSession.reflectionCard.cardTitle')}</h3>
                    </div>

                    <p className="text-base mb-6 text-gray-700">
                        {t('greentouchSessions.demoSession.reflectionCard.paragraph1')}
                    </p>

                    <div className="flex justify-center">
                        <div className="bg-[#d6e1dc] text-green-700 px-4 py-3 rounded-md inline-block mb-6 font-medium">
                            {t('greentouchSessions.demoSession.reflectionCard.reflectionQuestion')}
                        </div>
                    </div>

                    <p className="text-base text-gray-700 mb-2">
                        {t('greentouchSessions.demoSession.reflectionCard.paragraph2')}
                    </p>

                    <p className="text-base text-gray-700 font-medium mt-4">
                    {t('greentouchSessions.demoSession.reflectionCard.endMessage')}
                    </p>
                </div>
            </section>

            {/* Bottom navigation link */}
            <section className="w-full max-w-5xl mx-auto px-4">
                <div className="flex justify-end items-center mb-10 underline">
                    <Link
                    href="/sessions/session-1"
                    className="text-[#1F566E] hover:underline font-medium flex items-center gap-1"
                    >
                    {t('greentouchSessions.demoSession.rightNavigationLink')}
                    </Link>
                </div>
            </section>

        </main>
    )
}
