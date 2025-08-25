"use client";

import { authClient } from "@/lib/auth-client";
import AuthButtons from "./auth-buttons";
import UserDropdown from "./user-dropdown";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function UserButton(){

    const session = authClient.useSession();
    const router = useRouter();

    if(session.isPending){
        return <Loader2 className="animate-spin" />;
    }

    const user = session.data?.user;

    if(!user){
        return <AuthButtons />;
    }

    return <UserDropdown user={user} onSignOut={() => authClient.signOut({ fetchOptions: { onSuccess: () => {router.push("/")} } })} />;
}