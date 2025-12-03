import RevokeOtherSessions from "@/components/account/security/revoke-sessions-button";
import { getServerSession } from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Security() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    const t = await getTranslations("accountPage.securityPage");

    return(
        <>
            <p className="text-lg px-4 mb-4 text-gray-700">
                {t("description")}
            </p>

            <section className="pb-20">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{t("cardTitle")}</h2>
                    <p className="text-base text-gray-700">
                    {t("cardDescription")}
                    </p>
                </div>

                <div className="shrink-0">
                    <RevokeOtherSessions 
                        accountSecurityAlertDialogTranslations={{
                            button: t("alertDialog.button"),
                            title: t("alertDialog.title"),
                            description: t("alertDialog.description"),
                            cancelButton: t("alertDialog.cancelButton"),
                            actionButton: t("alertDialog.actionButton"),
                            successMessage: t("alertDialog.successMessage"),
                            errorMessage: t("alertDialog.errorMessage")
                        }}
                    />
                </div>
                </div>
            </section>
        </>
    )
}