"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { favoriteSession } from "@/actions/greentouch-session-user-data";
import { LoadingButton } from "../loading-button";

interface FavoriteButtonProps {
  favoriteButtonTranslations: {
    addToFavorites: string;
    inFavorites: string;
  };
  greentouchSessionId: string;
  initialIsFavorite: boolean;
}

export default function FavoriteButton({favoriteButtonTranslations, greentouchSessionId, initialIsFavorite}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);

        if(!greentouchSessionId){
            setIsFavorite(!newFavoriteState);
            toast.error("Session ID is missing. Make sure the session is already available.");
            return;
        }

        const result = await favoriteSession(greentouchSessionId, newFavoriteState);

        if (!result.success) {
            setIsFavorite(!newFavoriteState);
            toast.error("Something went wrong while updating favorite.");
        } else {
            toast.success(
            newFavoriteState
                ? "Session added to favorites."
                : "Session removed from favorites."
            );
        }
    });
  };

  return (
    <LoadingButton
      onClick={handleClick}
      disabled={isPending}
      variant="outline"
      loading={isPending}
      className={cn(
        "transition-all duration-200 flex items-center gap-2 px-4 py-4 text-sm font-medium shadow-none",
        isFavorite
          ? "bg-[#28a745] text-white hover:bg-[#23923d]"
          : "bg-white text-gray-600 hover:bg-gray-50",
        isPending && "opacity-70 cursor-not-allowed"
      )}
    >
      <span>{isFavorite ? favoriteButtonTranslations.inFavorites : favoriteButtonTranslations.addToFavorites}</span>
      <Heart
        className={cn(
          "h-4 w-4 transition-transform",
          isFavorite ? "fill-white text-white" : "text-gray-500"
        )}
      />
    </LoadingButton>
  );
}
