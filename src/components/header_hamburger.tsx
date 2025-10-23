"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"

export const HeaderHamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  //console.log("HeaderHamburger component rendered");
  
  return (
    <>
      {/* Mobile hamburger icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden flex items-center focus:outline-none pr-2"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40 flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
          <Link href="/discover-greentouch" onClick={() => setMenuOpen(false)}>
            Discover GreenTouch
          </Link>
          <Link href="/sessions" onClick={() => setMenuOpen(false)}>
            Sessions
          </Link>
          <Link href="/nature-video-gallery" onClick={() => setMenuOpen(false)}>
            Nature Video Gallery
          </Link>
          <Link href="/news" onClick={() => setMenuOpen(false)}>
            News
          </Link>
          <Link href="/resources" onClick={() => setMenuOpen(false)}>
            Resources
          </Link>
        </div>
      )}
    </>
  );
};
