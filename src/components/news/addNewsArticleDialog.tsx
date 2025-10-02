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

export default function AddNewsArticleDialog() { 
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
                        <DialogTitle>Add News Article</DialogTitle> 
                        <DialogDescription> Fill in the details for the news article you want to add. </DialogDescription> 
                    </DialogHeader> 
                    <div className="grid gap-4"> 
                        <div className="grid gap-3"> 
                            <Label htmlFor="title">Title</Label> 
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} /> 
                        </div> 
                        
                        <div className="grid gap-3"> 
                            <Label htmlFor="content">Content</Label> 
                            <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading}/> 
                        </div>
                    </div> 
                    
                    <DialogFooter> 
                        <DialogClose asChild> 
                            <Button variant="outline">Cancel</Button> 
                        </DialogClose> 
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!title.trim()) || (!content.trim()) || isLoading} loading={isLoading}>Save changes</LoadingButton>
                    </DialogFooter> 
                </DialogContent> 
            </form> 
        </Dialog> 
    ) 
}