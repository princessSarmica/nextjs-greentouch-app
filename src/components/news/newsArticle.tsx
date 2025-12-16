import { getNewsArticle } from "@/actions/news-article";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NewsArticle({params}: { params: Promise<{ newsArticleId: string }> }) {

    //console.log("NewsArticle Component rendered");
  
    const newsArticleId = (await params).newsArticleId;
    const article = await getNewsArticle(newsArticleId);
    if (!article) {
        notFound();
    }

    const t = await getTranslations("newsPage.newsArticle");

    // Date formatting
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(article.createdAt));

    return (
        <main className="min-h-[70vh] w-full bg-transparent">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8 py-6 md:py-10">

            <div className="text-sm text-gray-500 mb-2">
                <Link href="/news" className="text-[#1F566E] hover:underline font-medium">
                    {t("breadcrumbItem1")}
                </Link>
                <span className="mx-2">&gt;</span>
                <span>{article.title}</span>
            </div>

            {/* Content card */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                <div className="p-5 md:p-8">

                {/* Back link */}
                <nav className="mb-4 md:mb-6">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="size-4" />
                        {t("backButton")}
                    </Link>
                </nav>

                {/* Title + date */}
                <h1 className="text-2xl md:text-3xl font-semibold text-[#2F7A4D]">
                    {article.title}
                </h1>
                <p className="mt-4 text-sm text-gray-500">{formattedDate}</p>

                {/* Body */}
                <article className="mt-5 text-gray-800 leading-7 whitespace-pre-line">
                    {article.content}
                </article>

            </div>
            </section>
        </div>
        </main>
    );
}