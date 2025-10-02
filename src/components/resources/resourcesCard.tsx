import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { ResourcesArticle } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { DeleteResourcesAlertDialog } from "../deleteResourcesAlertDialog";
import EditResourcesArticleDialog from "./editResourcesArticleDialog";

function ResourcesCard({ article, isAdmin = false, topics }: { article: ResourcesArticle; isAdmin?: boolean; topics: string[] }) {
  const imageSrc = article?.image?.[0] || "/article-default-picture.png";

  return (
    <Card className="p-0 flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-shadow bg-white border-0">
        <div className="h-full">
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
                <p className="text-sm text-gray-600 line-clamp-9 mb-4">
                {article.content}
                </p>
            </CardContent>
        </div>
        <CardFooter className="flex flex-col gap-4 p-4">
            <Button asChild variant="default" className="w-full">
                <Link href={`${article.link}`}>Read Article</Link>
            </Button>
            {isAdmin ? (
                <div className="flex justify-end gap-3 w-full">
                    <EditResourcesArticleDialog resourcesArticleId={article.id} initialTopic={article.topic} initialTitle={article.title} initialContent={article.content} initialLink={article.link} existingTopics={topics}/>
                    <DeleteResourcesAlertDialog resourcesArticleId={article.id} />
                </div>
            ) : null}
        </CardFooter>
    </Card>
  );
}

export default ResourcesCard;
