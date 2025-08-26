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
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

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

const [showPassword, setShowPassword] = useState(false);

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
                  <FormItem>
                    <FormLabel>
                      Surname <span className="text-[#2E7D5A]">*</span>
                    </FormLabel>
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
                  <FormLabel>
                    Your field of studies/work <span className="text-[#2E7D5A]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={isPending} />
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
                    <Input type="email" {...field} disabled={isPending} />
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
                      <Input type="text" {...field} disabled={isPending} />
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
                      Password
                    </FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4 h-px w-full bg-gray-300" />

            <div className="flex items-center justify-end gap-4 pt-2">

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

              <Button
                type="submit"
                disabled={isPending}
                variant={"secondary"}
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </div>

          </form>
        </Form>
        </CardContent>
      </Card>
  );
}