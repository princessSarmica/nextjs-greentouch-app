"use client";

import { SignInForm, SignInFormValues } from "@/components/sign-in-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
    const router = useRouter();
    const [isPending, setPending] = useState(false);

    const handleSubmit = (values: SignInFormValues) => {
        //console.log("Form values:", values);

        authClient.signIn.username({
            username: values.username,
            password: values.password,
        },
        {
            onRequest: () => {
            setPending(true);
            },
            onResponse: () => {
            setPending(false);
            },
            onSuccess: () => {
            // Redirect to home page after successful sign-in
            router.push("/");
            },
            onError: ({ error }) => {
            console.error("Sign-in error:", error);
            toast.error("Error: " + error.message);
            },
        })
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <SignInForm onSubmit={handleSubmit} isPending={isPending} />
        </main>
    );
}