import Link from "next/link";

export default function NotAvailable() {
    return (
        <main>
            <div className="text-center pt-12 bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">This session is not yet available</h1>

                <Link
                    href="/sessions"
                    className="text-[#1F566E] text-xl hover:underline font-medium mb-12"
                >
                    Return to Sessions list
                </Link>

            </div>
        </main>
    );
}