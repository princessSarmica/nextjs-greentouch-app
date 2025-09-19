import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
 
export default async function News() {
    const session = await getServerSession();
 
    if(!session) {
        redirect("/sign-in")
    }
 
    return (
        <div className="text-center pt-12">
            <h1 className="text-4xl font-bold">News Page</h1>
            <Button asChild variant={"default"} className="px-6 py-6"> 
                <Link href="/news/add-news">Add News Article</Link>
            </Button>
        </div>
    )
}