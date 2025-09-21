import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { NewsArticle } from "@prisma/client";

function NewsCard({ article }: { article: NewsArticle }) {
  const imageSrc = article?.image?.[0] || "/news-article-default.png";

  return (
    <Card className="p-0 flex flex-col overflow-hidden rounded-lg shadow-md transition-shadow bg-white border-0">
      <div className="relative w-full h-40">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover block"
        />
      </div>

      <CardContent className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600  mb-2 line-clamp-6">
          {article.content}
        </p>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
