"use client";

import { authClient } from "@/lib/auth-client";
import AuthButtons from "./auth-buttons";
import UserDropdown from "./user-dropdown";
import { useRouter } from "next/navigation";

export default function UserButton(){

    const session = authClient.useSession();
    const router = useRouter();

    if(session.isPending){
        return null; //empty UI
    }

    const user = session.data?.user;

    if(!user){
        return <AuthButtons />;
    }

    return <UserDropdown user={user} onSignOut={() => authClient.signOut({ fetchOptions: { onSuccess: () => {router.push("/")} } })} />;
}