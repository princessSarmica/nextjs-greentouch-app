"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const [clickCount, setClickCount] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  const handleImageClick = () => {

    //Increase Counter
    setClickCount((prev) => (prev === null ? 1 : prev + 1));

    // Trigger Animation
    setAnimate(true);

    // After a short delay, remove the animation (so it can be triggered again)
    setTimeout(() => setAnimate(false), 100); // 100ms matches `duration-100`
  };

  return (
    <div className="text-center pt-12 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
      {/* Animated Number */}
      <h1
        className={`text-6xl font-bold mb-6 transition-transform duration-100 ${
          animate ? "scale-130" : ""
        }`}
      >
        {clickCount ?? "404"}
      </h1>

      <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>

      <Link
        href="/"
        className="text-[#1F566E] text-xl hover:underline font-medium mb-12"
      >
        Return Home
      </Link>

      {/* Animated Image */}
      <Image
        src="/404-page-logo.svg"
        alt="Decorative tree"
        width={300}
        height={300}
        className={`cursor-pointer transition-transform duration-100 ${
          animate ? "scale-90" : ""
        }`}
        onClick={handleImageClick}
      />
    </div>
  );
}
