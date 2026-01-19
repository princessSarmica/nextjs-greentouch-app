import NatureGalleryPage from "@/components/natureVideoGallery/natureVideoGalleryCategoryPage";

export default async function AnimalsPage() {

  //console.log("Nature Video Gallery Animals Page rendered");

  // Simulate a short delay for loading state
  //await new Promise((resolve) => setTimeout(resolve, 10000));

  return <NatureGalleryPage slug="animals" />;
}
