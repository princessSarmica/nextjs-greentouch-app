"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { createResourcesArticle } from "@/actions/resources-article";
import AddContentCard from "../addContentCard";
import { LoadingButton } from "../loading-button";
import ComboboxTopic from "../ui/combobox-topic";

export default function AddResourcesArticleDialog({
    addResourceArticleDialogTranslations,
    topics
}: {
    addResourceArticleDialogTranslations: {
        title: string;
        description: string;
        labelArticleTopic: string;
        labelArticleTopicPlaceholder: string;
        labelArticleTopicCommandInput: string;
        labelArticleTitle: string;
        labelArticleContent: string;
        labelArticleLink: string;
        cancelButton: string;
        actionButton: string;
        successMessage: string;
        errorMessage: string;
    };
    topics: string[];
}) {
    const [topic, setTopic] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!topic.trim() || !title.trim() || !content.trim() || !link.trim()) return;

        setIsLoading(true);

        try {
            const result = await createResourcesArticle(topic, title, content, link);

            if (result.success) {
                setTopic("");
                setTitle("");
                setContent("");
                setLink("");
                toast.success(addResourceArticleDialogTranslations.successMessage);
            }
        } catch (error) {
            console.error("Error posting resources article:", error);
            toast.error(addResourceArticleDialogTranslations.errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <AddContentCard />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {addResourceArticleDialogTranslations.title}
                        </DialogTitle>
                        <DialogDescription>
                            {addResourceArticleDialogTranslations.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="topic">
                                {addResourceArticleDialogTranslations.labelArticleTopic}
                            </Label>
                            <ComboboxTopic
                                value={topic}
                                onChange={setTopic}
                                topics={topics}
                                placeholder={`${addResourceArticleDialogTranslations.labelArticleTopicPlaceholder}`}
                                commandInput={`${addResourceArticleDialogTranslations.labelArticleTopicCommandInput}`}
                                widthClass="w-full"
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="title">
                                {addResourceArticleDialogTranslations.labelArticleTitle}
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="content">
                                {addResourceArticleDialogTranslations.labelArticleContent}
                            </Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="link">
                                {addResourceArticleDialogTranslations.labelArticleLink}
                            </Label>
                            <Input
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                {addResourceArticleDialogTranslations.cancelButton}
                            </Button>
                        </DialogClose>
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!topic.trim()) || (!title.trim()) || (!content.trim()) || (!link.trim()) || isLoading} loading={isLoading}>{addResourceArticleDialogTranslations.actionButton}</LoadingButton>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
