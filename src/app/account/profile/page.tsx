import { getAllNatureConnectednessInfo } from "@/actions/greentouch-session-user-data";
import NatureConnectednessInfoCard from "@/components/account/profile/natureConnectednessInfoCard";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Profile() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    const natureConnectednessInfoCards = await getAllNatureConnectednessInfo();

    return(
        <div className="text-start pt-2">
            <h1 className="text-xl font-bold mb-10">Track your progress</h1>
            {natureConnectednessInfoCards.length !== 0 && (
                <>
                    <h1 className="text-base font-bold">Nature Connectedness (rated 1 - 10)</h1>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4 mt-6">
                        {natureConnectednessInfoCards.map((card) => (
                            <NatureConnectednessInfoCard
                                key={card.id}
                                greentouchSessionName={card.greentouchSessionName}
                                natureConnectednessValue={card.natureConnectednessValue}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}