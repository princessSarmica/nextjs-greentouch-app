"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { createNewsArticle } from "@/actions/news-article";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { redirect } from "next/navigation";
import { LoadingButton } from "../loading-button";

export default function AddNewsArticleDialog(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim()) return
        if (!content.trim()) return

        setIsLoading(true);

        try {
            const result = await createNewsArticle(title, content);
            if(result.success){
                setTitle("");
                setContent("");
                toast.success("News article created successfully.");
            }
        } catch (error) {
            console.error("Error posting news article:", error);
            toast.error("Failed to create news article.");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Card className="w-full max-w-none rounded-xl border shadow-sm">
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">
                  Title<span className="text-[#2E7D5A]">*</span>
                </Label>
                <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">
                  Content<span className="text-[#2E7D5A]">*</span>
                </Label>
                <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading}/>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button variant="outline" type="button" onClick={() => redirect("/news")}>Cancel</Button>
              <LoadingButton type="submit" onClick={handleSubmit} disabled={(!title.trim()) || (!content.trim()) || isLoading} loading={isLoading}>Save changes</LoadingButton>
            </div>
        </form>
      </CardContent>
    </Card>
  )
}