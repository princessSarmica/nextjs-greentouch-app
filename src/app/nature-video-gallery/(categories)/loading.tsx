import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const sections = [
    { title: "Sounds without music", dark: true },
    { title: "Sounds with music", dark: false },
  ];

  return (
    <main className="w-full min-h-screen bg-[#f5f5f5] text-gray-900 animate-pulse">
      {/* Breadcrumb + Title */}
      <section className="w-full max-w-5xl mx-auto px-4 pt-20 space-y-2 pb-10">
        <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-4 pb-10">
            <Skeleton className="h-10 w-1/3" />
        </div>
        <div className="flex items-center gap-4 pb-4">
            <Skeleton className="h-30 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </section>

      {/* Sections */}
      {sections.map((section, i) => (
        <section
            key={i}
            className={`w-full px-4 py-10 ${
                section.dark ? "bg-[#0A3730]" : "bg-[#f5f5f5]"
            }`}
        >
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-48" />
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, j) => (
                    <div
                    key={j}
                    className={`rounded-lg shadow overflow-hidden ${
                        section.dark ? "bg-white" : "bg-gray-50"
                    }`}
                    >
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-4 space-y-2">
                        <Skeleton className="h-3 w-24 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
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
