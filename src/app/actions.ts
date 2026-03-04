"use server";

import { generateSocialCaption, repurposeAsset } from "@/lib/gemini";
import { analyzePostSentiment } from "@/lib/sentiment";

export type ActionResult<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

export async function generateCaption(
    prompt: string,
    platform: "Instagram" | "Facebook" | "LinkedIn" | "TikTok"
): Promise<ActionResult<{ caption: string }>> {
    try {
        const caption = await generateSocialCaption(prompt, platform);
        return { success: true, data: { caption } };
    } catch (error) {
        console.error("generateCaption action error:", error);
        const message = error instanceof Error ? error.message : "Failed to generate caption";

        if (message.includes("429") || message.includes("quota")) {
            return {
                success: false,
                error: "Gemini API quota exceeded — free tier daily limit reached. Try again tomorrow or upgrade at ai.google.dev.",
            };
        }

        return {
            success: false,
            error: message,
        };
    }
}

export async function repurposeContent(
    assetDescription: string
): Promise<ActionResult<{ reels: string; tiktok: string; linkedin: string }>> {
    try {
        const result = await repurposeAsset(assetDescription);
        return { success: true, data: result };
    } catch (error) {
        console.error("repurposeContent action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to repurpose content",
        };
    }
}

export async function analyzeSentiment(
    content: string
): Promise<ActionResult<{ score: number; magnitude: number }>> {
    try {
        const result = await analyzePostSentiment(content);
        return { success: true, data: result };
    } catch (error) {
        console.error("analyzeSentiment action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to analyze sentiment",
        };
    }
}
