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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

const [showPassword, setShowPassword] = useState(false);

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
                    <div className="relative">
                      <Input type={showPassword ? "text" :"password"} {...field} disabled={isPending} className="pr-10"/>
                      <button type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                        tabIndex={-1}
                        >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              variant={"secondary"}
              className="w-full"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
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