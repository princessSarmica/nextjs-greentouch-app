"use client";

import { ClipboardCheckIcon } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { saveSurveyData } from "@/actions/greentouch-session-user-data";
import { useSessionPage } from "./sessionPageContext";

interface SurveyCardProps {
    surveyCardTranslations: {
        cardTitle: string;
        requiredLabel: string;
        cardDescription: string;
        cardSubtitle: string;
        cardSubdescription1: string;
        frequencyScale: {
            never: string;
            once: string;
            twice: string;
            threeTimes: string;
            moreThanThreeTimes: string;
        };
        frequencyQuestions: {
            outdoorTasks: string;
            indoorTasks: string;
        };
        cardSubdescription2: string;
        agreementScale: {
            stronglyDisagree: string;
            disagree: string;
            neutral: string;
            agree: string;
            stronglyAgree: string;
            notApplicable: string;
        };
        impactStatements: {
            physicalHealth: string;
            mentalHealth: string;
            socialOpportunity: string;
            learningChallenge: string;
            closerToNature: string;
        };
        actionButton: string;
        messages: {
            sessionIdMissingErrorMessage: string;
            answerAllQuestionsErrorMessage: string;
            sessionAlreadyCompletedErrorMessage: string;
            successMessage: string;
            unknownErrorMessage: string;
        };
    };
    greentouchSessionId?: string;
}

