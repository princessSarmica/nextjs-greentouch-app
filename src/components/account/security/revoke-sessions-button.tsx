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

export default function RevokeOtherSessions(){

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-600">Revoke Other Active Sessions</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Revoking all other active sessions will require you to sign in again on those devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction
                  onClick={async () => {
                  const res = await fetch("/api/security/revoke-other-sessions", { method: "POST" });
                  if (res.ok) {
                    toast.success("Other sessions revoked");
                  } else {
                    toast.error("Failed to revoke other sessions");
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
                  Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}