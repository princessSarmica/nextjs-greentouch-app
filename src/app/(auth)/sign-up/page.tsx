"use client";

import { SignUpForm, SignUpFormValues } from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
    const router = useRouter();
    const [isPending, setPending] = useState(false);

    const handleSubmit = (values: SignUpFormValues) => {
        //console.log("Form values:", values);

        //console.log("Username:", values.username);

        authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.firstName + " " + values.lastName,
            username: values.username,
            university: values.university,
            specialization: values.specialization,
            motivation: values.motivation,
            position: values.position,
        },
        {
            onRequest: () => {
            setPending(true);
            },
            onResponse: () => {
            setPending(false);
            },
            onSuccess: () => {
            // Redirect to home page after successful sign-up
            router.push("/");
            },
            onError: ({ error }) => {
            console.error("Sign-up error:", error);
            toast.error("Error: " + error.message);
            },
        })
    };

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
                    <SignUpForm onSubmit={handleSubmit} isPending={isPending} />
            </section>
        </main>
    );
}