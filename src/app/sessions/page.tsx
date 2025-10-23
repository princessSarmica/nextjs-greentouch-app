import { getAllGreentouchSessions } from "@/actions/greentouch-session";
import { ReleaseDateDialog } from "@/components/greentouch_sessions/releaseDateDialog";
import { getServerSession } from "@/lib/get-session";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Sessions() {
    
    const greentouchSessions = [
        {
            id: "demo-session",
            title: "Demo Session",
            description: "A taste of the GreenTouch program",
            image: "/demo-session.png",
        },
        {
            id: "session-1",
            title: "Session 1",
            description: "Noticing senses, thoughts, feelings, and memories related to nature",
            image: "/session-1.png",
        },
        {
            id: "session-2",
            title: "Session 2",
            description: "Exploring a pleasant natural object",
            image: "/session-2.png",
        },
        {
            id: "session-3",
            title: "Session 3",
            description: "Immersing in nature sounds",
            image: "/session-3.png",
        },
        {
            id: "session-4",
            title: "Session 4",
            description: "Observing people in nature",
            image: "/session-4.png",
        },
        {
            id: "session-5",
            title: "Session 5",
            description: "Breathing with a natural object",
            image: "/session-5.png",
        },
        {
            id: "session-6",
            title: "Session 6",
            description: "Dancing with nature",
            image: "/session-6.png",
        },
        {
            id: "session-7",
            title: "Session 7",
            description: "Finding a safe space in nature",
            image: "/session-7.png",
        },
    ];

    const session = await getServerSession();
    const dbGreentouchSessions = await getAllGreentouchSessions();

    const isUnlocked = (title: string) => {

        if (title === "Demo Session"){
            return true;
        }

        const dbGreentouchSession = dbGreentouchSessions.find((s) => s.name === title);
        if (!dbGreentouchSession || !dbGreentouchSession.releaseDate) {
            return false;
        }
        return new Date(dbGreentouchSession.releaseDate) <= new Date();
    };

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
                    const unlocked = isUnlocked(greentouchSession.title);

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
                                    <p className="text-gray-600 italic">Coming soon...</p>
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
                                <p className="text-gray-600 italic">Coming soon...</p>
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
