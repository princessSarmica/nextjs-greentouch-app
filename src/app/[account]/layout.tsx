import AccountHeader from "@/components/account/account-header";
import AccountNavbar from "@/components/account/account-navbar";
import AccountPicture from "@/components/account/account-picture";

export default function Layout ({children}: Readonly<{children: React.ReactNode;}>)  {
  return (
    <>
      <AccountHeader>
        <AccountPicture />
      </AccountHeader>
      <AccountNavbar />
      <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">
        {children}
      </main>
    </>
  )
}