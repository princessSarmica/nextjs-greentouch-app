import { getServerSession } from "@/lib/get-session";
import Image from "next/image";
import Link from "next/link";

export default async function Sessions() {
    
    const sessions = [
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
    
    if (!session) { 
        return (
            //dispaly only demo session if not logged in
            <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">
            {/* Hero section */}
            <section className="w-full max-w-5xl px-4 pt-20 pb-20">
                <h1 className="text-3xl font-bold mb-8 text-left">Sessions</h1>
                <div className="flex flex-col gap-6">
                {sessions.filter(s => s.id === "demo-session").map((session) => (
                    <Link
                    key={session.id}
                    href={`/sessions/${session.id}`}
                    className="flex flex-row items-stretch bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                    >
                    {/* Image section – raztegnjena do robov */}
                    <div className="relative w-48 min-w-[12rem] h-40">
                        <Image
                        src={session.image}
                        alt={session.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                    {/* Text section */}
                    <div className="flex flex-col justify-center px-6 py-4">
                        <h2 className="text-xl font-semibold">{session.title}</h2>
                        <p className="text-gray-600">{session.description}</p>
                    </div>
                    </Link>
                ))}
                </div>
            </section>
            </main>
        ) 
    }

    return (
        <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">
        {/* Hero section */}
        <section className="w-full max-w-5xl px-4 pt-20 pb-20">
            <h1 className="text-3xl font-bold mb-8 text-left">Sessions</h1>

            <div className="flex flex-col gap-6">
            {sessions.map((session) => (
                <Link
                key={session.id}
                href={`/sessions/${session.id}`}
                className="flex flex-row items-stretch bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                >
                {/* Image section – raztegnjena do robov */}
                <div className="relative w-48 min-w-[12rem] h-40">
                    <Image
                    src={session.image}
                    alt={session.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                {/* Text section */}
                <div className="flex flex-col justify-center px-6 py-4">
                    <h2 className="text-xl font-semibold">{session.title}</h2>
                    <p className="text-gray-600">{session.description}</p>
                </div>
                </Link>
            ))}
            </div>
        </section>
        </main>
    );
}
