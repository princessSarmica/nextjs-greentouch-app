import { getNewsArticle } from "@/actions/news-article";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import NewsArticle, { NewsArticleClient } from "@/components/news/newsArticle";

export default async function NewsArticlePage({params,}: {params: Promise<{ newsArticleId: string }>;}) {
    
    const session = await getServerSession();

    if (!session) { 
    redirect("/sign-in"); 
    }

    const { newsArticleId } = await params;
    const article = await getNewsArticle(newsArticleId);

    const clientArticle: NewsArticleClient = {
        id: article.id,
        title: article.title,
        content: article.content,
        createdAt: new Date(article.createdAt).toISOString(),
    };

  return <NewsArticle article={clientArticle} backHref="/news" />;
}
