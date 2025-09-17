import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    if(session.user.role !== "admin") {
        redirect("/account/profile")
    }

    return(
        <div className="text-center pt-12">
            <h1 className="text-4xl font-bold">Dashboard Page</h1>
        </div>
    )
}