import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  slug: string;
};

type Video = {
  title: string;
  description: string;
  youtubeUrlWithMusic: string;
  youtubeUrlWithoutMusic: string;
};

type Section = {
  title: string;
  icon: string;
  background: "dark" | "light";
  getUrl: (video: Video) => string;
  label: string;
};

export default function NatureGalleryPage({ slug }: Props) {
  const t = useTranslations("natureVideoGalleryPage.categoryPage");

  // Prevedeni podatki kategorije (title, description, videos[])
  const category = t.raw(`categories.${slug}`) as {
    title: string;
    heroSection: {
      paragraph1: string;
      paragraph2: string;
    };
    videos: Video[];
  };

  const breadcrumbRoot = t("breadcrumbItem1");
  const withMusicLabel = t("withMusicLabel");
  const withoutMusicLabel = t("withoutMusicLabel");

  const sections: Section[] = [
    {
      title: t("soundsWithoutMusicTitle", { default: "Sounds without music" }),
      icon: "/no-music-icon.svg",
      background: "dark",
      getUrl: (video: Video) => video.youtubeUrlWithoutMusic,
      label: withoutMusicLabel,
    },
    {
      title: t("soundsWithMusicTitle", { default: "Sounds with music" }),
      icon: "/music-icon.svg",
      background: "light",
      getUrl: (video: Video) => video.youtubeUrlWithMusic,
      label: withMusicLabel,
    },
  ];

  return (
    <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Breadcrumb + title */}
      <section className="w-full max-w-5xl mx-auto px-4 pt-20">
        <div className="text-sm text-gray-500 mb-2">
          <Link
            href="/nature-video-gallery"
            className="text-[#1F566E] hover:underline font-medium"
          >
            {breadcrumbRoot}
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{category.title}</span>
        </div>

        <h1 className="text-3xl font-bold">{category.title}</h1>
        <p className="text-lg text-gray-700 whitespace-pre-line my-8">
          {category.heroSection.paragraph1}
        </p>
        <p className="text-lg text-gray-700 whitespace-pre-line my-8">
          {category.heroSection.paragraph2}
        </p>
      </section>

      {/* Sections */}
      {sections.map((section, i) => (
        <section
          key={i}
          className={`w-full px-4 py-10 ${
            section.background === "dark"
              ? "bg-[#0A3730] text-white"
              : "bg-[#f5f5f5] text-gray-900"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <Image
                src={section.icon}
                alt="section icon"
                width={25}
                height={25}
                className="inline-block"
              />
              {section.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.videos.map((video: Video, j: number) => (
                <div
                  key={j}
                  className={`rounded-lg shadow overflow-hidden ${
                    section.background === "dark"
                      ? "bg-white text-gray-900"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={section.getUrl(video).replace("watch?v=", "embed/")}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase text-green-700 mb-2">
                      {section.label}
                    </p>
                    <h3 className="text-base font-bold mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-700">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
