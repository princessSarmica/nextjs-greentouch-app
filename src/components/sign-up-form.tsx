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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const POSITIONS = ["student", "academic_staff", "other"] as const;
const MOTIVATIONS = ["personal_interest", "professional_interest", "personal_and_professional_interest"] as const;

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      }),
    confirmPassword: z.string(),
    username: z.string().min(3, { message: "Username must be at least 3 characters." }).max(30).trim().refine((value) => {
        // Allow only alphanumeric characters, underscores, and hyphens
        return /^[a-zA-Z0-9_-]+$/.test(value);
      }, {
        message: "Username may only contain letters, numbers, underscores, and hyphens.",
      }),
    position: z.enum(POSITIONS, { message: "Please select your position." }),
    motivation: z.enum(MOTIVATIONS, { message: "Please select your motivation." }),
    university: z.string().min(1, { message: "University is required." }),
    specialization: z.string().min(1, { message: "Specialization is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });


export type SignUpFormValues = z.infer<typeof formSchema>;

export type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
  isPending?: boolean;
  errorMessage?: string | null;
  redirectUrl?: string | null;
};

export function SignUpForm({
  onSubmit,
  isPending,
  redirectUrl,
}: SignUpFormProps) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      position: undefined,                 // default radio
      motivation: undefined,   // default radio
      university: "",
      specialization: "",
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="student" id="pos-student" />
                        <label htmlFor="pos-student" className="text-sm">Student</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="academic_staff" id="pos-academic" />
                        <label htmlFor="pos-academic" className="text-sm">Academic staff</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="other" id="pos-other" />
                        <label htmlFor="pos-other" className="text-sm">Other</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="personal_interest" id="mot-personal" />
                        <label htmlFor="mot-personal" className="text-sm">Personal interest</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="professional_interest" id="mot-prof" />
                        <label htmlFor="mot-prof" className="text-sm">Professional interest</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="personal_and_professional_interest" id="mot-both" />
                        <label htmlFor="mot-both" className="text-sm">Both of them</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
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
          Already have an account?{" "}
          <a
            href={
              redirectUrl
                ? `/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`
                : "/sign-in"
            }
            className="text-primary underline hover:opacity-80"
          >
            Sign in
          </a>
        </span>
      </CardFooter>
    </Card>
  );
}