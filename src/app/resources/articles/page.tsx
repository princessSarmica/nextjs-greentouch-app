import { getAllResourcesArticles, getAllResourcesArticlesTopics } from "@/actions/resources-article";
import AddResourcesArticleDialog from "@/components/resources/addResourcesArticleDialog";
import ResourcesCard from "@/components/resources/resourcesCard";
import { getServerSession } from "@/lib/get-session";
import { ResourcesArticle } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
 
export default async function ResourcesArticles() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }

    const isAdmin = session?.user?.role === "admin";

    const resources = (await getAllResourcesArticles()) as ResourcesArticle[];

    const topics = await getAllResourcesArticlesTopics();

    const articlesWithTopic = resources.map((article) => ({
        ...article,
        topic: article.topic && article.topic.trim() ? article.topic : "Uncategorized",
    }));

    const resourcesByTopic = articlesWithTopic.reduce<Record<string, ResourcesArticle[]>>(
        (groups, article) => {
            const topic = article.topic as string;
            if (!groups[topic]) {
                groups[topic] = [];
            }
            groups[topic].push(article);
            return groups;
        }, 
    {});

    const topicOrder = Object.keys(resourcesByTopic).sort((a, b) => a.localeCompare(b));

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

            <div className="w-full max-w-5xl px-4 pb-20">

                {/* Admin add new content section */}
                    {isAdmin && (
                        <section className="mb-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
                                <AddResourcesArticleDialog topics={topics.topics}/>
                            </div>
                        </section>
                )}

                {/* Topics with articles */}
                {topicOrder.map((topic) => (
                    <section key={topic} className="mb-12">
                        <h2 className="text-lg font-bold text-[#1F566E] mb-4">{topic}</h2>
                        <hr className="border-t border-gray-300 mb-6" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
                            {resourcesByTopic[topic].map((article) => (
                                <ResourcesCard key={article.id} article={article} isAdmin={isAdmin} topics={topics.topics}/>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

        </main>
    )
}