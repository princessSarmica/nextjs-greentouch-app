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
import { toast } from "sonner";
import { deleteResourcesArticle } from "@/actions/resources-article";

interface DeleteResourcesAlertDialogProps {
  resourcesArticleId: string;
}

export function DeleteResourcesAlertDialog({ resourcesArticleId }: DeleteResourcesAlertDialogProps) {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteResourcesArticle = async () => {

    if (isDeleting) return;

    try {
        setIsDeleting(true);
        const result = await deleteResourcesArticle(resourcesArticleId);
        if(result.success){
            toast.success("Resources article deleted successfully.");
        } else throw new Error(result.error);
    } catch (error) {
        console.error("Error deleting resources article:", error);
        toast.error("Failed to delete resources article.");
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
          <AlertDialogTitle>Delete Resources Article</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteResourcesArticle}
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