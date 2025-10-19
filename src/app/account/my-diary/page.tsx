import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getAllDiaryEntries } from "@/actions/greentouch-session-user-data";
import AccountDiaryCard from "@/components/account/my-diary/accountDiaryCard";

export default async function MyDiary() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  const allSessionData = await getAllDiaryEntries();

  if (!allSessionData.length) {
    return (
      <div className="text-center pt-12">
        <p className="text-gray-500 italic">
          You don’t have any diary entries yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 space-y-12">
      {allSessionData.map((sessionData) => (
        <AccountDiaryCard
          key={sessionData.greentouchSessionName}
          greentouchSessionId={sessionData.greentouchSessionId}
          greentouchSessionName={sessionData.greentouchSessionName}
          initialDiaryText={sessionData.initialDiaryText}
        />
      ))}
    </div>
  );
}
