import type { Metadata } from "next";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {

    //console.log("Sign up Page rendered");

    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <section className="mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">

                {/* Header */}
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-left">
                        Register for the program
                    </h1>
                    <div className="mt-2 h-px w-full bg-[#0A3730]/70" />
                    <div className="mt-2 text-sm text-[#2E7D5A]">
                        * is required to fill
                    </div>

                </div>
                    <SignUpForm />
            </section>
        </main>
    );
}