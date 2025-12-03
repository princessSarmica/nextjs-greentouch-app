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
    DialogTrigger, 
} from "@/components/ui/dialog" 
import { Input } from "../ui/input"; 
import { Label } from "../ui/label"; 
import { Textarea } from "../ui/textarea"; 
import { useEffect, useState } from "react"; 
import { toast } from "sonner"; 
import { LoadingButton } from "../loading-button";
import {
  Pencil as EditIcon,
} from "lucide-react";
import { updateNewsArticle } from "@/actions/news-article";

interface EditNewsArticleDialogProps {
    editNewsArticleDialogTranslations: {
        title: string;
        description: string;
        labelArticleTitle: string;
        labelArticleContent: string;
        cancelButton: string;
        actionButton: string;
        successMessage: string;
        errorMessage: string;
    };
    newsArticleId: string;
    initialTitle: string;
    initialContent: string;
}

export default function EditNewsArticleDialog({ editNewsArticleDialogTranslations, newsArticleId, initialTitle, initialContent }: EditNewsArticleDialogProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle(initialTitle);
        setContent(initialContent);
    }, [initialTitle, initialContent]);

    const onClickCancel = () => {
        setTitle(initialTitle);
        setContent(initialContent);
        setIsLoading(false);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        
        e?.preventDefault()

        if (!title.trim()) return
        if (!content.trim()) return

        if (initialTitle === title && initialContent === content) {
            return;
        }

        setIsLoading(true); 
        
        try { 
            const result = await updateNewsArticle(newsArticleId, title, content); 
            
            if(result.success){ 
                setTitle(""); 
                setContent(""); 
                toast.success(editNewsArticleDialogTranslations.successMessage); 
            } 
        } catch (error) { 
                console.error("Error posting news article:", error); 
                toast.error(editNewsArticleDialogTranslations.errorMessage); 
        } finally { 
            setIsLoading(false); 
        } 
    } 
    
    return ( 
        <Dialog> 
            <form onSubmit={handleSubmit}> 
                <DialogTrigger asChild> 
                    <Button variant="outline" size="sm" className="text-muted-foreground hover:text-primary -mr-2">
                        <EditIcon className="h-4 w-4" />
                        {editNewsArticleDialogTranslations.title}
                    </Button>
                </DialogTrigger> 
                <DialogContent className="sm:max-w-[425px]"> 
                    <DialogHeader> 
                        <DialogTitle>{editNewsArticleDialogTranslations.title}</DialogTitle> 
                        <DialogDescription> {editNewsArticleDialogTranslations.description} </DialogDescription> 
                    </DialogHeader> 
                    <div className="grid gap-4"> 
                        <div className="grid gap-3"> 
                            <Label htmlFor="title">{editNewsArticleDialogTranslations.labelArticleTitle}</Label> 
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} /> 
                        </div> 
                        
                        <div className="grid gap-3"> 
                            <Label htmlFor="content">{editNewsArticleDialogTranslations.labelArticleContent}</Label> 
                            <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading}/> 
                        </div>
                    </div>
                    <DialogFooter> 
                        <DialogClose asChild> 
                            <Button variant="outline" onClick={onClickCancel} disabled={isLoading}>{editNewsArticleDialogTranslations.cancelButton}</Button> 
                        </DialogClose> 
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!title.trim()) || (!content.trim()) || (initialTitle === title && initialContent === content) || isLoading} loading={isLoading}>{editNewsArticleDialogTranslations.actionButton}</LoadingButton>
                    </DialogFooter> 
                </DialogContent> 
            </form> 
        </Dialog> 
    ) 
}