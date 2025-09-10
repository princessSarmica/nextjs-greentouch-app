import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
    return await auth.api.getSession({
        headers: await headers()
    })
}
