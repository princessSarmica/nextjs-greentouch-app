import { getAllFavoriteSessions } from "@/actions/greentouch-session-user-data";
import FavoritedSessionCard from "@/components/account/favorites/favoritedSessionCard";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { greentouchSessions } from "@/app/data/greentouch-sessions-data";

export default async function Favorites() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
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

  const favoriteSessionDetails = favoritedSessions
    .map((fav) => greentouchSessions.find((s) => s.title === fav.name))
    .filter(Boolean);

  return (
    <div className="text-start pt-2">
      {favoriteSessionDetails.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {favoriteSessionDetails.map((session) => (
            <FavoritedSessionCard
              key={session!.id}
              greentouchSessionName={session!.title}
              greentouchSessionDescription={session!.description}
              greentouchSessionCoverPhoto={session!.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center pt-12">
          <p className="text-gray-500 italic">
            No matching sessions found for your favorites.
          </p>
        </div>
      )}
    </div>
  );
}
