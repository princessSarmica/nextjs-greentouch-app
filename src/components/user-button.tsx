"use client";

import { authClient } from "@/lib/auth-client";
import AuthButtons from "./auth-buttons";
import UserDropdown from "./user-dropdown";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserButton(){

    //console.log("User Button rendered");

    const session = authClient.useSession();
    const router = useRouter();

    if(session.isPending){
        return <Loader2 className="animate-spin" />;
    }

    const user = session.data?.user;

    if(!user){
        return <AuthButtons />;
    }

    return <UserDropdown user={user} onSignOut={() => authClient.signOut({ fetchOptions: { onSuccess: () => {router.push("/sign-in")}, onError: () => {session.refetch(); router.push("/sign-in")} } })} />;
}