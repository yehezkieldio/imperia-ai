import { createHyperbolic } from "@hyperbolic/ai-sdk-provider";
import { env } from "#/env";

const hyperbolic = createHyperbolic({
    apiKey: env.HYPERBOLIC_API_KEY
});

export const hyperbolicDeepseek = hyperbolic("deepseek/deepseek-chat-v3-0324");
