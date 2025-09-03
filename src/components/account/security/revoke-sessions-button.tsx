"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RevokeOtherSessions(){

  const session = authClient.useSession();
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={async () => {
        const res = await fetch("/api/security/revoke-other-sessions", { method: "POST" });
        if (res.ok) toast.success("Other sessions revoked");
        else {
          toast.error("Failed to revoke other sessions");
          authClient.signOut({
            fetchOptions: {
              onError: () => {
                session.refetch();
                router.push("/sign-in"); // redirect to sign-in page
              },
            },
          })
        }
      }}
        >
        Revoke Other Active Sessions
      </Button>
    </div>
  )
}