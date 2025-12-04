"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navigationHamburgerMenuTriggerStyleGhost } from "@/components/ui/navigation-menu";

export const HeaderHamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const t = useTranslations("header.navLinks");

  return (
    <>
      {/* Mobile hamburger icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden flex items-center focus:outline-none pr-2"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md">
          <nav className="flex flex-col px-4 text-left items-start w-full">
            {/* Discover */}
            <Link
              href="/discover-greentouch"
              className={navigationHamburgerMenuTriggerStyleGhost()}
              data-active={
                pathname.startsWith("/discover-greentouch") || undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {t("discoverGreenTouch")}
            </Link>

            {/* Sessions */}
            <Link
              href="/sessions"
              className={navigationHamburgerMenuTriggerStyleGhost()}
              data-active={pathname.startsWith("/sessions") || undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t("sessions")}
            </Link>

            {/* Nature Video Gallery */}
            <Link
              href="/nature-video-gallery"
              className={navigationHamburgerMenuTriggerStyleGhost()}
              data-active={
                pathname.startsWith("/nature-video-gallery") || undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {t("natureVideoGallery")}
            </Link>

            {/* News */}
            <Link
              href="/news"
              className={navigationHamburgerMenuTriggerStyleGhost()}
              data-active={pathname.startsWith("/news") || undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t("news")}
            </Link>

            {/* Resources */}
            <Link
              href="/resources"
              className={navigationHamburgerMenuTriggerStyleGhost()}
              data-active={pathname.startsWith("/resources") || undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t("resources")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
