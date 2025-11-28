import RevokeOtherSessions from "@/components/account/security/revoke-sessions-button";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Security() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    return(
        <>
            <p className="text-lg px-4 mb-4 text-gray-700">
                Manage your session security. You can revoke active sessions on other devices here.
            </p>

            <section className="pb-20">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">Revoke Other Sessions</h2>
                    <p className="text-base text-gray-700">
                    Sign out all other active sessions to keep your account safe.
                    </p>
                </div>

                <div className="shrink-0">
                    <RevokeOtherSessions />
                </div>
                </div>
            </section>
        </>
    )
}