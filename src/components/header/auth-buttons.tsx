import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export default function AuthButtons() {

  //console.log("AuthButtons rendered");

  const t = useTranslations('header.authButtons');

  return (
    <div className="flex items-center">
        {/* Buttons */}
        <Button asChild variant={"ghost"}>
          <Link href="/sign-up">{t('signUp')}</Link>
        </Button> 

        <Button asChild variant={"default"}>
          <Link href="/sign-in">{t('signIn')}</Link>
        </Button>
    </div>
  );
}
