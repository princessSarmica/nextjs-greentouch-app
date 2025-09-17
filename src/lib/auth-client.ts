import { createAuthClient } from "better-auth/react"
import { adminClient, usernameClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [ 
        adminClient(), usernameClient(), inferAdditionalFields<typeof auth>() 
    ] 
})