"use client";

import { NotebookIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { saveDiaryEntry } from "@/actions/greentouch-session-user-data";
import { useSessionPage } from "./sessionPageContext";

interface SaveDiaryProps {
    diaryCardTranslations:{
        cardTitle: string;
        requiredLabel: string;
        cardDescription: string;
        cardSubtitle: string;
        noQuestionsAvailable: string;
        actionButton: string;
        localName: string;
        diaryQuestions: string[];
        sessionIdMissingErrorMessage: string;
        sessionNameMissingErrorMessage: string;
        successMessage: string;
        unknownErrorMessage: string;
    };
    greentouchSessionId?: string;
    greentouchSessionName?: string;
}

export default function DiaryCard({ diaryCardTranslations, greentouchSessionId, greentouchSessionName }: SaveDiaryProps) {

    // 1) GLOBAL STATE from SessionPageContext
    const {
        diaryEntry,
        setDiaryEntry,
    } = useSessionPage();

    // 2) Local draft (for editing without immediate update of global state)
    const [draftTexts, setDraftTexts] = useState<string[]>(diaryEntry ?? []);
    const [isLoading, setIsLoading] = useState(false);

    // Synchronize draft with global state
    useEffect(() => {
        setDraftTexts(diaryEntry ?? []);
    }, [diaryEntry]);

    const questions = diaryCardTranslations.diaryQuestions;

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!greentouchSessionId) {
            toast.error(diaryCardTranslations.sessionIdMissingErrorMessage);
            return;
        }

        if (!greentouchSessionName) {
            toast.error(diaryCardTranslations.sessionNameMissingErrorMessage);
            return;
        }

        setIsLoading(true);

        try {
            const result = await saveDiaryEntry(greentouchSessionId, greentouchSessionName, draftTexts);
            if (result.success) {
                toast.success(diaryCardTranslations.successMessage);
                // 🔹 update globalnega state-a
                setDiaryEntry([...draftTexts]);
            }
        } catch (error) {
            console.error("Error saving diary entry:", error);
            toast.error(diaryCardTranslations.unknownErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges = draftTexts.some((t, i) => t !== (diaryEntry?.[i] ?? ""));
    const hasContent = draftTexts.some((t) => t.trim());

    return (
        <section className="w-full max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-8">
                <div className="flex items-center gap-2 mb-6">
                    <NotebookIcon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{diaryCardTranslations.cardTitle}</h3>
                    <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                        {diaryCardTranslations.requiredLabel}
                    </span>
                </div>

                <p className="text-base mb-4 text-gray-700">{diaryCardTranslations.cardDescription}</p>

                <p className="text-sm font-semibold mt-10 text-green-800">{diaryCardTranslations.cardSubtitle}</p>

                {/* Line divider */}
                <section className="w-full">
                    <div className="border-t-2 border-green-800 mt-2 mb-6 mx-auto" />
                </section>

                <div className="space-y-6 mb-6">
                    {questions && questions.length > 0 ? (
                        questions.map((q, index) => (
                            <div key={index}>
                                <p className="text-gray-800 font-medium mb-2">{q}</p>
                                <Textarea
                                    id={`content-${index}`}
                                    name={`content-${index}`}
                                    value={draftTexts[index] ?? ""}
                                    onChange={(e) => {
                                        const newTexts = [...draftTexts];
                                        newTexts[index] = e.target.value;
                                        setDraftTexts(newTexts);
                                    }}
                                    disabled={isLoading}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">{diaryCardTranslations.noQuestionsAvailable}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <LoadingButton
                        variant="secondary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!hasContent || !hasChanges || isLoading}
                        loading={isLoading}
                    >
                        {diaryCardTranslations.actionButton}
                    </LoadingButton>
                </div>
            </div>
        </section>
    );
}
