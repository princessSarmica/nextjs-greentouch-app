import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getAllNewsArticles } from "@/actions/news-article";

import NewsCard from "@/components/news/newsCard";
import AddNewsArticleDialog from "@/components/news/addNewsArticleDialog";
 
export default async function News() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }

    const isAdmin = session?.user?.role === "admin";

    const news = await getAllNewsArticles();
    //console.log({news});

    return (
        <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Top gradient header */}
            <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-left">News and Events</h1>
                </div>
            </section>

            {/* Hero section (textual content) */}
            <section className="w-full max-w-5xl px-4 py-12 mx-auto">
                <p className="text-lg mb-4 text-gray-700">
                Follow the journey shared through the GreenTouch project, which brought together enriching workshops and immersive outdoor experiences. This initiative united faculty and students from Latvia, Portugal, Cyprus, and Slovenia into a collaborative network, fostering ecological awareness and a deeper connection with nature.
                </p>
            </section>

            <section className="w-full max-w-5xl px-4 mx-auto">
                <p className="max-w-5xl text-lg font-semibold mx-auto">
                    Discover
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-4 mb-8 mx-auto" />
            </section>

            <div className="w-full max-w-5xl px-4 mx-auto pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {/* Admin add new content section */}
                    {isAdmin && (
                        <AddNewsArticleDialog />
                    )}
                    {news.map((article) => (
                        <NewsCard key={article.id} article={article} isAdmin={isAdmin} />
                    ))}
                </div>
            </div>

        </main>
    )
}