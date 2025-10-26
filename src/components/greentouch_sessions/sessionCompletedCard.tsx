"use client";

import { useEffect, useState } from "react";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { sessionIsCompleted } from "@/actions/greentouch-session-user-data";

interface SaveDiaryProps {
    greentouchSessionId?: string;
    sessionCompleted?: boolean;
}

function SessionCompletedCard({ greentouchSessionId, sessionCompleted }: SaveDiaryProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        if (sessionCompleted) {
            setIsCompleted(true);
        }
    }, [sessionCompleted]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!greentouchSessionId) {
            toast.error("Session ID is missing. Make sure the session is already available.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true); 
        
        try { 
            const result = await sessionIsCompleted(greentouchSessionId); 

            if(result.success){ 
                setIsCompleted(true);
                toast.success("Session completed."); 
            } else {
                toast.error(result.error);
            }
        } catch (error) { 
                console.error("Error marking session as completed:", error); 
                toast.error("Failed to mark session as completed."); 
        } finally { 
            setIsLoading(false); 
        } 
    } 

    return(
        <section className="w-full max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-8">
                <div className="flex flex-col items-center text-center gap-4">
                <h3 className="text-xl font-semibold">Finished your session?</h3>
                <p className="text-sm text-gray-700 max-w-md">
                    Mark this session as completed and move on to other sessions.
                </p>
                <LoadingButton
                    variant="secondary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading || isCompleted}
                    loading={isLoading}
                >
                    {isCompleted ? "Completed" : "Complete"}
                </LoadingButton>
                </div>
            </div>
        </section>
    )
}

export default SessionCompletedCard;
