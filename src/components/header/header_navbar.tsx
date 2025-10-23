import { HeaderHamburger } from "./header_hamburger";
import { HeaderLogo } from "./header_logo";
import { HeaderNavigationLinks } from "./header_nav_links";
import { HeaderLanguage } from "./header_language";
import UserButton from "./user-button";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center py-4 px-6">

        {/* Left - Hamburger + Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <HeaderHamburger />
          <HeaderLogo />
        </div>

        {/* Middle - Navigation (desktop only) */}
        <HeaderNavigationLinks />

        {/* Right - Language + Buttons */}
        <div className="flex items-center">
          <HeaderLanguage />
          <UserButton />
        </div>

      </div>
    </header>
  );
}
