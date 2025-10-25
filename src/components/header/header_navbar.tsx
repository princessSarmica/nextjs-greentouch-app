"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLinkGhost,
  NavigationMenuList,
  navigationMenuTriggerStyleGhost,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function HeaderNavbar(){
  const pathname = usePathname();

  return (
        <div className="hidden lg:flex items-stretch w-full max-w-5xl justify-center text-gray-900">
          <NavigationMenu viewport={false} className="w-full max-w-none items-stretch justify-center">
            <NavigationMenuList className="flex items-stretch justify-start gap-4 px-8">
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/discover-greentouch") || undefined}>
                  <Link href="/discover-greentouch">Discover GreenTouch</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/sessions") || undefined}>
                  <Link href="/sessions">Sessions</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/nature-video-gallery") || undefined}>
                  <Link href="/nature-video-gallery">Nature Video Gallery</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/news") || undefined}>
                  <Link href="/news">News</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLinkGhost asChild className={navigationMenuTriggerStyleGhost()} data-active={pathname.startsWith("/resources") || undefined}>
                  <Link href="/resources">Resources</Link>
                </NavigationMenuLinkGhost>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
  );
}