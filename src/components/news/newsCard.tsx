import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { NewsArticle } from "@prisma/client";
import Link from "next/link";
import { DeleteNewsAlertDialog } from "./deleteNewsAlertDialog";
import EditNewsArticleDialog from "./editNewsArticleDialog";
import { useTranslations } from "next-intl";

function NewsCard({ article, isAdmin = false }: { article: NewsArticle; isAdmin?: boolean }) {
  const imageSrc = article?.image?.[0] || "/article-default-picture.png";

  const t = useTranslations('newsPage.newsArticleCard');

  return (
    <Card className="p-0 flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-shadow bg-white border-0">
      <Link key={article.id} href={`/news/${article.id}`} className="h-full">
        <div className="relative w-full h-40">
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover block"
          />
        </div>

        <CardContent className="px-4 pt-4">
          <h2 className="text-md font-semibold mb-2">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-6">
            {article.content}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end pb-4">
        <div className="flex gap-4">
            {isAdmin ? (
              <EditNewsArticleDialog 
              editNewsArticleDialogTranslations={{
                  title: t("editNewsArticleDialog.title"),
                  description: t("editNewsArticleDialog.description"),
                  labelArticleTitle: t("editNewsArticleDialog.labelArticleTitle"),
                  labelArticleContent: t("editNewsArticleDialog.labelArticleContent"),
                  cancelButton: t("editNewsArticleDialog.cancelButton"),
                  actionButton: t("editNewsArticleDialog.actionButton"),
                  successMessage: t("editNewsArticleDialog.successMessage"),
                  errorMessage: t("editNewsArticleDialog.errorMessage")
              }}
              newsArticleId={article.id} initialTitle={article.title} initialContent={article.content} 
              />
            ) : null}
            {isAdmin ? (
              <DeleteNewsAlertDialog 
              deleteNewsArticleDialogTranslations={{
                  title: t("deleteNewsArticleAlertDialog.title"),
                  description: t("deleteNewsArticleAlertDialog.description"),
                  cancelButton: t("deleteNewsArticleAlertDialog.cancelButton"),
                  actionButton: t("deleteNewsArticleAlertDialog.actionButton"),
                  successMessage: t("deleteNewsArticleAlertDialog.successMessage"),
                  errorMessage: t("deleteNewsArticleAlertDialog.errorMessage")
              }}
              newsArticleId={article.id} 
              />
            ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
