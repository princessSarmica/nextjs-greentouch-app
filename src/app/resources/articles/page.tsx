import { getServerSession } from "@/lib/get-session";
import Link from "next/link";
import { redirect } from "next/navigation";
 
export default async function ResourcesArticles() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }

    return (
        <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Hero section (textual content) */}
            <section className="w-full max-w-5xl mx-auto px-4 pt-20">
                <div className="text-sm text-gray-500 mb-2">
                    <Link href="/resources" className="text-[#1F566E] hover:underline font-medium">
                        Resources
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>Articles</span>
                </div>
                <h1 className="text-3xl font-bold mb-8 mt-8 text-left">Articles</h1>
            </section>

        </main>
    )
}