import { TreeDeciduous } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DemoSessionPage() {
    
    return(
        <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Hero section (textual content) */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <div className="text-sm text-gray-500 mb-20">
                    <Link href="/sessions" className="text-[#1F566E] hover:underline font-medium">
                        Sessions
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>Demo Session</span>
                </div>

                <p className="text-xl font-semibold mb-4 text-left text-green-800">DEMO SESSION</p>
                <h1 className="text-3xl font-bold mb-8 text-left">A Taste of GreenTouch</h1>
                <p className="text-lg mb-4 text-gray-700"></p>
                <p className="text-lg mb-2  font-semibold text-green-800"> 
                    Goal:
                </p>
                <p className="text-lg mb-4 text-gray-700"> 
                    To offer a short and accessible introduction to the GreenTouch experience, allowing participants to explore a mindful moment in nature and reflect on their connection before starting the full program.
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-10 mb-10 mx-auto" />
            </section>

            {/* Welcome section */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <p className="text-base font-semibold mb-4 text-gray-700"> 
                    Welcome to GreenTouch!
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    This short session gives you a taste of the program before you begin your journey.
                </p>
            </section>

            {/* Outdoor Task Card */}
            <div className="w-full max-w-5xl bg-white rounded-lg shadow p-8 mb-10">
                <div className="flex items-center gap-2 mb-6">
                    <TreeDeciduous className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Outdoor task</h3>
                    <span className="ml-3 text-xs font-semibold bg-blue-100 text-green-700 px-2 py-0.5 rounded-full border border-green-700">
                        Required to complete
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

                <h4 className="text-xl font-semibold mb-3">Task</h4>
                <p className="text-base mb-4 text-gray-700">
                    Here is a brief summary of your task (listen carefully to the video
                    indications):
                </p>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                    <span className="font-semibold text-green-800">Step 1:</span><br/> 
                    Take a mindful walk for at least five minutes. Move slowly, noticing
                    sights, smells, and sounds.
                </li>
                <li>
                    <span className="font-semibold text-green-800">Step 2:</span><br/> 
                    Choose a natural object that draws your attention. Observe its colour,
                    texture, scent, and sound for ten or more minutes. Engage in silent
                    reflection.
                </li>
                <li>
                    <span className="font-semibold text-green-800">Step 3:</span><br/> 
                    Take a reflective walk for at least five minutes. Consider what this
                    experience tells you about your connection with nature.
                </li>
                </ul>
            </div>

            {/* Reflection Card */}
            <div className="w-full max-w-5xl bg-white rounded-lg shadow p-8 mb-20">
                <div className="flex items-center gap-2 mb-6">
                    <Image
                        src="/reflection-icon.svg"
                        alt="Reflection icon"
                        width={18}
                        height={18}
                        className="text-green-700"
                    />
                    <h3 className="text-xl font-semibold">Reflection</h3>
                </div>

                <p className="text-base mb-6 text-gray-700">
                    Your question for reflection:
                </p>

                <div className="flex justify-center">
                    <div className="bg-[#d6e1dc] text-green-700 px-4 py-3 rounded-md inline-block mb-6 font-medium">
                        How was this experience for me? What did I notice?
                    </div>
                </div>

                <p className="text-base text-gray-700 mb-2">
                    After completing the task, write down any thoughts in a notebook or on
                    your phone. Once you enroll in the program, you will be able to record
                    your reflections in your personal GreenTouch diary.
                </p>

                <p className="text-base text-gray-700 font-medium mt-4">
                Good luck and enjoy!
                </p>
            </div>

        </main>
    )
}
