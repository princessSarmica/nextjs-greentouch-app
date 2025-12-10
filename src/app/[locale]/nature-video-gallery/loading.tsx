import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return (
    <div>
        <div className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
          <div className="max-w-5xl mx-auto px-4">
            <Skeleton className="h-8 w-1/3 bg-white/40" />
          </div>
        </div>
        <div className="flex items-center justify-center h-screen bg-[#f5f5f5]">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#1F566E] border-[#d3d3d3]"></div>
        </div>
    </div>
  );
}
