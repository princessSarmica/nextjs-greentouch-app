import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function AdminPage() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    if(session.user.role !== "admin") {
        redirect("/account/profile")
    }

    const t = await getTranslations();

    return(
        <div className="text-center pt-12">
            <h1 className="text-4xl font-bold">{t("accountPage.adminPage.description")}</h1>
        </div>
    )
}