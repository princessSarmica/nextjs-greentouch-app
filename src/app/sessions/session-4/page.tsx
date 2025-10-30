import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HouseIcon, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionsAccordion } from "@/components/sessions-accordion";
import NotAvailable from "@/components/greentouch_sessions/notAvailable";
import { getGreentouchSessionByName } from "@/actions/greentouch-session";
import NatureConnectednessCard from "@/components/greentouch_sessions/natureConnectednessCard";
import DiaryCard from "@/components/greentouch_sessions/diaryCard";
import { getAllCompletedGreentouchSessions, getCurrentGreentouchSessionUserData } from "@/actions/greentouch-session-user-data";
import FavoriteButton from "@/components/greentouch_sessions/favoriteButton";
import SurveyCard from "@/components/greentouch_sessions/surveyCard";
import SessionCompletedCard from "@/components/greentouch_sessions/sessionCompletedCard";

export default async function SessionFourPage() {
    
    const session = await getServerSession();

    if (!session) { 
        redirect("/sign-in"); 
    }

    const dbSession = await getGreentouchSessionByName("Session 4");

    const completedSessions = await getAllCompletedGreentouchSessions();
    const previousSession = await getGreentouchSessionByName("Session 3");
    const previousSessionCompleted = completedSessions.some(completedSession => completedSession.greentouchSession.name === previousSession?.name);

    const userData = dbSession ? await getCurrentGreentouchSessionUserData(dbSession.id) : null;

    const diaryEntry = userData?.diaryEntry ?? null;
        
    const now = new Date();
    const releaseDate = dbSession?.releaseDate ? new Date(dbSession.releaseDate) : null;

    if ((!releaseDate || releaseDate > now || !previousSessionCompleted) && session.user.role !== "admin") {
        return (
            <NotAvailable />
        )
    }

    return(
        <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Hero section (textual content) */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <div className="text-sm text-gray-500 mb-20">
                    <Link href="/sessions" className="text-[#1F566E] hover:underline font-medium">
                        Sessions
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>Session 4</span>
                </div>

                {/* Navigation links (prev/next) */}
                <div className="flex justify-between items-center mb-10 underline">
                    <Link
                        href="/sessions/session-3"
                        className="text-[#1F566E] hover:underline font-medium flex items-center gap-1"
                    >
                        Go to Session 3
                    </Link>

                    <Link
                        href="/sessions/session-5"
                        className="text-[#1F566E] hover:underline font-medium flex items-center gap-1"
                    >
                        Go to Session 5
                    </Link>
                </div>

                <p className="text-xl font-semibold mb-4 text-left text-green-800">SESSION 4</p>
                <h1 className="text-3xl font-bold mb-8 text-left">Observing People in Nature</h1>
                <p className="text-lg mb-4 text-gray-700"></p>
                <p className="text-lg mb-2  font-semibold text-green-800"> 
                    Goal:
                </p>
                <p className="text-lg mb-4 text-gray-700"> 
                    To reflect on the impact of social surroundings on your time and experience in nature, and to become aware of your personal preferences.
                </p>

                <div className="flex mb-8">
                    <FavoriteButton
                        greentouchSessionId={dbSession?.id || ""}
                        initialIsFavorite={userData?.isFavorite ?? false}
                    />
                </div>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mb-10 mx-auto" />
            </section>

            {/* Welcome section */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <p className="text-base font-semibold mb-4 text-gray-700"> 
                    Welcome to GreenTouch Session 4!
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    Step again into your nature experience. This session focuses on how social surroundings influence the time you spend in nature.
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    Before moving forward, place the human figure where you feel you currently are on your path toward connecting with nature.
                </p>
            </section>

            {/* Nature Connectedness Card */}
            <NatureConnectednessCard greentouchSessionId={dbSession?.id} />

            {/* Outdoor Task Card */}
            <section className="w-full max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow p-8 mb-10 mt-10">
                    <div className="flex items-center gap-2 mb-6">
                        <TreeDeciduous className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">Outdoor task</h3>
                        <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                            Required to complete
                        </span>
                    </div>

                    {/* Video placeholder */}
                    <div className="w-full mb-8 aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/mam5K_idpmQ"
                            title="Outdoor Task Video"
                            allowFullScreen
                        />
                    </div>

                    <h4 className="text-xl font-semibold mb-3">Task</h4>
                    <p className="text-base mb-4 text-gray-700">
                        Here is a brief summary of your task (listen carefully to the video
                        indications):
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>
                            <span className="font-semibold text-green-800">Step 1:</span><br/> 
                            Mindful walk. Slowly observe your surroundings, noticing sights, smells, and sounds.
                        </li>
                        <li>
                            <span className="font-semibold text-green-800">Step 2:</span><br/> 
                            Observe people in nature. Find a place where you can watch how others interact with the environment. Notice their activities—walking, sitting, playing. Reflect on your own habits. Do you enjoy nature alone or with others?
                        </li>
                        <li>
                            <span className="font-semibold text-green-800">Step 3:</span><br/> 
                            Reflective walk. Consider what this experience reveals about your relationship with nature.
                            Reflection question: How do my social surroundings influence the time I spend in nature?                   
                        </li>
                    </ul>

                    <p className="text-base mb-4 text-gray-700 mt-4">
                        Good luck and enjoy!
                    </p>
                </div>
            </section>

            {/* Indoor Task Card */}
            <section className="w-full max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow p-8 mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <HouseIcon className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">Indoor task</h3>
                        <span className="ml-3 text-xs font-semibold bg-amber-200 text-amber-600 px-2 py-0.5 rounded-full text-center">
                            Alternative
                        </span>
                    </div>

                    <p className="text-base mb-4 text-gray-700">
                        Here is an alternative task using the nature video gallery if going outdoors is challenging. Complete the task and write about it in your diary.
                    </p>

                    <ul className="list-disc mb-4 pl-6 space-y-2 text-gray-700">
                        <li>
                            Choose a video that includes people interacting with nature, such as walking in a forest, sitting by a river, or watching animals. Observe their behaviour—how do they engage with the environment? Reflect on how the presence of others influences your own perception of nature.
                        </li>
                    </ul>

                    <div className="flex justify-end">
                        <Button asChild variant={"secondary"}>
                            <Link href="/nature-video-gallery">
                                Nature Video Gallery &rarr;
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Diary Card */}
            <DiaryCard greentouchSessionId={dbSession?.id} greentouchSessionName={dbSession?.name} initialDiaryText={diaryEntry ?? undefined} />

            {/* Survey Card */}
            <SurveyCard
                greentouchSessionId={dbSession?.id}
                initialOutdoorTasksResponse={userData?.outdoorTasksCount ?? undefined}
                initialIndoorTasksResponse={userData?.indoorTasksCount ?? undefined}
                initialPhysicalHealthResponse={userData?.physicalHealthResponse ?? undefined}
                initialMentalHealthResponse={userData?.mentalHealthResponse ?? undefined}
                initialFriendsFamilyResponse={userData?.friendsFamilyResponse ?? undefined}
                initialLearntSomethingNewResponse={userData?.learntSomethingNewResponse ?? undefined}
                initialCloserToNatureResponse={userData?.closerToNatureResponse ?? undefined}
            />

            {/* Session Completed Card */}
            <SessionCompletedCard greentouchSessionId={dbSession?.id} sessionCompleted={userData?.sessionCompleted} />

            <section className="w-full max-w-5xl mx-auto px-4 p-8 mb-10 mt-10">
                <SessionsAccordion />
            </section>

            {/* Bottom navigation links (prev/next) */}
            <section className="w-full max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center mb-10 underline">
                    <Link
                    href="/sessions/session-3"
                    className="text-[#1F566E] hover:underline font-medium flex items-center gap-1"
                    >
                    Go to Session 3
                    </Link>

                    <Link
                    href="/sessions/session-5"
                    className="text-[#1F566E] hover:underline font-medium flex items-center gap-1"
                    >
                    Go to Session 5
                    </Link>
                </div>
            </section>

        </main>
    )
}
