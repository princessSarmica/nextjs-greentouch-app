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
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { passwordSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/password-input";
import { LoadingButton } from "@/components/loading-button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const POSITIONS = ["student", "academic_staff", "other"] as const;
const MOTIVATIONS = ["personal_interest", "professional_interest", "personal_and_professional_interest"] as const;

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
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
  }).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords do not match",
      path: ['confirmPassword']
    });
  }
});

type SignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm(){

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            position: undefined,
            motivation: undefined,
            university: "",
            specialization: "",
        },
    });

    async function onSubmit({ firstName, lastName, email, password, username, position, motivation, university, specialization }: SignUpFormValues) {
        setError(null)

        const {error} = await authClient.signUp.email({
            name: firstName + " " + lastName,
            email,
            password,
            username,
            position,
            motivation,
            university,
            specialization,
        })

        if(error) {
            setError(error.message || "Something went wrong. Please try again.")
        } else {
            toast.success("Signed up successfully.");
            router.push("/"); // Redirect to home page after successful sign-up
        }
    }

    const loading = form.formState.isSubmitting;


    return (
        <Card className="w-full max-w-none rounded-xl border shadow-sm">
            <CardContent className="space-y-6 pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                Name <span className="text-[#2E7D5A]">*</span>
                                </FormLabel>
                                <FormControl>
                                <Input type="text" placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                Surname <span className="text-[#2E7D5A]">*</span>
                                </FormLabel>
                                <FormControl>
                                <Input type="text" placeholder="Surname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>
                                Your position <span className="text-[#2E7D5A]">*</span>
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="mt-2 space-y-2"
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
                        name="university"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel>
                                Title of the university where you study/work <span className="text-[#2E7D5A]">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="University" {...field} />
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
                            <FormLabel>
                                Your field of studies/work <span className="text-[#2E7D5A]">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Specialization" {...field} />
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
                            <FormLabel>
                                Your motivation for participation in GreenTouch <span className="text-[#2E7D5A]">*</span>
                            </FormLabel>
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

                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>
                                Email <span className="text-[#2E7D5A]">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
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
                                <FormLabel>
                                Username <span className="text-[#2E7D5A]">*</span>
                                </FormLabel>
                                <FormControl>
                                <Input type="text" placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                Password <span className="text-[#2E7D5A]">*</span>
                                </FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <PasswordInput autoComplete="new-password" placeholder="Password" {...field} />
                                </div>
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
                                <FormLabel>
                                Confirm password <span className="text-[#2E7D5A]">*</span>
                                </FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <PasswordInput autoComplete="new-password" placeholder="Confirm password" {...field} />
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        {error && (
                            <div role="alert" className="text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        
                        <div className="mt-4 h-px w-full bg-gray-300" />
                        <div className="flex items-center justify-end gap-4 pt-2">
                            <span className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/sign-in" className="text-primary underline hover:opacity-80">
                                    Sign in
                                </Link>
                            </span>

                            <LoadingButton 
                                type="submit"
                                variant={"secondary"}
                                loading={loading}
                            >
                                Submit
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
  );
}