"use client";

import { LeafIcon } from "lucide-react";
import { Slider } from "../ui/slider";
import { LoadingButton } from "../loading-button";
import { useState } from "react";
import { toast } from "sonner";
import { saveUserNatureConnectedness } from "@/actions/greentouch-session-user-data";
import { useSessionPage } from "./sessionPageContext";

interface SaveNatureConnectednessProps {
    natureConnectednessCardTranslations: {
        cardTitle: string;
        requiredLabel: string;
        cardDescription: string;
        cardSubtitle: string;
        leftSliderLabel: string;
        rightSliderLabel: string;
        actionButton: string;
        sessionIdMissingErrorMessage: string;
        sessionAlreadyCompletedErrorMessage: string;
        successMessage: string;
        unknownErrorMessage: string;
    };
    greentouchSessionId?: string;
}

export default function NatureConnectednessCard({
    natureConnectednessCardTranslations,
    greentouchSessionId
}: SaveNatureConnectednessProps) {

    // 1) GLOBAL STATE from SessionPageContext
    const {
        natureConnectednessValue,
        setNatureConnectednessValue,
        sessionCompleted
    } = useSessionPage();

    const [isLoading, setIsLoading] = useState(false);

    // 2) Local state for the slider
    const [sliderValue, setSliderValue] = useState(
        natureConnectednessValue ?? 5
    );

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!greentouchSessionId) {
            toast.error(natureConnectednessCardTranslations.sessionIdMissingErrorMessage);
            setIsLoading(false);
            return;
        }

        if (sessionCompleted) {
            toast.error(natureConnectednessCardTranslations.sessionAlreadyCompletedErrorMessage);
            setIsLoading(false);
            return;
        }

        try {
            const result = await saveUserNatureConnectedness(
                greentouchSessionId,
                sliderValue
            );

            if (result.success) {
                toast.success(natureConnectednessCardTranslations.successMessage);

                // 3) <<< TUKAJ JE KLJUČNO >>>
                // Ko server uspešno shrani, posodobimo globalni state:
                setNatureConnectednessValue(sliderValue);
            }
        } catch (error) {
            console.error("Error saving nature connectedness:", error);
            toast.error(natureConnectednessCardTranslations.unknownErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const natureConnectednessExpansions = [
        natureConnectednessCardTranslations.leftSliderLabel,
        natureConnectednessCardTranslations.rightSliderLabel
    ];

    return (
        <section className="w-full max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-8">
                <div className="flex items-center gap-2 mb-6">
                    <LeafIcon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">
                        {natureConnectednessCardTranslations.cardTitle}
                    </h3>
                    <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {natureConnectednessCardTranslations.requiredLabel}
                    </span>
                </div>

                <p className="text-base mb-4 text-gray-700">
                    {natureConnectednessCardTranslations.cardDescription}
                </p>

                <p className="text-lg font-semibold my-10 text-gray-700">
                    {natureConnectednessCardTranslations.cardSubtitle}
                </p>

                <div className="w-full max-w-2xl mx-auto mt-24 mb-6">
                    <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[sliderValue]}
                        onValueChange={(val) => setSliderValue(val[0])}
                    />
                    <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
                        {natureConnectednessExpansions.map((expansion) => (
                            <span key={expansion}>{expansion}</span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <LoadingButton
                        onClick={handleSubmit}
                        disabled={isLoading || sessionCompleted}
                        loading={isLoading}
                    >
                        {natureConnectednessCardTranslations.actionButton}
                    </LoadingButton>
                </div>
            </div>
        </section>
    );
}
