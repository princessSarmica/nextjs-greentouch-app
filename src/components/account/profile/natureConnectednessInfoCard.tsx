import { Card, CardContent } from "../../ui/card";
import { getTranslations } from "next-intl/server";

async function NatureConnectednessInfoCard({ natureConnectednessValue, greentouchSessionName, natureConnectednessCreatedAt }: { natureConnectednessValue: number; greentouchSessionName: string; natureConnectednessCreatedAt: Date }) {

  const t = await getTranslations("accountPage.profilePage.natureConnectednessInfoCards");
  const greenTouchessions = await getTranslations("sessionsPage.greentouchSessions");
  const sesssionTitle = greenTouchessions(`${greentouchSessionName.replace(/[^a-zA-Z0-9]/g, "")}.title`);

  return (
    <Card className="flex flex-col items-center justify-center text-center rounded-2xl shadow-sm border border-gray-200 bg-white py-6">
      <CardContent className="p-0 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {sesssionTitle}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{t("yourAnswer")}</p>
        <p className="text-4xl font-bold text-green-700 mt-3">
          {natureConnectednessValue}
        </p>
        <p className="text-sm text-gray-500 mt-6">
          {natureConnectednessCreatedAt.toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default NatureConnectednessInfoCard;
