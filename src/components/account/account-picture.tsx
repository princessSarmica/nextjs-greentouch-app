import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function initials(input: string) {
  return input
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export default async function AccountPicture(){

  const session = await auth.api.getSession({
      headers: await headers()
  })

  if(!session) {
      redirect("/sign-in")
  }

  return (
    <nav>
      <Avatar className="size-20">
        <AvatarImage src="/path/to/image.jpg" alt="User Avatar" />
        <AvatarFallback>{initials(session.user.name)}</AvatarFallback>
      </Avatar>
    </nav>
  );
}
