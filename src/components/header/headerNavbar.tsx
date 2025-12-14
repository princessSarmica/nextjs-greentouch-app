"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLinkGhost,
  NavigationMenuList,
  navigationMenuTriggerStyleGhost,
} from "@/components/ui/navigation-menu"
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeaderNavbar(){

  const pathname = usePathname();

  const t = useTranslations('header.navLinks');
  
  return (
        <div className="hidden lg:flex items-stretch w-full max-w-5xl justify-center text-gray-900">
          <NavigationMenu viewport={false} className="w-full max-w-none items-stretch justify-center">
            <NavigationMenuList className="flex items-stretch justify-start gap-4 px-8">
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/discover-greentouch") || undefined}>
                  <Link href="/discover-greentouch">{t('discoverGreenTouch')}</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/sessions") || undefined}>
                  <Link href="/sessions">{t('sessions')}</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/nature-video-gallery") || undefined}>
                  <Link href="/nature-video-gallery">{t('natureVideoGallery')}</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/news") || undefined}>
                  <Link href="/news">{t('news')}</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/resources") || undefined}>
                  <Link href="/resources">{t('resources')}</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
  );
}