import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { ResourcesArticle } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { DeleteResourcesAlertDialog } from "./deleteResourcesAlertDialog";
import EditResourcesArticleDialog from "./editResourcesArticleDialog";
import { useTranslations } from "next-intl";

function ResourcesCard({ article, isAdmin = false, topics }: { article: ResourcesArticle; isAdmin?: boolean; topics: string[] }) {
    const imageSrc = article?.image?.[0] || "/article-default-picture.png";

    const t = useTranslations('resourcesPage.resourcesArticlesPage.resourceArticleCard');

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
                    <Link href={`${article.link}`}>{t('readArticleButton')}</Link>
                </Button>
                {isAdmin ? (
                    <div className="flex justify-end gap-3 w-full">
                        <EditResourcesArticleDialog 
                        editResourceArticleDialogTranslations={{
                            title: t("editResourceArticleDialog.title"),
                            description: t("editResourceArticleDialog.description"),
                            labelArticleTopic: t("editResourceArticleDialog.labelArticleTopic"),
                            labelArticleTopicPlaceholder: t("editResourceArticleDialog.labelArticleTopicPlaceholder"),
                            labelArticleTopicCommandInput: t("editResourceArticleDialog.labelArticleTopicCommandInput"),
                            labelArticleTitle: t("editResourceArticleDialog.labelArticleTitle"),
                            labelArticleContent: t("editResourceArticleDialog.labelArticleContent"),
                            labelArticleLink: t("editResourceArticleDialog.labelArticleLink"),
                            cancelButton: t("editResourceArticleDialog.cancelButton"),
                            actionButton: t("editResourceArticleDialog.actionButton"),
                        }}
                        resourcesArticleId={article.id} initialTopic={article.topic} initialTitle={article.title} initialContent={article.content} initialLink={article.link} existingTopics={topics}
                        />
                        <DeleteResourcesAlertDialog 
                        deleteResourceArticleDialogTranslations={{
                            title: t("deleteResourceArticleAlertDialog.title"),
                            description: t("deleteResourceArticleAlertDialog.description"),
                            cancelButton: t("deleteResourceArticleAlertDialog.cancelButton"),
                            actionButton: t("deleteResourceArticleAlertDialog.actionButton"),
                        }}
                        resourcesArticleId={article.id} />
                    </div>
                ) : null}
            </CardFooter>
        </Card>
    );
}

export default ResourcesCard;
