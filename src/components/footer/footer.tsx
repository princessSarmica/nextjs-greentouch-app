import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {

  const t = useTranslations('footer');

  return (
    <footer className="bg-[#1C1C1C] text-[#f5f5f5] px-6 py-12 min-h-[200px] md:min-h-[180px] shrink-0">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 items-start">
        
        {/* Left - Information */}
        <div className="flex flex-col gap-4 min-w-[150px]">
          <h4 className="text-base font-semibold uppercase tracking-wide">{t('information')}</h4>
          <div className="w-64 h-px bg-[#f5f5f5] mb-2" />
          <ul className="flex flex-col gap-2 text-sm text-[#f5f5f5]">
            <li>
              <Link href="/cookies">
                {t('cookies')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Middle - Connect */}
        <div className="flex flex-col gap-4 min-w-[150px]">
          <h4 className="text-base font-semibold uppercase tracking-wide">{t('connect')}</h4>
          <div className="w-64 h-px bg-[#f5f5f5] mb-2" />
          <div className="flex gap-4 min-h-[24px]">
            <a
              href="https://www.facebook.com/people/GreenTouch-Erasmus/61568551981583/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image src="/facebook-icon.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a
              href="https://www.instagram.com/greentoucherasmus/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/greentouch-erasmus"
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
          <p className="text-xs text-[#f5f5f5] leading-tight min-h-[48px]">
            {t('europeanFunding')}
          </p>
        </div>
      </div>
    </footer>
  );
}
