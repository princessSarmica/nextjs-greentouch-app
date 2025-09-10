"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function RevokeOtherSessions(){

  const session = authClient.useSession();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Revoke Other Active Sessions</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Revoking all other active sessions will require you to sign in again on those devices.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
                onClick={async () => {
                const res = await fetch("/api/security/revoke-other-sessions", { method: "POST" });
                if (res.ok) {
                  toast.success("Other sessions revoked");
                } else {
                  toast.error("Failed to revoke other sessions");
                  authClient.signOut({
                    fetchOptions: {
                      onError: () => {
                        session.refetch();
                        window.location.replace('/sign-in') // redirect to sign-in page
                      },
                    },
                  })
                }
              }}
                >
                Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}