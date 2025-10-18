"use client";

import { NotebookIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { saveDiaryEntry } from "@/actions/greentouch-session-user-data";

interface SaveDiaryProps {
    greentouchSessionId?: string;
    greentouchSessionName?: string;
    initialDiaryText?: string[];
}

function DiaryCard({ greentouchSessionId, greentouchSessionName, initialDiaryText }: SaveDiaryProps) {

    const [diaryTexts, setDiaryTexts] = useState<string[]>(initialDiaryText ?? []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDiaryTexts(initialDiaryText ?? []);
    }, [initialDiaryText]);

    const handleSubmit = async (e?: React.FormEvent) => {
        
        e?.preventDefault()

        if (diaryTexts.every((t) => !t.trim())) return;

        if(!greentouchSessionId){
            toast.error("Session ID is missing. Make sure the session is already available.");
            setIsLoading(false);
            return;
        }

        if(!greentouchSessionName){
            toast.error("Session name is missing. Make sure the session is already available.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true); 
        
        try { 
            const result = await saveDiaryEntry(greentouchSessionId, greentouchSessionName, diaryTexts); 

            if(result.success){ 
                toast.success("Diary entry saved successfully."); 
            } 
        } catch (error) { 
                console.error("Error saving diary entry:", error); 
                toast.error("Failed to save diary entry."); 
        } finally { 
            setIsLoading(false); 
        } 
    } 

    const diaryQuestions: Record<string, string[]> = {
        "Session 1": [
        "As I immerse myself in a natural environment, what thoughts, feelings, or memories arise?",
        ],
        "Session 2": [
        "What does this experience tell me about myself and nature?",
        ],
        "Session 3": [
        "How do the sounds of nature affect my thoughts and feelings?",
        ],
        "Session 4": [
        "How do my social surroundings influence the time I spend in nature?",
        ],
        "Session 5": [
        "What obstacles prevent me from spending time in nature, and how can I overcome them?",
        "Which solutions feel realistic for my lifestyle?",
        ],
        "Session 6": [
        "What would I commit to doing over the next three months to spend more time in nature?",
        ],
    };

    const questions = greentouchSessionName ? diaryQuestions[greentouchSessionName] : [];

    const hasChanges = diaryTexts.some((t, i) => t !== (initialDiaryText?.[i] ?? ""))
    const hasContent = diaryTexts.some((t) => t.trim())

    return(
        <section className="w-full max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-8">
                <div className="flex items-center gap-2 mb-6">
                    <NotebookIcon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Diary</h3>
                    <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                        Required to complete
                    </span>
                </div>

                <p className="text-base mb-4 text-gray-700">
                    Once you have completed the session, please answer the following questions.
                </p>

                <p className="text-sm font-semibold mt-10 text-green-800">
                    OPEN QUESTIONS
                </p>

                {/* Line divider */}
                <section className="w-full">
                    <div className="border-t-2 border-green-800 mt-2 mb-6 mx-auto" />
                </section>

                <div className="space-y-6 mb-6">
                    {questions && questions.length > 0 ? (
                        questions.map((q, index) => (
                        <div key={index}>
                            <p className="text-gray-800 font-medium mb-2">
                                {q}
                            </p>
                            <Textarea
                                id={`content-${index}`}
                                name={`content-${index}`}
                                value={diaryTexts[index] ?? ""}
                                onChange={(e) => {
                                    const newTexts = [...diaryTexts];
                                    newTexts[index] = e.target.value;
                                    setDiaryTexts(newTexts);
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No diary questions available for this session.</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <LoadingButton variant={"secondary"} type="submit" onClick={handleSubmit} disabled={!hasContent || !hasChanges || isLoading} loading={isLoading}>Save</LoadingButton>
                </div>
            </div>
        </section>
    )
}

export default DiaryCard;
