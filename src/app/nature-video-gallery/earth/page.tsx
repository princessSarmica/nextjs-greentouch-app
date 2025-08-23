import NatureGalleryPage from "@/components/natureVideoGalleryCategoryPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EarthPage() {

  //console.log("Nature Video Gallery Earth Page rendered");

  const session = await auth.api.getSession({
      headers: await headers()
  })

  if(!session) {
      redirect("/sign-in")
  }

  return <NatureGalleryPage slug="earth" />;
}
