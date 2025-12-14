import { HeaderHamburger } from "./headerHamburger";
import { HeaderLogo } from "./headerLogo";
import UserButton from "./userButton";
import HeaderNavbar from "./headerNavbar";
import HeaderLanguageSwitcher from "./headerLanguageSwitcher";

export default function Header() {

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4">

        {/* Left - Hamburger + Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0 py-4">
          <HeaderHamburger />
          <HeaderLogo />
        </div>

        {/* Middle - Navigation (desktop only) */}
        <HeaderNavbar />

        {/* Right - Language + Buttons */}
        <div className="flex items-center py-4">
          <HeaderLanguageSwitcher />
          <UserButton />
        </div>

      </div>
    </header>
  );
}
