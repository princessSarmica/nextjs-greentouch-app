import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TreeDeciduous } from "lucide-react";

export default async function SessionTwoPage() {
    
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
                    <span>Session 2</span>
                </div>

                <p className="text-xl font-semibold mb-4 text-left text-green-800">SESSION 2</p>
                <h1 className="text-3xl font-bold mb-8 text-left">Exploring a Pleasant Natural Object</h1>
                <p className="text-lg mb-4 text-gray-700"></p>
                <p className="text-lg mb-2  font-semibold text-green-800"> 
                    Goal:
                </p>
                <p className="text-lg mb-4 text-gray-700"> 
                    To deepen your mindfulness and connection with nature by closely observing and reflecting on a single natural object.
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-10 mb-10 mx-auto" />
            </section>

            {/* Welcome section */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <p className="text-base font-semibold mb-4 text-gray-700"> 
                    Welcome to GreenTouch Session 2!
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    Step again into your nature experience. This session focuses on how simple interactions with nature can enhance mindfulness and deepen your connection with the natural world.
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
                        <span className="ml-3 text-xs font-semibold bg-blue-100 text-green-700 px-2 py-0.5 rounded-full border border-green-700 text-center">
                            Required to complete
                        </span>
                    </div>

                    {/* Video placeholder */}
                    <div className="w-full mb-8 aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/2og2iOc3kRk"
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
                            Find a natural object that draws your attention. Spend time exploring its details—touch, colour, texture, and scent—while engaging in silent reflection.
                        </li>
                        <li>
                            <span className="font-semibold text-green-800">Step 3:</span><br/> 
                            Reflective walk. Consider what this experience reveals about your relationship with nature. 
                            Reflection question: What does this experience tell me about myself and nature?
                        </li>
                    </ul>

                    <p className="text-base mb-4 text-gray-700 mt-4">
                        Good luck and enjoy!
                    </p>
                </div>
            </section>

        </main>
    )
}
