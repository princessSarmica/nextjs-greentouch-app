"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

interface accountSecurityTranslationsProps {
  accountSecurityAlertDialogTranslations: {
    button: string;
    title: string;
    description: string;
    cancelButton: string;
    actionButton: string;
    successMessage: string;
    errorMessage: string;
  }
}

export default function RevokeOtherSessions({ accountSecurityAlertDialogTranslations }: accountSecurityTranslationsProps) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-600">{accountSecurityAlertDialogTranslations.button}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{accountSecurityAlertDialogTranslations.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {accountSecurityAlertDialogTranslations.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">{accountSecurityAlertDialogTranslations.cancelButton}</Button>
            </AlertDialogCancel>
            <AlertDialogAction
                  onClick={async () => {
                  const res = await fetch("/api/security/revoke-other-sessions", { method: "POST" });
                  if (res.ok) {
                    toast.success(accountSecurityAlertDialogTranslations.successMessage);
                  } else {
                    toast.error(accountSecurityAlertDialogTranslations.errorMessage);
                    authClient.signOut({
                      fetchOptions: {
                        onError: () => {
                          window.location.replace("/sign-in"); // redirect to sign-in page
                        },
                      },
                    })
                  }
                }}
                className="bg-red-500 hover:bg-red-600"
                  >
                  {accountSecurityAlertDialogTranslations.actionButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}