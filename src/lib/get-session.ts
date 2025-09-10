import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache} from "react";

// A cached function to get the server session
// This prevents multiple calls to getSession during a single request
export const getServerSession = cache(async () => {

    //console.log("getServerSession called");

    return await auth.api.getSession({
        headers: await headers()
    })
})
