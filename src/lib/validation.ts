import z from "zod";

export const passwordSchema = (validationMessages: {
    passwordRequired: string;
    passwordMinLength: string;
    passwordLetter: string;
    passwordNumber: string;
    passwordSpecialChar: string;
}) => z
    .string()
    .min(1, { message: validationMessages.passwordRequired })
    .min(8, {
        message: validationMessages.passwordMinLength,
    })
    .regex(/[a-zA-Z]/, { message: validationMessages.passwordLetter })
    .regex(/[0-9]/, { message: validationMessages.passwordNumber })
    .regex(/[^a-zA-Z0-9]/, {
        message: validationMessages.passwordSpecialChar,
    });