export default function SurveyCard({ surveyCardTranslations, greentouchSessionId }: SurveyCardProps) {

    const { surveyData, setSurveyData, sessionCompleted } = useSessionPage();

    // 1) Initial responses from global state
    const initialResponses = useMemo(() => ({
        outdoorTasks: surveyData?.outdoorTasksCount ?? "",
        indoorTasks: surveyData?.indoorTasksCount ?? "",
        physicalHealth: surveyData?.physicalHealthResponse ?? "",
        mentalHealth: surveyData?.mentalHealthResponse ?? "",
        friendsFamily: surveyData?.friendsFamilyResponse ?? "",
        learntSomethingNew: surveyData?.learntSomethingNewResponse ?? "",
        closerToNature: surveyData?.closerToNatureResponse ?? "",
    }), [surveyData]);

    const [responses, setResponses] = useState(initialResponses);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setResponses(initialResponses);
    }, [initialResponses]);

    const frequencyOptions = [
        { label: surveyCardTranslations.frequencyScale.never, value: "never" },
        { label: surveyCardTranslations.frequencyScale.once, value: "once" },
        { label: surveyCardTranslations.frequencyScale.twice, value: "twice" },
        { label: surveyCardTranslations.frequencyScale.threeTimes, value: "threeTimes" },
        { label: surveyCardTranslations.frequencyScale.moreThanThreeTimes, value: "moreThanThreeTimes" },
    ];

    const agreementOptions = [
        { label: surveyCardTranslations.agreementScale.stronglyDisagree, value: "stronglyDisagree" },
        { label: surveyCardTranslations.agreementScale.disagree, value: "disagree" },
        { label: surveyCardTranslations.agreementScale.neutral, value: "neutral" },
        { label: surveyCardTranslations.agreementScale.agree, value: "agree" },
        { label: surveyCardTranslations.agreementScale.stronglyAgree, value: "stronglyAgree" },
        { label: surveyCardTranslations.agreementScale.notApplicable, value: "notApplicable" },
    ];

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!greentouchSessionId) {
            toast.error(surveyCardTranslations.messages.sessionIdMissingErrorMessage);
            return;
        }

        if (sessionCompleted) {
            toast.error(surveyCardTranslations.messages.sessionAlreadyCompletedErrorMessage);
            return;
        }

        if (Object.values(responses).some(v => !v)) {
            toast.error(surveyCardTranslations.messages.answerAllQuestionsErrorMessage);
            return;
        }

        setIsLoading(true);

        try {
            const result = await saveSurveyData(
                greentouchSessionId,
                responses.outdoorTasks,
                responses.indoorTasks,
                responses.physicalHealth,
                responses.mentalHealth,
                responses.friendsFamily,
                responses.learntSomethingNew,
                responses.closerToNature
            );

            if (result.success) {
                toast.success(surveyCardTranslations.messages.successMessage);

                // 2) Update global state with new responses
                setSurveyData({
                    outdoorTasksCount: responses.outdoorTasks,
                    indoorTasksCount: responses.indoorTasks,
                    physicalHealthResponse: responses.physicalHealth,
                    mentalHealthResponse: responses.mentalHealth,
                    friendsFamilyResponse: responses.friendsFamily,
                    learntSomethingNewResponse: responses.learntSomethingNew,
                    closerToNatureResponse: responses.closerToNature,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error(surveyCardTranslations.messages.unknownErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges = JSON.stringify(responses) !== JSON.stringify(initialResponses);

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white rounded-lg shadow p-8">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <ClipboardCheckIcon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{surveyCardTranslations.cardTitle}</h3>
                    <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                        {surveyCardTranslations.requiredLabel}
                    </span>
                </div>

                <p className="text-base mb-4 text-gray-700">{surveyCardTranslations.cardDescription}</p>

                {/* Closed Questions */}
                <p className="text-sm font-semibold mt-10 text-green-800">{surveyCardTranslations.cardSubtitle}</p>
                <div className="border-t-2 border-green-800 mt-2 mb-6 mx-auto" />

                {/* --- FIRST TABLE SECTION --- */}
                <div className="space-y-6 mb-10">
                    <p className="font-medium text-gray-800">{surveyCardTranslations.cardSubdescription1}</p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm text-gray-700 table-auto sm:table-fixed">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left w-1/3 py-2"></th>
                                    {frequencyOptions.map(opt => (
                                        <th key={opt.value} className="text-center px-2 py-1 font-medium whitespace-normal break-words text-xs sm:text-sm min-w-[80px]">
                                            {opt.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        label: surveyCardTranslations.frequencyQuestions.outdoorTasks,
                                        key: "outdoorTasks"
                                    },
                                    {
                                        label: surveyCardTranslations.frequencyQuestions.indoorTasks,
                                        key: "indoorTasks"
                                    }
                                ].map(({ label, key }) => (
                                    <tr key={key} className="border-b">
                                        <td className="py-2 font-medium">{label}</td>
                                        {frequencyOptions.map(opt => (
                                            <td key={opt.value} className="text-center py-3">
                                                <RadioGroup
                                                    value={responses[key as keyof typeof responses]}
                                                    onValueChange={(val) => setResponses(prev => ({ ...prev, [key]: val }))}
                                                    className="flex justify-center"
                                                >
                                                    <RadioGroupItem value={opt.value} id={`${key}-${opt.value}`} className="mx-auto" />
                                                </RadioGroup>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- SECOND TABLE SECTION --- */}
                <div className="space-y-6">
                    <p className="font-medium text-gray-800">{surveyCardTranslations.cardSubdescription2}</p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm text-gray-700 table-auto sm:table-fixed">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left w-1/3 py-2"></th>
                                    {agreementOptions.map(opt => (
                                        <th key={opt.value} className="text-center px-2 py-1 font-medium whitespace-normal break-words text-xs sm:text-sm min-w-[80px]">
                                            {opt.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries({
                                    [surveyCardTranslations.impactStatements.physicalHealth]: "physicalHealth",
                                    [surveyCardTranslations.impactStatements.mentalHealth]: "mentalHealth",
                                    [surveyCardTranslations.impactStatements.socialOpportunity]: "friendsFamily",
                                    [surveyCardTranslations.impactStatements.learningChallenge]: "learntSomethingNew",
                                    [surveyCardTranslations.impactStatements.closerToNature]: "closerToNature"
                                }).map(([label, key]) => (
                                    <tr key={key} className="border-b">
                                        <td className="py-2 font-medium">{label}</td>
                                        {agreementOptions.map(opt => (
                                            <td key={opt.value} className="text-center py-3">
                                                <RadioGroup
                                                    value={responses[key as keyof typeof responses]}
                                                    onValueChange={(val) => setResponses(prev => ({ ...prev, [key]: val }))}
                                                    className="flex justify-center"
                                                >
                                                    <RadioGroupItem value={opt.value} id={`${key}-${opt.value}`} className="mx-auto" />
                                                </RadioGroup>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end mt-10">
                    <LoadingButton
                        variant="secondary"
                        disabled={Object.values(responses).some(v => !v) || !hasChanges || isLoading || sessionCompleted}
                        onClick={handleSubmit}
                        loading={isLoading}
                    >
                        {surveyCardTranslations.actionButton}
                    </LoadingButton>
                </div>
            </div>
        </section>
    );
}
