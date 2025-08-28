import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountHeader(){

  const session = await auth.api.getSession({
      headers: await headers()
  })

  if(!session) {
      redirect("/sign-in")
  }

  const name = session?.user?.name ?? "No name found";
  const position = (session?.user?.position ?? "No position found");

  return (
    <div className="w-full h-40 bg-primary/60">
      <div className="mx-auto w-full max-w-5xl h-full px-4 flex items-end">
        <div className="py-15">
          <h1 className="text-2xl font-semibold text-foreground">
            {name}
          </h1>
          <p className="text-base font-semibold text-foreground">{position}</p>
        </div>
      </div>
    </div>
  );
}

