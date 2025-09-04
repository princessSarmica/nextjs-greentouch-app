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
      <main className="w-full  min-h-screen bg-[#f5f5f5] text-gray-900">
        <div className="mx-auto w-full max-w-5xl px-8">
          {children}
        </div>
      </main>
    </>
  )
}