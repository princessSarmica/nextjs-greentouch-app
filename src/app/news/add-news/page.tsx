import AddNewsArticleForm from "@/components/news/addNewsArticleForm";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
 
export default async function AddNews() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }

    if(session.user.role !== "admin") {
        redirect("/news")
    }
 
    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <section className="mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">

                {/* Header */}
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-left">
                        Add News Article
                    </h1>
                    <div className="mt-2 h-px w-full bg-[#0A3730]/70" />
                    <div className="mt-2 text-sm text-[#2E7D5A]">
                        * is required to fill
                    </div>

                </div>
                    <AddNewsArticleForm />
            </section>
        </main>
    )
}