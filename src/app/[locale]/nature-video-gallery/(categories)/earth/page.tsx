import NatureGalleryPage from "@/components/natureVideoGallery/natureVideoGalleryCategoryPage";

export default async function EarthPage() {

  //console.log("Nature Video Gallery Earth Page rendered");

  // Simulate a short delay for loading state
  //await new Promise((resolve) => setTimeout(resolve, 10000));

  return <NatureGalleryPage slug="earth" />;
}
