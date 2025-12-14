import { getServerSession } from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AccountHeader({ children }: { children?: ReactNode }) {

  const session = await getServerSession();

  if(!session) {
      redirect("/sign-in")
  }

  const t = await getTranslations('accountPage.additionalData');

  const name = session?.user?.name ?? t("header.noNameFound");
  const position = (session?.user?.position ?? t("header.noPositionFound"));

  return (
    <section className="w-full bg-[#f5f5f5]">
      <div className="w-full h-40 bg-primary/60">
        <div className="mx-auto w-full max-w-5xl h-full px-8 flex items-start">
          <div className="flex items-start gap-8 pt-10">
             {children ? <div>{children}</div> : null}

            <div>
              <h1 className="text-2xl font-semibold text-foreground">{name}</h1>
              {position === "student" ? t("header.positions.student") : ""}
              {position === "academic staff" ? t("header.positions.academicStaff") : ""}
              {position === "other" ? t("header.positions.other") : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

