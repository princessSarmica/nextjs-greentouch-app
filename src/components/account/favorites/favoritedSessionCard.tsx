import { Card, CardContent, CardFooter } from "../../ui/card";
import Image from "next/image";
import Link from "next/link";
import FavoriteIconButton from "./favoriteIconButton";

function FavoritedSessionCard({greentouchSessionId, greentouchSessionName, greentouchSessionDescription, greentouchSessionCoverPhoto }: { greentouchSessionId: string; greentouchSessionName: string; greentouchSessionDescription: string; greentouchSessionCoverPhoto: string }) {

  const imageSrc = greentouchSessionCoverPhoto || "/article-default-picture.png";

  return (
    <Card className="p-0 flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-shadow bg-white border-0 pb-6">
      <Link key={greentouchSessionName} href={`/sessions/${greentouchSessionName.toLowerCase().replace(/\s+/g, "-")}`} className="h-full">
        <div className="relative w-full h-40">
          <Image
            src={imageSrc}
            alt={greentouchSessionName}
            fill
            className="object-cover block"
          />
        </div>

        <CardContent className="px-4 pt-4">
          <h2 className="text-md font-semibold mb-2">
            {greentouchSessionName}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-6">
            {greentouchSessionDescription}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end">
        <div className="flex gap-4">
            <FavoriteIconButton greentouchSessionId={greentouchSessionId} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default FavoritedSessionCard;
