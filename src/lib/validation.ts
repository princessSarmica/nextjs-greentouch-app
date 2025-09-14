import z from "zod";

export const passwordSchema = z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, {
        message: "Password must be at least 8 characters.",
    })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
    });
