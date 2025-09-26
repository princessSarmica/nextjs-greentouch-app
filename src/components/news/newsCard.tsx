import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { NewsArticle } from "@prisma/client";
import Link from "next/link";
import { DeleteNewsAlertDialog } from "../deleteNewsAlertDialog";

function NewsCard({ article, isAdmin = false }: { article: NewsArticle; isAdmin?: boolean }) {
  const imageSrc = article?.image?.[0] || "/article-default-picture.png";

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
          <h2 className="text-lg font-semibold mb-2">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-6">
            {article.content}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end pb-4">
        {isAdmin ? (
          <DeleteNewsAlertDialog newsArticleId={article.id} />
        ) : null}
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
