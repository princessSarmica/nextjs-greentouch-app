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
import { useState } from "react"; 
import { toast } from "sonner"; 
import AddContentCard from "../addContentCard";
import { LoadingButton } from "../loading-button";
import { createNewsArticle } from "@/actions/news-article";

interface AddNewsArticleDialogProps {
    addNewsArticleDialogTranslations: {
        title: string;
        description: string;
        labelArticleTitle: string;
        labelArticleContent: string;
        cancelButton: string;
        actionButton: string;
    };
}

export default function AddNewsArticleDialog({addNewsArticleDialogTranslations} : AddNewsArticleDialogProps) { 
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
        <Dialog> 
            <form onSubmit={handleSubmit}> 
                <DialogTrigger asChild> 
                    <AddContentCard />
                </DialogTrigger> 
                <DialogContent className="sm:max-w-[425px]"> 
                    <DialogHeader> 
                        <DialogTitle>{addNewsArticleDialogTranslations.title}</DialogTitle> 
                        <DialogDescription> {addNewsArticleDialogTranslations.description} </DialogDescription> 
                    </DialogHeader> 
                    <div className="grid gap-4"> 
                        <div className="grid gap-3"> 
                            <Label htmlFor="title">{addNewsArticleDialogTranslations.labelArticleTitle}</Label> 
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} /> 
                        </div> 
                        
                        <div className="grid gap-3"> 
                            <Label htmlFor="content">{addNewsArticleDialogTranslations.labelArticleContent}</Label> 
                            <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading}/> 
                        </div>
                    </div> 
                    
                    <DialogFooter> 
                        <DialogClose asChild> 
                            <Button variant="outline">{addNewsArticleDialogTranslations.cancelButton}</Button> 
                        </DialogClose> 
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!title.trim()) || (!content.trim()) || isLoading} loading={isLoading}>{addNewsArticleDialogTranslations.actionButton}</LoadingButton>
                    </DialogFooter> 
                </DialogContent> 
            </form> 
        </Dialog> 
    ) 
}