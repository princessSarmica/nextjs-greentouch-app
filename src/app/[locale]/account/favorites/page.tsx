import { getAllFavoriteSessions } from "@/actions/greentouch-session-user-data";
import FavoritedSessionCard from "@/components/account/favorites/favoritedSessionCard";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function Favorites() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  const t = await getTranslations();

  const favoritedSessions = await getAllFavoriteSessions();

  if (!favoritedSessions.length) {
    return (
      <div className="text-center pt-12">
        <p className="text-gray-500 italic">
          {t("accountPage.favoritesPage.noFavoritesMessage")}
        </p>
      </div>
    );
  }

  const favoriteSessionDetails = favoritedSessions
  .map((fav) => {
    const normalizedName = fav.name.replace(/[^a-zA-Z0-9]/g, "");

    return {
      id: fav.id, // originalni ID iz baze
      localName: t(`sessionsPage.greentouchSessions.${normalizedName}.localName`),
      title: t(`sessionsPage.greentouchSessions.${normalizedName}.title`),
      description: t(`sessionsPage.greentouchSessions.${normalizedName}.description`),
      image: t(`sessionsPage.greentouchSessions.${normalizedName}.image`)
    };
  })
  .filter(Boolean);

  return (
    <div className="text-start pt-2">
      {favoriteSessionDetails.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {favoriteSessionDetails.map((session) => (
            <FavoritedSessionCard
              key={session!.id}
              greentouchSessionLocalName={session!.localName}
              greentouchSessionName={session!.title}
              greentouchSessionDescription={session!.description}
              greentouchSessionCoverPhoto={session!.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center pt-12">
          <p className="text-gray-500 italic">
            {t("accountPage.favoritesPage.noFavoritesMessage")}
          </p>
        </div>
      )}
    </div>
  );
}
