"use client";

import { LeafIcon } from "lucide-react";
import { Slider } from "../ui/slider";
import { LoadingButton } from "../loading-button";
import { useState } from "react";
import { toast } from "sonner";
import { saveUserNatureConnectedness } from "@/actions/greentouch-session-user-data";

interface SaveNatureConnectednessProps {
    greentouchSessionId?: string;
}

function NatureConnectednessCard({ greentouchSessionId }: SaveNatureConnectednessProps) {

    const natureConnectednessExpansions = ["Fully disconnected from nature", "Closely connected to nature"];

    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async () => { 

        setIsLoading(true); 

        if(!greentouchSessionId){
            toast.error("Session ID is missing. Make sure the session is already available.");
            setIsLoading(false);
            return;
        }
        
        try { 
            const result = await saveUserNatureConnectedness(greentouchSessionId, sliderValue); 

            if(result.success){  
                toast.success("Nature connectedness saved successfully."); 
            } 
        } catch (error) { 
                console.error("Error saving nature connectedness:", error); 
                toast.error("Failed to save nature connectedness."); 
        } finally { 
            setIsLoading(false); 
        } 
    } 

    const [sliderValue, setSliderValue] = useState(5)

    return(
        <section className="w-full max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-8">
                <div className="flex items-center gap-2 mb-6">
                    <LeafIcon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Nature Connectedness</h3>
                    <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-center">
                        Required to complete
                    </span>
                </div>

                <p className="text-base mb-4 text-gray-700">
                    We will collect your subjective feelings of connection with nature from session to session, which will be compiled in the Nature Connectedness Tracker for both you and us to track over time.
                </p>

                <p className="text-lg font-semibold my-10 text-gray-700">
                    Move the figure
                </p>

                <div className="w-full max-w-2xl mx-auto mt-24 mb-6">
                    <Slider min={1} max={10} step={1} value={[sliderValue]} onValueChange={(val) => setSliderValue(val[0])} />
                    <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
                        {natureConnectednessExpansions.map((expansion) => (
                            <span key={expansion}>{expansion}</span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <LoadingButton type="submit" onClick={handleSubmit} disabled={isLoading} loading={isLoading}>Save changes</LoadingButton>
                </div>
            </div>
        </section>
    )
}

export default NatureConnectednessCard;
