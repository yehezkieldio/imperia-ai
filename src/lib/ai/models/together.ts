import { createTogetherAI } from "@ai-sdk/togetherai";
import { env } from "#/env";

const togetherai = createTogetherAI({
    apiKey: env.TOGETHER_API_KEY
});

export const togetherDeepseek = togetherai("deepseek-ai/deepseek-llm-67b-chat");
