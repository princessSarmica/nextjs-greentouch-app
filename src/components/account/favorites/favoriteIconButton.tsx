"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { removeFavoriteSession } from "@/actions/greentouch-session-user-data";
import { LoadingButton } from "@/components/loading-button";

interface FavoriteIconButtonProps {
  FavoriteIconButtonTranslations: {
    sessionNameMissingErrorMessage: string;
    unknownErrorMessage: string;
    successMessage: string;
  },
  greentouchSessionName: string;
}

export default function FavoriteIconButton({FavoriteIconButtonTranslations, greentouchSessionName}: FavoriteIconButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {

        if(!greentouchSessionName){
            toast.error(FavoriteIconButtonTranslations.sessionNameMissingErrorMessage);
            return;
        }

        const result = await removeFavoriteSession(greentouchSessionName);

        if (!result.success) {
            toast.error(FavoriteIconButtonTranslations.unknownErrorMessage);
        } else {
            toast.success(
                FavoriteIconButtonTranslations.successMessage
            );
        }
    });
  };

  return (
    <LoadingButton
        onClick={handleClick}
        disabled={isPending}
        variant="ghost"
        loading={isPending}
        size="icon"
        className="p-2"
    >
        <Heart
            className="size-6 text-[#28a745] fill-[#28a745]"
        />
    </LoadingButton>
  );
}
