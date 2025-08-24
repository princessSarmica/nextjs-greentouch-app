import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [ 
        usernameClient(), inferAdditionalFields<typeof auth>() 
    ] 
})