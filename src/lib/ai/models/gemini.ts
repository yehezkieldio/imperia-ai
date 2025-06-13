import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "#/env";

const google = createGoogleGenerativeAI({
    apiKey: env.GEMINI_API_KEY
});

export const googleGemini25Flash = google("gemini-2.5-flash-preview-04-17");
export const googleGemini25Pro = google("gemini-2.5-pro-preview-05-06");
