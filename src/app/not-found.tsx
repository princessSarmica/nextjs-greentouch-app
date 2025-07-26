import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center pt-12">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <Link href="/">Return Home</Link>
    </div>
  )
}