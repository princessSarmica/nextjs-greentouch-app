import NatureGalleryPage from "@/components/natureVideoGallery/natureVideoGalleryCategoryPage";

export default async function AirPage() {

  //console.log("Nature Video Gallery Air Page rendered");

  // Simulate a short delay for loading state
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  return <NatureGalleryPage slug="air" />;
}
