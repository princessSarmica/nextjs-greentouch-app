import { getAllGreentouchSessions } from "@/actions/greentouch-session";
import { getAllCompletedGreentouchSessions } from "@/actions/greentouch-session-user-data";
import { ReleaseDateDialog } from "@/components/greentouch_sessions/releaseDateDialog";
import { getServerSession } from "@/lib/get-session";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SessionData {
  localName: string;
  title: string;
  description: string;
  image: string;
  diaryQuestions?: string[];
}

export default async function Sessions() {

    const session = await getServerSession();

    const t = await getTranslations("sessionsPage");
    const greentouchSessionsObj = t.raw("greentouchSessions") as Record<string, SessionData>;
    const greentouchSessions = Object.values(greentouchSessionsObj);

    if (!session) { 
        return (
            //display only demo session if not logged in
            <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">

                {/* Top gradient header */}
                <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
                    <div className="max-w-5xl mx-auto px-4">
                        <h1 className="text-3xl font-bold text-left">{t('header.title')}</h1>
                    </div>
                </section>

                {/* Hero section */}
                <section className="w-full max-w-5xl px-4 pt-20 pb-20 mx-auto">
                    <div className="flex flex-col gap-6">
                    {greentouchSessions.filter(s => s.localName === "demo-session").map((greentouchSession) => (
                        <Link
                        key={greentouchSession.localName}
                        href={`/sessions/${greentouchSession.localName}`}
                        className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                        >
                        {/* Image section – raztegnjena do robov */}
                        <div className="relative w-full sm:w-52 md:w-54 lg:w-56 h-40 sm:h-46 flex-shrink-0">
                            <Image
                            src={greentouchSession.image}
                            alt={greentouchSession.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        {/* Text section */}
                        <div className="flex flex-col justify-center px-6 py-4">
                            <h2 className="text-lg sm:text-xl font-semibold">{greentouchSession.title}</h2>
                            <p className="text-sm sm:text-base text-gray-600">{greentouchSession.description}</p>
                        </div>
                        </Link>
                    ))}
                    </div>
                </section>
            </main>
        ) 
    }   

    const dbGreentouchSessions = await getAllGreentouchSessions();

    const isUnlocked = (localName: string) => {
        if (localName === "demo-session") return true;

        // check if session is released
        const dbGreentouchSession = dbGreentouchSessions.find((s) => s.name === localName);
        if (!dbGreentouchSession || !dbGreentouchSession.releaseDate) {
            return false;
        }

        const isReleased = new Date(dbGreentouchSession.releaseDate) <= new Date();

        if (!isReleased) return false;

        if (session.user.role !== "admin") {
            // find the index of the current session
            const sessionIndex = greentouchSessions.findIndex((s) => s.localName === localName);

            // if it's the first real session (Session 1), no conditions apply
            if (sessionIndex <= 1) return true;

            // find the previous session (not demo)
            const previousSession = greentouchSessions[sessionIndex - 1];

            // check if user completed previous session
            const previousSessionCompleted = completedSessions.some(
                (completed) => completed.greentouchSession.name === previousSession.localName
            );

            // access is only possible if the previous session is completed
            return previousSessionCompleted;
        }
        else {
            return true
        }
    };

    const completedSessions = await getAllCompletedGreentouchSessions();

    return (
        <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Top gradient header */}
            <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-left">{t('header.title')}</h1>
                </div>
            </section>

            {/* Hero section */}
            <section className="w-full max-w-5xl px-4 pt-20 pb-20 mx-auto">
                <div className="flex flex-col gap-6">
                {greentouchSessions.map((greentouchSession) => {
                    const unlocked = isUnlocked(greentouchSession.localName);

                    // find corresponding db session to get release date
                    const dbSession = dbGreentouchSessions.find(
                        (s) => s.name === greentouchSession.localName
                    );

                    // prepare nice date format (if exists)
                    const releaseDateObj = dbSession?.releaseDate ? new Date(dbSession.releaseDate) : null;
                    const formattedReleaseDate =
                        releaseDateObj
                            ? releaseDateObj.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : null;

                    return (
                        <div
                            key={greentouchSession.localName}
                            className={`relative flex flex-row items-stretch rounded-xl shadow transition overflow-hidden ${
                                unlocked || session.user.role === "admin"
                                    ? "bg-white hover:shadow-md"
                                    : "bg-gray-200 opacity-70 cursor-not-allowed"
                            }`}
                        >
                            {/* if user is admin, show all sessions but indicate locked ones */}
                            {session.user.role === "admin" ? (
                                <Link
                                    href={`/sessions/${greentouchSession.localName}`}
                                    className="flex flex-col sm:flex-row flex-1"
                                >
                                    {unlocked ? (
                                        <div className="relative w-full sm:w-52 md:w-54 lg:w-56 h-40 sm:h-46 flex-shrink-0">
                                            <Image
                                                src={greentouchSession.image}
                                                alt={greentouchSession.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative w-full sm:w-52 md:w-54 lg:w-56 h-40 sm:h-46 flex-shrink-0">
                                            <Image
                                                src={greentouchSession.image}
                                                alt={greentouchSession.title}
                                                fill
                                                className="object-cover grayscale"
                                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col justify-center px-4 sm:px-6 py-4">
                                        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                            {greentouchSession.title}
                                            {!unlocked ? (
                                                <LockIcon className="w-4 h-4 text-gray-600" />
                                            ) : (null)}
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            {greentouchSession.description}
                                        </p>
                                        {greentouchSession.localName !== "demo-session" && (
                                            <>
                                                {formattedReleaseDate ? (
                                                    <p className="text-sm sm:text-base text-gray-600 italic">
                                                        {t('additionalData.releaseDateStatus.releaseDate')} {formattedReleaseDate}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm sm:text-base text-gray-600 italic">{t('additionalData.releaseDateStatus.needsToBeSet')}</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </Link>
                                // if user is not admin, but session is unlocked
                            ) : unlocked ? (
                                <Link
                                    href={`/sessions/${greentouchSession.localName}`}
                                    className="flex flex-col sm:flex-row flex-1"
                                >
                                    {/* Image */}
                                    <div className="relative w-full sm:w-52 md:w-54 lg:w-56 h-40 sm:h-46 flex-shrink-0">
                                        <Image
                                            src={greentouchSession.image}
                                            alt={greentouchSession.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col justify-center px-4 sm:px-6 py-4">
                                        <h2 className="text-lg sm:text-xl font-semibold">
                                            {greentouchSession.title}
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            {greentouchSession.description}
                                        </p>
                                        {greentouchSession.localName !== "demo-session" && (
                                            (unlocked && completedSessions.some(
                                                (completed) =>
                                                    completed.greentouchSession.name === greentouchSession.localName
                                            )) ? (
                                                <p className="text-sm sm:text-base mt-2 text-green-600 font-semibold">{t('additionalData.sessionStatus.completed')}</p>
                                            ) : (
                                                <p className="text-sm sm:text-base mt-2 text-gray-600 font-semibold">{t('additionalData.sessionStatus.inProgress')}</p>
                                            )
                                        )}
                                    </div>
                                </Link>
                                // if user is not admin and session is locked
                            ) : (
                                <HoverCard>
                                <HoverCardTrigger asChild>
                                <div className="flex flex-col sm:flex-row flex-1">
                                    <div className="relative w-full sm:w-52 md:w-54 lg:w-56 h-40 sm:h-46 flex-shrink-0">
                                        <Image
                                            src={greentouchSession.image}
                                            alt={greentouchSession.title}
                                            fill
                                            className="object-cover grayscale"
                                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center px-4 sm:px-6 py-4">
                                        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                            {greentouchSession.title}
                                                <LockIcon className="w-4 h-4 text-gray-600" />
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            {greentouchSession.description}
                                        </p>
                                        <HoverCardContent>
                                        {releaseDateObj && releaseDateObj < new Date() ? (
                                            <p className="text-sm sm:text-base text-gray-600 italic">
                                                {t('additionalData.releaseDateStatus.previousSessionsCompletionRequired')}
                                            </p>
                                        ) : releaseDateObj && releaseDateObj > new Date() ? (
                                            <p className="text-sm sm:text-base text-gray-600 italic">
                                                {t('additionalData.releaseDateStatus.releaseDate')} {formattedReleaseDate}
                                            </p>
                                        ) : (
                                            <p className="text-sm sm:text-base text-gray-600 italic">{t('additionalData.releaseDateStatus.comingSoon')}</p>
                                        )}
                                        </HoverCardContent>
                                        <p className="text-sm sm:text-base mt-2 text-gray-600 font-semibold">{t('additionalData.sessionStatus.toBeCompleted')}</p>
                                    </div>
                                </div>
                                </HoverCardTrigger>
                                </HoverCard>
                            )}

                            {/* Admin release date button */}
                            {session.user.role === "admin" &&
                            greentouchSession.localName !== "demo-session" && (
                                <div className="absolute bottom-3 right-3">
                                    <ReleaseDateDialog
                                        setReleaseDateDialogTranslations={{
                                            sessionTitle: (greentouchSession.title),
                                            title: t("additionalData.setReleaseDateDialog.title"),
                                            description1: t("additionalData.setReleaseDateDialog.description1"),
                                            description2: t("additionalData.setReleaseDateDialog.description2"),
                                            labelDate: t("additionalData.setReleaseDateDialog.labelDate"),
                                            labelTime: t("additionalData.setReleaseDateDialog.labelTime"),
                                            actionButton: t("additionalData.setReleaseDateDialog.actionButton"),
                                        }}
                                        sessionName={greentouchSession.localName}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
                </div>
            </section>
        </main>
    );
}
