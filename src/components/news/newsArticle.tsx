"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { updateNewsArticle } from "@/actions/news-article";
import { useRouter } from "next/navigation";

export type NewsArticleClient = {
    id: string;
    title: string;
    content: string;
    createdAt: string; // ISO string
};

export default function NewsArticle({article, backHref = "/news",}: {article: NewsArticleClient; backHref?: string;}) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const isAdmin = session?.user?.role === "admin";

    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);

    const [draftTitle, setDraftTitle] = useState(article.title);
    const [draftContent, setDraftContent] = useState(article.content);

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setTitle(article.title);
            setContent(article.content);
            setDraftTitle(article.title);
            setDraftContent(article.content);
        }
    }, [article.id, article.title, article.content, isEditing]);

    const formattedDate = useMemo(() => {
        try {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(article.createdAt));
        } catch {
        return article.createdAt;
        }
    }, [article.createdAt]);

    const onClickEdit = () => {
        setDraftTitle(title);
        setDraftContent(content);
        setIsEditing(true);
    };

    const onClickCancel = () => {
        setDraftTitle(title);
        setDraftContent(content);
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (!draftTitle.trim() || !draftContent.trim()) return;
        
        if (draftTitle === title && draftContent === content) {
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await updateNewsArticle(article.id, draftTitle, draftContent);
            if (result.success) {
                setTitle(result.updatedArticle?.title ?? draftTitle);
                setContent(result.updatedArticle?.content ?? draftContent);

                toast.success("News article updated successfully.");
                setIsEditing(false);

                router.refresh();
            } else {
                toast.error(result.error ?? "Failed to update news article.");
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to update news article.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-[70vh] w-full bg-transparent">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8 py-6 md:py-10">
            <div className="text-sm text-gray-500 mb-2">
            <Link href="/news" className="text-[#1F566E] hover:underline font-medium">
                News and Events
            </Link>
            <span className="mx-2">&gt;</span>
            <span>{title}</span>
            </div>

            <section className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="relative p-5 md:p-8">
                {!isEditing && isAdmin && (
                <Button className="absolute right-5 top-5" onClick={onClickEdit} variant="default">
                    Edit
                </Button>
                )}

                <nav className="mb-4 md:mb-6">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="size-4" />
                    Back
                </Link>
                </nav>

                {isEditing ? (
                <>
                    <Input
                    id="title"
                    name="title"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    disabled={isLoading}
                    />

                    <p className="mt-4 text-sm text-gray-500">{formattedDate}</p>

                    <Textarea
                    className="mt-4"
                    id="content"
                    name="content"
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    disabled={isLoading}
                    />

                    {isAdmin && (
                    <div className="flex items-center justify-end gap-4 pt-6">
                        <Button variant="outline" type="button" onClick={onClickCancel} disabled={isLoading}>
                        Cancel
                        </Button>
                        <LoadingButton
                        type="button"
                        onClick={handleSubmit}
                        disabled={!draftTitle.trim() || !draftContent.trim() || draftTitle === title && draftContent === content || isLoading}
                        loading={isLoading}
                        >
                        Save changes
                        </LoadingButton>
                    </div>
                    )}
                </>
                ) : (
                <>
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#2F7A4D]">{title}</h1>
                    <p className="mt-4 text-sm text-gray-500">{formattedDate}</p>
                    <article className="mt-5 text-gray-800 leading-7 whitespace-pre-line">{content}</article>
                </>
                )}
            </div>
            </section>
        </div>
        </main>
    );
}
