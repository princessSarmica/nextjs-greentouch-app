"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { removeFavoriteSession } from "@/actions/greentouch-session-user-data";
import { Button } from "../../ui/button";

interface FavoriteIconButtonProps {
  greentouchSessionName: string;
}

export default function FavoriteIconButton({greentouchSessionName}: FavoriteIconButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {

        if(!greentouchSessionName){
            toast.error("Session name is missing. Make sure the session is already available.");
            return;
        }

        const result = await removeFavoriteSession(greentouchSessionName);

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
