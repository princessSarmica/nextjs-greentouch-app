import { HeaderHamburger } from "./header_hamburger";
import { HeaderLogo } from "./header_logo";
import { HeaderLanguage } from "./header_language";
import UserButton from "./user-button";
import HeaderNavbar from "./header_navbar";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-6">

        {/* Left - Hamburger + Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0 py-4">
          <HeaderHamburger />
          <HeaderLogo />
        </div>

        {/* Middle - Navigation (desktop only) */}
        <HeaderNavbar />

        {/* Right - Language + Buttons */}
        <div className="flex items-center py-4">
          <HeaderLanguage />
          <UserButton />
        </div>

      </div>
    </header>
  );
}
