"use client";

import { authClient } from "@/lib/auth-client";
import AuthButtons from "./authButtons";
import UserDropdown from "./userDropdown";
import { Loader2 } from "lucide-react";

export default function UserButton(){

    //console.log("User Button rendered");

    const session = authClient.useSession();

    if(session.isPending){
        return <Loader2 className="animate-spin" />;
    }

    const user = session.data?.user;

    if(!user){
        return <AuthButtons />;
    }

    return <UserDropdown user={user} onSignOut={() => authClient.signOut({ fetchOptions: { onSuccess: () => {window.location.replace("/sign-in")}, onError: () => {window.location.replace("/sign-in")} } })} />;
}