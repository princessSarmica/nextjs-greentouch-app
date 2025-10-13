import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TreeDeciduous } from "lucide-react";

export default async function SessionOnePage() {
    
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
                    <span>Session 1</span>
                </div>

                <p className="text-xl font-semibold mb-4 text-left text-green-800">SESSION 1</p>
                <h1 className="text-3xl font-bold mb-8 text-left">Tuning In: Senses, Thoughts, Feelings, and Memories</h1>
                <p className="text-lg mb-4 text-gray-700"></p>
                <p className="text-lg mb-2  font-semibold text-green-800"> 
                    Goal:
                </p>
                <p className="text-lg mb-4 text-gray-700"> 
                    To awaken gentle awareness by noticing your sensory, emotional, and cognitive responses in a natural environment.
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-10 mb-10 mx-auto" />
            </section>

            {/* Welcome section */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-8">
                <p className="text-base font-semibold mb-4 text-gray-700"> 
                    Welcome to GreenTouch Session 1!
                </p>
                <p className="text-base mb-4 text-gray-700"> 
                    Step into your journey of connecting with nature. This session focuses on exploring your personal connection with nature through sensory awareness, thoughts, and feelings.
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
                            src="https://www.youtube.com/embed/xtYQXx45ZDg"
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
                            Take note of any thoughts, feelings, or memories that arise as you immerse yourself in a natural environment. Consider what stands out in your experience of being in nature.
                            Over the next three days, continue noticing your responses to nature and jot them down in your GreenTouch diary.
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
