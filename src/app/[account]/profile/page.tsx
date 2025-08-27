import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect("/sign-in")
    }

    return(
        <div className="text-center pt-12">
            <h1 className="text-4xl font-bold">Profile Page</h1>
        </div>
    )
}