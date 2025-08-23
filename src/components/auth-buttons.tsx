import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthButtons() {

  //console.log("AuthButtons component rendered");

  return (
    <div className="flex items-center">
        {/* Buttons */}
        <Button asChild variant={"ghost"}>
          <Link href="/sign-up">Register</Link>
        </Button> 

        <Button asChild variant={"default"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
    </div>
  );
}
