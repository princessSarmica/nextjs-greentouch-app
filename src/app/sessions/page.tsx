import { getAllGreentouchSessions } from "@/actions/greentouch-session";
import { getAllCompletedGreentouchSessions } from "@/actions/greentouch-session-user-data";
import { ReleaseDateDialog } from "@/components/greentouch_sessions/releaseDateDialog";
import { getServerSession } from "@/lib/get-session";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { greentouchSessions } from "@/app/data/greentouch-sessions-data";

export default async function Sessions() {

    const session = await getServerSession();

    if (!session) { 
        return (
            //display only demo session if not logged in
            <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">

                {/* Top gradient header */}
                <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
                    <div className="max-w-5xl mx-auto px-4">
                        <h1 className="text-3xl font-bold text-left">Sessions</h1>
                    </div>
                </section>

                {/* Hero section */}
                <section className="w-full max-w-5xl px-4 pt-20 pb-20 mx-auto">
                    <div className="flex flex-col gap-6">
                    {greentouchSessions.filter(s => s.id === "demo-session").map((greentouchSession) => (
                        <Link
                        key={greentouchSession.id}
                        href={`/sessions/${greentouchSession.id}`}
                        className="flex flex-row items-stretch bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                        >
                        {/* Image section – raztegnjena do robov */}
                        <div className="relative w-48 min-w-[12rem] h-40">
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
                            <h2 className="text-xl font-semibold">{greentouchSession.title}</h2>
                            <p className="text-gray-600">{greentouchSession.description}</p>
                        </div>
                        </Link>
                    ))}
                    </div>
                </section>
            </main>
        ) 
    }   

    const dbGreentouchSessions = await getAllGreentouchSessions();

    const isUnlocked = (id: string, title: string) => {
        if (id === "demo-session") return true;

        // check if session is released
        const dbGreentouchSession = dbGreentouchSessions.find((s) => s.name === title);
        if (!dbGreentouchSession || !dbGreentouchSession.releaseDate) {
            return false;
        }

        const isReleased = new Date(dbGreentouchSession.releaseDate) <= new Date();
        if (!isReleased) return false;

        // find the index of the current session
        const sessionIndex = greentouchSessions.findIndex((s) => s.id === id);

        // if it's the first real session (Session 1), no conditions apply
        if (sessionIndex <= 1) return true;

        // find the previous session (not demo)
        const previousSession = greentouchSessions[sessionIndex - 1];

        // check if user completed previous session
        const previousSessionCompleted = completedSessions.some(
            (completed) => completed.greentouchSession.name === previousSession.title
        );

        if (session.user.role === "admin") return true;

        // access is only possible if the previous session is completed
        return previousSessionCompleted;
    };

    const completedSessions = await getAllCompletedGreentouchSessions();

    return (
        <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Top gradient header */}
            <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-left">Sessions</h1>
                </div>
            </section>

            {/* Hero section */}
            <section className="w-full max-w-5xl px-4 pt-20 pb-20 mx-auto">
                <div className="flex flex-col gap-6">
                {greentouchSessions.map((greentouchSession) => {
                    const unlocked = isUnlocked(greentouchSession.id, greentouchSession.title);

                    // find corresponding db session to get release date
                    const dbSession = dbGreentouchSessions.find(
                        (s) => s.name === greentouchSession.title
                    );

                    // prepare nice date format (if exists)
                    const formattedReleaseDate =
                        dbSession?.releaseDate
                            ? new Date(dbSession.releaseDate).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : null;

                    return (
                        <div
                            key={greentouchSession.id}
                            className={`relative flex flex-row items-stretch rounded-xl shadow transition overflow-hidden ${
                                unlocked || session.user.role === "admin"
                                    ? "bg-white hover:shadow-md"
                                    : "bg-gray-200 opacity-70 cursor-not-allowed"
                            }`}
                        >
                            {unlocked ? (
                                <Link
                                    href={`/sessions/${greentouchSession.id}`}
                                    className="flex flex-row flex-1"
                                >
                                    {/* Image */}
                                    <div className="relative w-32 sm:w-52 md:w-54 lg:w-56 h-46 flex-shrink-0">
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
                                        <h2 className="text-xl font-semibold">
                                            {greentouchSession.title}
                                        </h2>
                                        <p className="text-gray-600">
                                            {greentouchSession.description}
                                        </p>
                                    </div>
                                </Link>
                            ) : session.user.role === "admin" ? (
                                <Link
                                    href={`/sessions/${greentouchSession.id}`}
                                    className="flex flex-row flex-1"
                                >
                                    <div className="relative w-32 sm:w-52 md:w-54 lg:w-56 h-46 flex-shrink-0">
                                        <Image
                                            src={greentouchSession.image}
                                            alt={greentouchSession.title}
                                            fill
                                            className="object-cover grayscale"
                                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center px-4 sm:px-6 py-4">
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            {greentouchSession.title}
                                            <LockIcon className="w-4 h-4 text-gray-600" />
                                        </h2>
                                        {formattedReleaseDate ? (
                                            <p className="text-gray-600 italic">
                                                Releasing on {formattedReleaseDate}
                                            </p>
                                        ) : (
                                            <p className="text-gray-600 italic">Coming soon...</p>
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex flex-row flex-1">
                                    <div className="relative w-32 sm:w-52 md:w-54 lg:w-56 h-46 flex-shrink-0">
                                        <Image
                                            src={greentouchSession.image}
                                            alt={greentouchSession.title}
                                            fill
                                            className="object-cover grayscale"
                                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center px-4 sm:px-6 py-4">
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            {greentouchSession.title}
                                            <LockIcon className="w-4 h-4 text-gray-600" />
                                        </h2>
                                        {formattedReleaseDate ? (
                                            <p className="text-gray-600 italic">
                                                Releasing on {formattedReleaseDate}
                                            </p>
                                        ) : (
                                            <p className="text-gray-600 italic">Coming soon...</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Admin release date button */}
                            {session.user.role === "admin" &&
                                greentouchSession.id !== "demo-session" && (
                                    <div className="absolute bottom-3 right-3">
                                        <ReleaseDateDialog
                                            sessionName={greentouchSession.title}
                                            sessionDescription={greentouchSession.description}
                                            sessionCoverImage={greentouchSession.image}
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
