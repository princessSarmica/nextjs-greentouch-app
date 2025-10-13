import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HouseIcon, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionsAccordion } from "@/components/sessions-accordion";

export default async function SessionSixPage() {
    
    const session = await getServerSession();

    if (!session) { 
        redirect("/sign-in"); 
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
                    <span>Session 6</span>
                </div>

                <p className="text-xl font-semibold mb-4 text-left text-green-800">SESSION 6</p>
                <h1 className="text-3xl font-bold mb-8 text-left">Dancing with Nature</h1>
                <p className="text-lg mb-4 text-gray-700"></p>
                <p className="text-lg mb-2  font-semibold text-green-800"> 
                    Goal:
                </p>
                <p className="text-lg mb-4 text-gray-700"> 
                    To express your connection with nature through movement and to set a personal intention to strengthen this relationship over time.
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-10 mb-10 mx-auto" />
            </section>

            {/* Welcome section */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <p className="text-base font-semibold mb-4 text-gray-700"> 
                    Welcome to GreenTouch Session 6!
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    Step again into your nature experience. This session focuses on setting an intention to integrate nature into your life.
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    Before moving forward, place the human figure where you feel you currently are on your path toward connecting with nature.
                </p>
            </section>

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
                            src="https://www.youtube.com/embed/kNkA-khOvbg"
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
                            Choose a tree or plant and observe its movements. Mirror its motion with your hands or body—move freely, as if dancing with nature. Notice how this makes you feel.
                        </li>
                        <li>
                            <span className="font-semibold text-green-800">Step 3:</span><br/>
                            Reflective walk. Consider what this experience reveals about your relationship with nature.
                            Reflection question: What would I commit to doing over the next three months to spend more time in nature? 
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
                            Select a video from the <Link href="/nature-video-gallery/fire" className="font-semibold"><u>Fire</u></Link>, <Link href="/nature-video-gallery/water" className="font-semibold"><u>Water</u></Link>, or <Link href="/nature-video-gallery/air" className="font-semibold"><u>Air</u></Link> section and focus on the movement within it—waves, flames, wind, or flowing animals. Try mirroring these movements with your hands or body, letting yourself flow with nature&apos;s rhythm, and reflect on how this movement makes you feel.
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

            <section className="w-full max-w-5xl mx-auto px-4 p-8 mb-10 mt-10">
                <SessionsAccordion />
            </section>

        </main>
    )
}
