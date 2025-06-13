import { createGroq } from "@ai-sdk/groq";
import { env } from "#/env";

const groq = createGroq({
    apiKey: env.GROQ_API_KEY
});

export const groqLlama370bVersatile = groq("llama-3.3-70b-versatile");
export const groqLlama4Scout = groq("meta-llama/llama-4-scout-17b-16e-instruct");
