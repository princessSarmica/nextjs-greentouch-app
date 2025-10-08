import Link from "next/link";

export default async function DemoSessionPage() {
    
    return(
        <main className="min-h-[70vh] w-full bg-transparent">
                <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8 py-6 md:py-10">

                <div className="text-sm text-gray-500 mb-2">
                    <Link href="/sessions" className="text-[#1F566E] hover:underline font-medium">
                        Sessions
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>Demo Session</span>
                </div>
            </div>
        </main>
    )
}
