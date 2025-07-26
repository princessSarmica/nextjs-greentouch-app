import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-[#f5f5f5] px-6 py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Left - Information */}
        <div className="flex flex-col gap-4 min-w-[150px]">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Information</h3>
          <div className="w-64 h-px bg-[#f5f5f5] mb-2" />
          <ul className="flex flex-col gap-2 text-sm text-[#f5f5f5]">
            <li>
              <a>Terms</a>
            </li>
            <li>
              <a>Privacy policy</a>
            </li>
            <li>
              <a>Support</a>
            </li>
          </ul>
        </div>

        {/* Middle - Connect */}
        <div className="flex flex-col gap-4 min-w-[150px]">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Connect</h3>
          <div className="w-64 h-px bg-[#f5f5f5] mb-2" />
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image src="/facebook-icon.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Right - EU Funded */}
        <div className="flex flex-col items-center text-center gap-3 min-w-[150px]">
          <Image src="/eu-flag.svg" alt="EU logo" width={40} height={28} />
          <p className="text-xs text-[#f5f5f5] leading-tight">
            This project is funded<br />by the EU.
          </p>
        </div>
      </div>
    </footer>
  );
}
