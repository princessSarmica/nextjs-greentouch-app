import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllNewsArticles } from "@/actions/news-article";
import NewsCard from "@/components/NewsCard";
 
export default async function News() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }

    const news = await getAllNewsArticles();
    //console.log({news});

    return (
        <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">

            {/* Hero section (textual content) */}
            <section className="w-full max-w-5xl px-4 pt-20">
                <h1 className="text-3xl font-bold mb-8 text-left">News and Events</h1>
                <p className="text-lg mb-4 text-gray-700">
                Follow the journey shared through the GreenTouch project, which brought together enriching workshops and immersive outdoor experiences. This initiative united faculty and students from Latvia, Portugal, Cyprus, and Slovenia into a collaborative network, fostering ecological awareness and a deeper connection with nature.
                </p>
            </section>

            {/* Line divider */}
            <section className="w-full px-4">
                <div className="max-w-5xl border-t border-gray-300 mt-8 mb-8 mx-auto" />
            </section>

            <div className="text-center pt-12">
                <Button asChild variant={"default"} className="px-6 py-6"> 
                    <Link href="/news/add-news">Add News Article</Link>
                </Button>
            </div>

            <div className="w-full max-w-5xl px-4 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {news.map((article) => (
                        <Link key={article.id} href={`/news/${article.id}`} className="h-full">
                            <NewsCard article={article} />
                        </Link>
                    ))}
                </div>
            </div>

        </main>
    )
}