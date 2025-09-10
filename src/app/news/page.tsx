import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
 
export default async function News() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }
 
    return (
        <div className="text-center pt-12">
            <h1 className="text-4xl font-bold">News Page</h1>
        </div>
    )
}