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
import { updateResourcesArticle } from "@/actions/resources-article";
import {
  Pencil as EditIcon,
} from "lucide-react";
import ComboboxTopic from "../ui/combobox-topic";

interface EditResourcesArticleDialogProps {
    initialTopic: string;
    resourcesArticleId: string;
    initialTitle: string;
    initialContent: string;
    initialLink: string;
    existingTopics: string[];
}

export default function EditResourcesArticleDialog({ resourcesArticleId, initialTopic, initialTitle, initialContent, initialLink, existingTopics }: EditResourcesArticleDialogProps) {
    const [topic, setTopic] = useState(initialTopic);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [link, setLink] = useState(initialLink);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTopic(initialTopic);
        setTitle(initialTitle);
        setContent(initialContent);
        setLink(initialLink);
    }, [initialTopic, initialTitle, initialContent, initialLink]);

    const onClickCancel = () => {
        setTopic(initialTopic);
        setTitle(initialTitle);
        setContent(initialContent);
        setLink(initialLink);
        setIsLoading(false);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        
        e?.preventDefault()

        if (!topic.trim()) return
        if (!title.trim()) return
        if (!content.trim()) return
        if (!link.trim()) return

        if (initialTopic === topic && initialTitle === title && initialContent === content && initialLink === link) {
            return;
        }

        setIsLoading(true); 
        
        try { 
            const result = await updateResourcesArticle(resourcesArticleId, topic, title, content, link); 
            
            if(result.success){ 
                setTopic(""); 
                setTitle(""); 
                setContent(""); 
                setLink("");
                toast.success("Resources article updated successfully."); 
            } 
        } catch (error) { 
                console.error("Error posting resources article:", error); 
                toast.error("Failed to update resources article."); 
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
                        Edit
                    </Button>
                </DialogTrigger> 
                <DialogContent className="sm:max-w-[425px]"> 
                    <DialogHeader> 
                        <DialogTitle>Edit Resources Article</DialogTitle> 
                        <DialogDescription> Fill in the details for the resources article you want to edit. </DialogDescription> 
                    </DialogHeader> 
                    <div className="grid gap-4"> 
                        <div className="grid gap-3">
                            <Label htmlFor="topic">Topic</Label>
                            <ComboboxTopic
                                value={topic}
                                onChange={setTopic}
                                topics={existingTopics}
                                placeholder={"Select or add topic..."}
                                widthClass="w-full"
                            />
                        </div>

                        <div className="grid gap-3"> 
                            <Label htmlFor="title">Title</Label> 
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} /> 
                        </div> 
                        
                        <div className="grid gap-3"> 
                            <Label htmlFor="content">Content</Label> 
                            <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading}/> 
                        </div>

                        <div className="grid gap-3"> 
                            <Label htmlFor="link">Link</Label> 
                            <Input id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)} disabled={isLoading} /> 
                        </div> 
                    </div> 
                    
                    <DialogFooter> 
                        <DialogClose asChild> 
                            <Button variant="outline" onClick={onClickCancel} disabled={isLoading}>Cancel</Button> 
                        </DialogClose> 
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!topic.trim()) || (!title.trim()) || (!content.trim()) || (!link.trim()) || (initialTopic === topic && initialTitle === title && initialContent === content && initialLink === link) || isLoading} loading={isLoading}>Save changes</LoadingButton>
                    </DialogFooter> 
                </DialogContent> 
            </form> 
        </Dialog> 
    ) 
}