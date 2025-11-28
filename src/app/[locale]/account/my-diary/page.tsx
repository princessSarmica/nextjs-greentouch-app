import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getAllDiaryEntries } from "@/actions/greentouch-session-user-data";
import AccountDiaryCard from "@/components/account/my-diary/accountDiaryCard";
import { getTranslations } from "next-intl/server";

export default async function MyDiary() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  const t = await getTranslations();

  const allSessionData = await getAllDiaryEntries();

  if (!allSessionData.length) {
    return (
      <div className="text-center pt-12">
        <p className="text-gray-500 italic">
          {t("accountPage.myDiaryPage.noEntriesMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 space-y-12">
      {allSessionData.map((sessionData) => {
        const normalizedName = sessionData.greentouchSessionName.replace(/[^a-zA-Z0-9]/g, "");

        const diaryQuestions = [
          t(`sessionsPage.greentouchSessions.${normalizedName}.diaryQuestions.question1`)
        ];

        if (sessionData.greentouchSessionName === "session-5") {
          diaryQuestions.push(
            t(`sessionsPage.greentouchSessions.${normalizedName}.diaryQuestions.question2`)
          );
        }
    
        return (
          <AccountDiaryCard
            accountDiaryCardTranslations={{
              diaryNote: t("sessionsPage.additionalData.diaryCard.diaryNote"),
              noQuestionsAvailable: t("sessionsPage.additionalData.diaryCard.noQuestionsAvailable"),
              actionButton: t("sessionsPage.additionalData.diaryCard.actionButton"),
              title: t(`sessionsPage.greentouchSessions.${normalizedName}.title`),
              diaryQuestions: diaryQuestions
            }}
            key={sessionData.greentouchSessionName}
            greentouchSessionId={sessionData.greentouchSessionId}
            greentouchSessionName={sessionData.greentouchSessionName}
            initialDiaryText={sessionData.initialDiaryText}
          />
        );
      })}
    </div>
  );
}
