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
        <main className="min-h-screen flex items-center justify-center p-4">
            <SignUpForm onSubmit={handleSubmit} isPending={isPending} />
        </main>
    );
}