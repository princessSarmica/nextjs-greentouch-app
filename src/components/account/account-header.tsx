import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AccountHeader({ children }: { children?: ReactNode }) {

  const session = await auth.api.getSession({
      headers: await headers()
  })

  if(!session) {
      redirect("/sign-in")
  }

  const name = session?.user?.name ?? "No name found";
  const position = (session?.user?.position ?? "No position found");

  return (
    <section className="w-full bg-[#f5f5f5]">
      <div className="w-full h-40 bg-primary/60">
        <div className="mx-auto w-full max-w-5xl h-full px-8 flex items-end">
          <div className="flex items-end gap-8">
             {children ? <div className="pb-10 sm:pb-10">{children}</div> : null}

            <div className="pb-10 sm:pb-15">
              <h1 className="text-2xl font-semibold text-foreground">{name}</h1>
              <p className="text-base font-semibold text-foreground">{position}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

