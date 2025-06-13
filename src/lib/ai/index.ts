import { createFallback } from "ai-fallback";
import { googleGemini25Flash, googleGemini25Pro } from "#/lib/ai/models/gemini";
import { groqLlama4Scout, groqLlama370bVersatile } from "#/lib/ai/models/groq";
import { hyperbolicDeepseek } from "#/lib/ai/models/hyperbolic";
import { mistralMistralLarge } from "#/lib/ai/models/mistral";
import { togetherDeepseek } from "#/lib/ai/models/together";

export const model = createFallback({
    models: [
        groqLlama370bVersatile,
        groqLlama4Scout,
        googleGemini25Flash,
        googleGemini25Pro,
        mistralMistralLarge,
        hyperbolicDeepseek,
        togetherDeepseek
    ],
    retryAfterOutput: true,
    onError: (error, modelId) => {
        console.error(`Error with model ${modelId}:`, error);
    },
    modelResetInterval: 60000
});
