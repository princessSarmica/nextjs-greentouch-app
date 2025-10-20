"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { removeFavoriteSession } from "@/actions/greentouch-session-user-data";
import { Button } from "../../ui/button";

interface FavoriteIconButtonProps {
  greentouchSessionId: string;
}

export default function FavoriteIconButton({greentouchSessionId}: FavoriteIconButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {


        if(!greentouchSessionId){
            toast.error("Session ID is missing. Make sure the session is already available.");
            return;
        }

        const result = await removeFavoriteSession(greentouchSessionId);

        if (!result.success) {
            toast.error("Something went wrong while updating favorite.");
        } else {
            toast.success(
                "Session removed from favorites."
            );
        }
    });
  };

  return (
    <Button
        onClick={handleClick}
        disabled={isPending}
        variant="ghost"
        size="icon"
        className="p-2"
    >
        <Heart
            className="size-6 text-[#28a745] fill-[#28a745]"
        />
    </Button>
  );
}
