import AccountHeader from "@/components/account/account-header";
import AccountNavbar from "@/components/account/account-navbar";
import AccountPicture from "@/components/account/account-picture";
import { getTranslations } from "next-intl/server";

export default async function Layout ({children}: Readonly<{children: React.ReactNode;}>)  {

  const t = await getTranslations('accountPage.additionalData.navbar');

  return (
    <>
      <AccountHeader>
        <AccountPicture />
      </AccountHeader>
      <AccountNavbar 
        navbarItemsTranslations={{
          profile: t("profile"),
          myDiary: t("myDiary"),
          favorites: t("favorites"),
          security: t("security"),
          admin: t("admin")
        }}
      />
      <main className="w-full  min-h-screen bg-[#f5f5f5] text-gray-900">
        <div className="mx-auto w-full max-w-5xl px-4">
          {children}
        </div>
      </main>
    </>
  )
}