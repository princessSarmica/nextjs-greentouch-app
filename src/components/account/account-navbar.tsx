"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyleSecondary
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AccountNavbar(){
  const pathname = usePathname();
  return (
    <div className="w-full bg-[#f5f5f5] text-gray-900">
      <div className="mx-auto w-full max-w-5xl flex flex-col pt-4">
      <div className="overflow-x-auto">
      <NavigationMenu viewport={false} className="w-full max-w-none justify-start">
        <NavigationMenuList className="justify-start gap-6 px-8">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/profile" || undefined}>
              <Link href="/account/profile">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/my-diary" || undefined}>
              <Link href="/account/my-diary">My Diary</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/favorites" || undefined}>
              <Link href="/account/favorites">Favorites</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/security" || undefined}>
              <Link href="/account/security">Security</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div className="mt-4 mb-8 border-t border-gray-300" />
    </div>
    </div>
  );
}