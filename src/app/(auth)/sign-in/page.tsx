"use client";

import { SignInForm, SignInFormValues } from "@/components/sign-in-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

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
			<main className="bg-[#f5f5f5]"> 
				<section className="grid grid-cols-1 lg:grid-cols-2 w-full"> 
					<div className="relative h-[40vh] lg:h-screen"> 
						<Image src="/sign-in-photo.jpg" alt="Sunrise over valley road" fill priority className="object-cover" />
					</div>

					<div className="flex items-center justify-center lg:justify-start bg-[#f5f5f5]">
						<div className="w-full max-w-lg px-6 lg:px-12 lg:pl-20 py-10 lg:py-0 mx-auto lg:mx-0">
							<h1 className="text-3xl md:text-4xl font-semibold mb-10 text-center lg:text-left">
								Enter your account details and start exploring
							</h1>

							<SignInForm onSubmit={handleSubmit} isPending={isPending} />

							<p className="mt-6 text-xs text-muted-foreground max-w-md mx-auto lg:mx-0 text-center lg:text-left">
								Disclaimer: In case of losing your username or password, please
								contact the server administrator for assistance.
							</p>
						</div>
					</div>
				</section>
			</main>
    );
}