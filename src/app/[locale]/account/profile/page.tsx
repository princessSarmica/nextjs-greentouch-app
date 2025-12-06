import { getAllCompletedSessionsNumberInfo, getAllNatureConnectednessInfo } from "@/actions/greentouch-session-user-data";
import NatureConnectednessInfoCard from "@/components/account/profile/natureConnectednessInfoCard";
import SessionsCompletionCard from "@/components/account/profile/sessionsCompletionCard";
import { getServerSession } from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Profile() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    const t = await getTranslations("accountPage.profilePage");

    const completedSessionsInfo = await getAllCompletedSessionsNumberInfo();
    const uncompletedSessionsInfo = 7 - completedSessionsInfo;
    const natureConnectednessInfoCards = await getAllNatureConnectednessInfo();

    return(
        <div className="text-start pt-2">
            <h1 className="text-xl font-bold mb-10">{t("trackYourProgress")}</h1>

            <h1 className="text-base font-bold">{t("sessionsCompletionCard.sessionsCompletionTitle")}</h1>
            <div className="gap-4 my-6">
                <SessionsCompletionCard
                    completed={completedSessionsInfo}
                    uncompleted={uncompletedSessionsInfo}
                    completedLabel={t("sessionsCompletionCard.completedSessions")}
                    uncompletedLabel={t("sessionsCompletionCard.uncompletedSessions")}
                />
            </div>

            {natureConnectednessInfoCards.length !== 0 && (
                <>
                    <h1 className="text-base font-bold">{t("natureConnectednessInfoCards.natureConnectednessOverTime")}</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
                        {natureConnectednessInfoCards.map((card) => (
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