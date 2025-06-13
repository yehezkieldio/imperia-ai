import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const stringToArraySchema = z.preprocess((input) => {
    if (typeof input !== "string") return input;

    if (input.startsWith("[") && input.endsWith("]")) {
        try {
            const parsed = JSON.parse(input);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            const content: string = input.slice(1, -1);
            return content ? content.split(",").map((item: string): string => item.trim()) : [];
        }
    }

    return [input];
}, z.array(z.string()));

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "production", "test"]),

        DISCORD_BOT_TOKEN: z.string(),
        GROQ_API_KEY: z.string(),
        GEMINI_API_KEY: z.string(),
        MISTRAL_API_KEY: z.string(),
        HYPERBOLIC_API_KEY: z.string(),
        TOGETHER_API_KEY: z.string(),

        DEVELOPER_USER_ID: stringToArraySchema.optional(),
        DEVELOPER_SERVER_ID: stringToArraySchema.optional()
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true
});

export const isProduction: boolean = env.NODE_ENV === "production";
