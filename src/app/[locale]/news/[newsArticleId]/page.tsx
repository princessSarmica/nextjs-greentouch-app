import { getNewsArticle } from "@/actions/news-article";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import NewsArticleAdmin, { NewsArticleClient } from "@/components/news/newsArticleAdmin";
import NewsArticle from "@/components/news/newsArticle";
import { getTranslations } from "next-intl/server";

export default async function NewsArticlePage({params,}: {params: Promise<{ newsArticleId: string }>;}) {
    
    const session = await getServerSession();

    if (!session) { 
        redirect("/sign-in"); 
    }

    const t = await getTranslations("newsPage.newsArticleAdmin");

    const { newsArticleId } = await params;
    const article = await getNewsArticle(newsArticleId);

    const clientArticle: NewsArticleClient = {
        id: article.id,
        title: article.title,
        content: article.content,
        createdAt: new Date(article.createdAt).toISOString(),
    };

    if (session.user?.role !== "admin") {
        return <NewsArticle params={params} />;
    } else {
        return <NewsArticleAdmin 
                    newsArticleAdminTranslations={{ 
                        breadcrumbItem1: t("breadcrumbItem1"), 
                        backButton: t("backButton"), 
                        editNewsArticleDialog: {
                            title: t("editNewsArticleDialog.title"),
                            cancelButton: t("editNewsArticleDialog.cancelButton"),
                            actionButton: t("editNewsArticleDialog.actionButton"),
                        },
                        successMessage: t("successMessage"),
                        errorMessage: t("errorMessage")
                    }}
                    article={clientArticle} backHref="/news" 
                />;
    }

}
