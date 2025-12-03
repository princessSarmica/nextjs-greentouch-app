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
    editResourceArticleDialogTranslations: {
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
    initialTopic: string;
    resourcesArticleId: string;
    initialTitle: string;
    initialContent: string;
    initialLink: string;
    existingTopics: string[];
}

export default function EditResourcesArticleDialog({ editResourceArticleDialogTranslations, resourcesArticleId, initialTopic, initialTitle, initialContent, initialLink, existingTopics }: EditResourcesArticleDialogProps) {
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
                toast.success(editResourceArticleDialogTranslations.successMessage); 
            } 
        } catch (error) { 
                console.error("Error posting resources article:", error); 
                toast.error(editResourceArticleDialogTranslations.errorMessage); 
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
                        {editResourceArticleDialogTranslations.title}
                    </Button>
                </DialogTrigger> 
                <DialogContent className="sm:max-w-[425px]"> 
                    <DialogHeader> 
                        <DialogTitle>{editResourceArticleDialogTranslations.title}</DialogTitle> 
                        <DialogDescription>{editResourceArticleDialogTranslations.description}</DialogDescription> 
                    </DialogHeader> 
                    <div className="grid gap-4"> 
                        <div className="grid gap-3">
                            <Label htmlFor="topic">{editResourceArticleDialogTranslations.labelArticleTopic}</Label>
                            <ComboboxTopic
                                value={topic}
                                onChange={setTopic}
                                topics={existingTopics}
                                placeholder={`${editResourceArticleDialogTranslations.labelArticleTopicPlaceholder}`}
                                commandInput={`${editResourceArticleDialogTranslations.labelArticleTopicCommandInput}`}
                                widthClass="w-full"
                            />
                        </div>

                        <div className="grid gap-3"> 
                            <Label htmlFor="title">{editResourceArticleDialogTranslations.labelArticleTitle}</Label> 
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} /> 
                        </div> 
                        
                        <div className="grid gap-3"> 
                            <Label htmlFor="content">{editResourceArticleDialogTranslations.labelArticleContent}</Label> 
                            <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isLoading}/> 
                        </div>

                        <div className="grid gap-3"> 
                            <Label htmlFor="link">{editResourceArticleDialogTranslations.labelArticleLink}</Label> 
                            <Input id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)} disabled={isLoading} /> 
                        </div> 
                    </div> 
                    
                    <DialogFooter> 
                        <DialogClose asChild> 
                            <Button variant="outline" onClick={onClickCancel} disabled={isLoading}>{editResourceArticleDialogTranslations.cancelButton}</Button> 
                        </DialogClose> 
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!topic.trim()) || (!title.trim()) || (!content.trim()) || (!link.trim()) || (initialTopic === topic && initialTitle === title && initialContent === content && initialLink === link) || isLoading} loading={isLoading}>{editResourceArticleDialogTranslations.actionButton}</LoadingButton>
                    </DialogFooter> 
                </DialogContent> 
            </form> 
        </Dialog> 
    ) 
}