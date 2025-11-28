"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyleSecondary
} from "@/components/ui/navigation-menu"
import { Link, usePathname } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

interface AccountNavbarProps {
  navbarItemsTranslations: {
    profile: string;
    myDiary: string;
    favorites: string;
    security: string;
    admin: string;
  }
}

export default function AccountNavbar({ navbarItemsTranslations }: AccountNavbarProps){
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="w-full bg-[#f5f5f5] text-gray-900">
      <div className="mx-auto w-full max-w-5xl flex flex-col pt-4">
      <div className="overflow-x-auto">
      <NavigationMenu viewport={false} className="w-full max-w-none justify-start">
        <NavigationMenuList className="justify-start gap-4 px-8">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/profile" || undefined}>
              <Link href="/account/profile">{navbarItemsTranslations.profile}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/my-diary" || undefined}>
              <Link href="/account/my-diary">{navbarItemsTranslations.myDiary}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/favorites" || undefined}>
              <Link href="/account/favorites">{navbarItemsTranslations.favorites}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/security" || undefined}>
              <Link href="/account/security">{navbarItemsTranslations.security}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
           {isAdmin ? (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyleSecondary()} data-active={pathname === "/account/admin" || pathname.startsWith("/account/admin/") || undefined}>
                <Link href="/account/admin">{navbarItemsTranslations.admin}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : null}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div className="mt-4 mb-8 border-t border-gray-300" />
    </div>
    </div>
  );
}