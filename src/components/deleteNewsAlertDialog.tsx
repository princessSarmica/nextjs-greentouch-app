"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteNewsArticle } from "@/actions/news-article";
import { toast } from "sonner";

interface DeleteNewsAlertDialogProps {
  newsArticleId: string;
}

export function DeleteNewsAlertDialog({ newsArticleId }: DeleteNewsAlertDialogProps) {

  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDeleteNewsArticle = async () => {

    if (isDeleting) return;

    try {
        setIsDeleting(true);
        const result = await deleteNewsArticle(newsArticleId);
        if(result.success){
            toast.success("News article deleted successfully.");
        } else throw new Error(result.error);
    } catch (error) {
        console.error("Error deleting news article:", error);
        toast.error("Failed to delete news article.");
    } finally {
        setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-red-500 -mr-2"
        >
          {isDeleting ? (
            <Loader2Icon className="size-6 animate-spin" />
          ) : (
            <Trash2Icon className="size-6" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete News Article</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteNewsArticle}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}