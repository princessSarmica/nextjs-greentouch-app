import { Card, CardContent } from "../../ui/card";

function NatureConnectednessInfoCard({ natureConnectednessValue, greentouchSessionName, natureConnectednessCreatedAt }: { natureConnectednessValue: number; greentouchSessionName: string; natureConnectednessCreatedAt: Date }) {

  return (
    <Card className="flex flex-col items-center justify-center text-center rounded-2xl shadow-sm border border-gray-200 bg-white py-6">
      <CardContent className="p-0 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {greentouchSessionName}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Your answer</p>
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
