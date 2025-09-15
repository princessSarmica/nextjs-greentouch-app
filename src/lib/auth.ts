import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins"
import { APIError, createAuthMiddleware } from "better-auth/api";
import { passwordSchema } from "./validation";

export const auth = betterAuth({
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds (5 minutes)
        }
    },
    user: {
      additionalFields: {
        position: {
          type: "string",
        required: true,
        defaultValue: "other",
        },
        university: {
          type: "string",
          required: true,
          defaultValue: "unknown",
        },
        specialization: {
          type: "string",
          required: true,
          defaultValue: "unknown",
        },
        motivation: {
          type: "string",
          required: true,
          defaultValue: "other",
        }
      }
    },
    emailAndPassword: {
      enabled: true, 
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    hooks: {
      before: createAuthMiddleware(async ctx => {
        if (ctx.path === "/sign-up/email") {
          const password = ctx.body.password;
          const {error} = passwordSchema.safeParse(password);
          if (error) {
            throw new APIError("BAD_REQUEST", { message: "Password not strong enough." });
          }
        }
      })
    },
    plugins: [username({
        displayUsernameValidator: (displayUsername) => {
            // Allow only alphanumeric characters, underscores, and hyphens
            return /^[a-zA-Z0-9_-]+$/.test(displayUsername)
        }
    }), nextCookies()] // make sure this is the last plugin in the array
});