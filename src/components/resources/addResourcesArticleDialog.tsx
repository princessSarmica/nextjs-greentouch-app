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
import { createResourcesArticle } from "@/actions/resources-article";
import AddContentCard from "../addContentCard";
import { LoadingButton } from "../loading-button";
import ComboboxTopic from "../ui/combobox-topic";

export default function AddResourcesArticleDialog(existingTopics?: { topics: string[] }) { 
    const [topic, setTopic] = useState(""); 
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState(""); 
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => { 
        if (!topic.trim()) return 
        if (!title.trim()) return 
        if (!content.trim()) return 
        if (!link.trim()) return 

        setIsLoading(true); 
        
        try { 
            const result = await createResourcesArticle(topic, title, content, link); 

            if(result.success){ 
                setTopic(""); 
                setTitle(""); 
                setContent(""); 
                setLink("");
                toast.success("Resources article created successfully."); 
            } 
        } catch (error) { 
                console.error("Error posting resources article:", error); 
                toast.error("Failed to create resources article."); 
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
                        <DialogTitle>Add Resources Article</DialogTitle> 
                        <DialogDescription> Fill in the details for the resources article you want to add. </DialogDescription> 
                    </DialogHeader> 
                    <div className="grid gap-4"> 
                        <div className="grid gap-3">
                            <Label htmlFor="topic">Topic</Label>
                            <ComboboxTopic
                                value={topic}
                                onChange={setTopic}
                                topics={existingTopics?.topics}
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
                            <Button variant="outline">Cancel</Button> 
                        </DialogClose> 
                        <LoadingButton type="submit" onClick={handleSubmit} disabled={(!topic.trim()) || (!title.trim()) || (!content.trim()) || (!link.trim()) || isLoading} loading={isLoading}>Save changes</LoadingButton>
                    </DialogFooter> 
                </DialogContent> 
            </form> 
        </Dialog> 
    ) 
}