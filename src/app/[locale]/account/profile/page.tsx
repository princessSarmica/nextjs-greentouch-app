import { getAllCompletedSessionsNumberInfo, getAllNatureConnectednessInfo } from "@/actions/greentouch-session-user-data";
import NatureConnectednessInfoCard from "@/components/account/profile/natureConnectednessInfoCard";
import SessionsCompletionCard from "@/components/account/profile/sessionsCompletionCard";
import { getServerSession } from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Profile() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    const t = await getTranslations("accountPage.profilePage");

    const completedSessionsInfo = await getAllCompletedSessionsNumberInfo();
    if (completedSessionsInfo.success  === false) {
        console.error("Error fetching completed sessions entries:", completedSessionsInfo.error);
        toast.error(t("fetchErrorMessage"));
    }

    const uncompletedSessionsInfo = 7 - (completedSessionsInfo.completedSessions ?? 0);
    
    const natureConnectednessInfoCards = await getAllNatureConnectednessInfo();
    if (natureConnectednessInfoCards.success === false) {
        console.error("Error fetching nature connectedness entries:", natureConnectednessInfoCards.error);
        toast.error(t("fetchErrorMessage"));
    }

    if (!natureConnectednessInfoCards.userData?.length && completedSessionsInfo.success === false) {
        return (
            <div className="text-start pt-2">
                <h1 className="text-xl font-bold mb-10">{t("trackYourProgress")}</h1>
            </div>
        );
    }

    if (!natureConnectednessInfoCards.userData?.length) {
        return (
            <div className="text-start pt-2">
                <h1 className="text-xl font-bold mb-10">{t("trackYourProgress")}</h1>

                <h1 className="text-base font-bold">{t("sessionsCompletionCard.sessionsCompletionTitle")}</h1>
                <div className="gap-4 my-6">
                    <SessionsCompletionCard
                        completed={completedSessionsInfo.completedSessions ?? 0}
                        uncompleted={uncompletedSessionsInfo}
                        completedLabel={t("sessionsCompletionCard.completedSessions")}
                        uncompletedLabel={t("sessionsCompletionCard.uncompletedSessions")}
                    />
                </div>
            </div>
        );
    }
    
    if (completedSessionsInfo.success === false) {
        return (
            <div className="text-start pt-2">
                <h1 className="text-xl font-bold mb-10">{t("trackYourProgress")}</h1>

                {natureConnectednessInfoCards.userData.length !== 0 && (
                    <>
                        <h1 className="text-base font-bold">{t("natureConnectednessInfoCards.natureConnectednessOverTime")}</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
                            {natureConnectednessInfoCards.userData.map((card) => (
                                <NatureConnectednessInfoCard
                                    key={card.id}
                                    greentouchSessionName={card.greentouchSessionName}
                                    natureConnectednessValue={card.natureConnectednessValue}
                                    natureConnectednessCreatedAt={card.natureConnectednessCreatedAt}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
    
    return(
        <div className="text-start pt-2">
            <h1 className="text-xl font-bold mb-10">{t("trackYourProgress")}</h1>

            <h1 className="text-base font-bold">{t("sessionsCompletionCard.sessionsCompletionTitle")}</h1>
            <div className="gap-4 my-6">
                <SessionsCompletionCard
                    completed={completedSessionsInfo.completedSessions ?? 0}
                    uncompleted={uncompletedSessionsInfo}
                    completedLabel={t("sessionsCompletionCard.completedSessions")}
                    uncompletedLabel={t("sessionsCompletionCard.uncompletedSessions")}
                />
            </div>

            {natureConnectednessInfoCards.userData.length !== 0 && (
                <>
                    <h1 className="text-base font-bold">{t("natureConnectednessInfoCards.natureConnectednessOverTime")}</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
                        {natureConnectednessInfoCards.userData.map((card) => (
                            <NatureConnectednessInfoCard
                                key={card.id}
                                greentouchSessionName={card.greentouchSessionName}
                                natureConnectednessValue={card.natureConnectednessValue}
                                natureConnectednessCreatedAt={card.natureConnectednessCreatedAt}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}