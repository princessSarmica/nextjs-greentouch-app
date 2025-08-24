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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(3).max(30).trim().toLowerCase().refine((value) => {
    // Allow only alphanumeric characters, underscores, and hyphens
    return /^[a-zA-Z0-9_-]+$/.test(value);
  }, {
    message: "Username may only contain letters, numbers, underscores, and hyphens.",
  }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type SignInFormValues = z.infer<typeof formSchema>;

export type SignInFormProps = {
  onSubmit: (values: SignInFormValues) => void;
  isPending?: boolean;
  errorMessage?: string | null;
  redirectUrl?: string | null;
};

export function SignInForm({
  onSubmit,
  isPending,
  redirectUrl,
}: SignInFormProps) {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back! Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={isPending} />
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
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <span className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href={
              redirectUrl
                ? `/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`
                : "/sign-up"
            }
            className="text-primary underline hover:opacity-80"
          >
            Sign up
          </a>
        </span>
      </CardFooter>
    </Card>
  );
}