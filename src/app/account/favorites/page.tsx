import { getAllFavoriteSessions } from "@/actions/greentouch-session-user-data";
import FavoritedSessionCard from "@/components/account/favorites/favoritedSessionCard";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Favorites() {

    const session = await getServerSession();

    if(!session) {
        redirect("/sign-in")
    }

    const favoritedSessions = await getAllFavoriteSessions();

    if (!favoritedSessions.length) {
        return (
        <div className="text-center pt-12">
            <p className="text-gray-500 italic">
            You don&apos;t have any favorited sessions yet.
            </p>
        </div>
        );
    }
    return(
        <div className="text-start pt-2">
            {favoritedSessions.length !== 0 && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {favoritedSessions.map((card) => (
                            <FavoritedSessionCard
                                key={card.id}
                                greentouchSessionName={card.name}
                                greentouchSessionDescription={card.description}
                                greentouchSessionCoverPhoto={card.coverImage}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}