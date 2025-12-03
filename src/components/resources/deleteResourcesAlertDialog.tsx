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
  deleteResourceArticleDialogTranslations: {
    title: string;
    description: string;
    cancelButton: string;
    actionButton: string;
    successMessage: string;
    errorMessage: string;
  };
  resourcesArticleId: string;
}

export function DeleteResourcesAlertDialog({ deleteResourceArticleDialogTranslations, resourcesArticleId }: DeleteResourcesAlertDialogProps) {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteResourcesArticle = async () => {

    if (isDeleting) return;

    try {
        setIsDeleting(true);
        const result = await deleteResourcesArticle(resourcesArticleId);
        if(result.success){
            toast.success(deleteResourceArticleDialogTranslations.successMessage);
        } else throw new Error(result.error);
    } catch (error) {
        console.error("Error deleting resources article:", error);
        toast.error(deleteResourceArticleDialogTranslations.errorMessage);
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
          <AlertDialogTitle>{deleteResourceArticleDialogTranslations.title}</AlertDialogTitle>
          <AlertDialogDescription>{deleteResourceArticleDialogTranslations.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{deleteResourceArticleDialogTranslations.cancelButton}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteResourcesArticle}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? deleteResourceArticleDialogTranslations.actionButton : deleteResourceArticleDialogTranslations.actionButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}