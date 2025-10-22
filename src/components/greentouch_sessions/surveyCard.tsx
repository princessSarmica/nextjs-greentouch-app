"use client";

import { ClipboardCheckIcon } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { saveSurveyData } from "@/actions/greentouch-session-user-data";

interface SurveyCardProps {
    greentouchSessionId?: string;
    initialOutdoorTasksResponse?: string;
    initialIndoorTasksResponse?: string;
    initialPhysicalHealthResponse?: string;
    initialMentalHealthResponse?: string;
    initialFriendsFamilyResponse?: string;
    initialLearntSomethingNewResponse?: string;
    initialCloserToNatureResponse?: string;
}

export default function SurveyCard({
    greentouchSessionId, 
    initialOutdoorTasksResponse,
    initialIndoorTasksResponse,
    initialPhysicalHealthResponse,
    initialMentalHealthResponse,
    initialFriendsFamilyResponse,
    initialLearntSomethingNewResponse,
    initialCloserToNatureResponse,
}: SurveyCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const [responses, setResponses] = useState({
        outdoorTasks: initialOutdoorTasksResponse,
        indoorTasks: initialIndoorTasksResponse,
        physicalHealth: initialPhysicalHealthResponse,
        mentalHealth: initialMentalHealthResponse,
        friendsFamily: initialFriendsFamilyResponse,
        learntSomethingNew: initialLearntSomethingNewResponse,
        closerToNature: initialCloserToNatureResponse,
    });

    const frequencyOptions = [
        "Never",
        "Once",
        "Twice",
        "Three times",
        "More than three times",
    ];

    const agreementOptions = [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree",
        "Not applicable",
    ];

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!greentouchSessionId) {
            toast.error("Session ID is missing. Make sure the session is already available.");
            return;
        }

        if(!responses.outdoorTasks || !responses.indoorTasks || !responses.physicalHealth || !responses.mentalHealth || !responses.friendsFamily || !responses.learntSomethingNew || !responses.closerToNature) {
            toast.error("Please answer all questions before submitting the survey.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await saveSurveyData(greentouchSessionId, responses.outdoorTasks, responses.indoorTasks, responses.physicalHealth, responses.mentalHealth, responses.friendsFamily, responses.learntSomethingNew, responses.closerToNature);

            if(result.success){
                toast.success("Survey saved successfully.");
                setInitialResponses(responses);
            }
        } catch (error) {
            toast.error("Failed to save survey.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const [initialResponses, setInitialResponses] = useState({
        outdoorTasks: initialOutdoorTasksResponse,
        indoorTasks: initialIndoorTasksResponse,
        physicalHealth: initialPhysicalHealthResponse,
        mentalHealth: initialMentalHealthResponse,
        friendsFamily: initialFriendsFamilyResponse,
        learntSomethingNew: initialLearntSomethingNewResponse,
        closerToNature: initialCloserToNatureResponse,
    });

    const hasChanges =
        responses.outdoorTasks !== initialResponses.outdoorTasks ||
        responses.indoorTasks !== initialResponses.indoorTasks ||
        responses.physicalHealth !== initialResponses.physicalHealth ||
        responses.mentalHealth !== initialResponses.mentalHealth ||
        responses.friendsFamily !== initialResponses.friendsFamily ||
        responses.learntSomethingNew !== initialResponses.learntSomethingNew ||
        responses.closerToNature !== initialResponses.closerToNature;

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
            <ClipboardCheckIcon className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Survey</h3>
            <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                Required to complete
            </span>
            </div>

            <p className="text-base mb-4 text-gray-700">
            When you finish writing in your Diary, please answer the following
            questions.
            </p>

            {/* Closed Questions */}
            <p className="text-sm font-semibold mt-10 text-green-800">
            CLOSED QUESTIONS
            </p>
            <div className="border-t-2 border-green-800 mt-2 mb-6 mx-auto" />

            {/* --- FIRST TABLE SECTION --- */}
            <div className="space-y-6 mb-10">
            <p className="font-medium text-gray-800">
                How many times during this session did you dedicate time ...
            </p>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm text-gray-700 table-auto sm:table-fixed">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left w-1/3 py-2"></th>
                            {frequencyOptions.map((opt) => (
                            <th
                                key={opt}
                                className="text-center px-2 py-1 font-medium whitespace-normal break-words text-xs sm:text-sm min-w-[80px]"
                            >
                                {opt}
                            </th>
                            ))}
                        </tr>
                    </thead>
                <tbody>
                    {[
                    {
                        label: "to outdoor tasks?",
                        value: responses.outdoorTasks,
                        setter: (val: string) =>
                            setResponses((prev) => ({ ...prev, outdoorTasks: val })),
                    },
                    {
                        label: "to indoor tasks?",
                        value: responses.indoorTasks,
                        setter: (val: string) =>
                            setResponses((prev) => ({ ...prev, indoorTasks: val })),
                    },
                    ].map(({ label, value, setter }) => (
                    <tr key={label} className="border-b">
                        <td className="py-2 font-medium">{label}</td>
                        {frequencyOptions.map((opt) => (
                        <td key={opt} className="text-center py-3">
                            <RadioGroup
                            value={value}
                            onValueChange={setter}
                            className="flex justify-center"
                            >
                            <RadioGroupItem
                                value={opt}
                                id={`${label}-${opt}`}
                                className="mx-auto"
                            />
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
            <p className="font-medium text-gray-800">I felt …</p>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm text-gray-700 table-auto sm:table-fixed">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left w-1/3 py-2"></th>
                            {agreementOptions.map((opt) => (
                            <th
                                key={opt}
                                className="text-center px-2 py-1 font-medium whitespace-normal break-words text-xs sm:text-sm min-w-[80px]"
                            >
                                {opt}
                            </th>
                            ))}
                        </tr>
                    </thead>
                <tbody>
                    {Object.entries({
                    "it was good for my physical health": "physicalHealth",
                    "it was good for my mental health": "mentalHealth",
                    "it was a good opportunity to spend time with friends or family":
                        "friendsFamily",
                    "I learnt something new / I challenged myself":
                        "learntSomethingNew",
                    "closer to nature": "closerToNature",
                    }).map(([label, key]) => (
                    <tr key={key} className="border-b">
                        <td className="py-2 font-medium">{label}</td>
                        {agreementOptions.map((opt) => (
                        <td key={opt} className="text-center py-3">
                            <RadioGroup
                            value={responses[key as keyof typeof responses]}
                            onValueChange={(val) =>
                                setResponses((prev) => ({
                                ...prev,
                                [key]: val,
                                }))
                            }
                            className="flex justify-center"
                            >
                            <RadioGroupItem
                                value={opt}
                                id={`${key}-${opt}`}
                                className="mx-auto"
                            />
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
                disabled={!responses.outdoorTasks || !responses.indoorTasks || !responses.physicalHealth || !responses.mentalHealth || !responses.friendsFamily || !responses.learntSomethingNew || !responses.closerToNature || !hasChanges || isLoading}
                onClick={handleSubmit}
                loading={isLoading}
            >
                Save
            </LoadingButton>
            </div>
        </div>
        </section>
    );
}
