import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="text-center pt-12 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
      <Link href="/" className="text-[#1F566E] text-xl hover:underline font-medium mb-8">
        Return Home
      </Link>
      <Image
        src="/404-page-logo.svg"
        alt="Decorative tree"
        width={300}
        height={300}
        className="mx-auto"
      />
    </div>
  );
}
