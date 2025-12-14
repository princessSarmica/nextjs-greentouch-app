import NatureGalleryPage from "@/components/natureVideoGallery/natureVideoGalleryCategoryPage";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function EarthPage() {

  //console.log("Nature Video Gallery Earth Page rendered");

  const session = await getServerSession();

  if(!session) {
      redirect("/sign-in")
  }

  // Simulate a short delay for loading state
  //await new Promise((resolve) => setTimeout(resolve, 10000));

  return <NatureGalleryPage slug="earth" />;
}
