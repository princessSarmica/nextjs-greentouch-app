"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, { message: "Username must be at least 3 characters." })
        .max(30, { message: "Username must be 30 characters or fewer." })
        .toLowerCase()
        .regex(/^[a-z0-9_-]+$/, {
            message: "Username may only contain letters, numbers, underscores, and hyphens.",
    }),
    password: z.string().min(1, { message: "Password is required." }),
});

type SignInFormValues = z.infer<typeof formSchema>;

export function SignInForm() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit({ username, password }: SignInFormValues) {

        setError(null);
        setLoading(true);

        const {error} = await authClient.signIn.username({ 
            username, 
            password 
        });

        setLoading(false);

        if (error) {
            setError(error.message || "Something went wrong.")
        } else {
            router.push("/");  
        }
    }

    return (
        <Card className="w-full max-w-md">
        <CardContent className="space-y-6 pt-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <PasswordInput
                            autoComplete="current-password"
                            placeholder="Password"
                            {...field}
                        />
                        </div>
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                    </FormItem>
                )}
                />

                {error && (
                    <div role="alert" className="text-sm text-red-600">
                        {error}
                    </div>
                )}

                <LoadingButton type="submit" className="w-full" loading={loading}>
                    Sign in
                </LoadingButton>
            </form>
            </Form>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
            <span className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
            </span>
        </CardFooter>
        </Card>
    );
}