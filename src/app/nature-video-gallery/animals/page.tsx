import NatureGalleryPage from "@/components/natureVideoGalleryCategoryPage";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AnimalsPage() {

  //console.log("Nature Video Gallery Animals Page rendered");

  const session = await getServerSession();

  if(!session) {
      redirect("/sign-in")
  }

  return <NatureGalleryPage slug="animals" />;
}
