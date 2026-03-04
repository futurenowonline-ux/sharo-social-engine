import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with a fallback for local development if not provided
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// We use gemini-2.0-flash for fast, high-quality caption generation
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const SHARO_BAKERY_CONTEXT = `
You are the Brand Voice Guardian for Sharo Bakery, located in Ulundi, KwaZulu-Natal, South Africa.
Tone: Charming, nostalgic, health-conscious, local, and slightly premium.
Key Products: Cinnamon Raisin Sourdough, Health Sandwiches, Artisan Loaves.
Audience: Local community, health-conscious buyers, and artisan bread lovers.
Always keep responses concise, engaging, and localized to South African context where appropriate (e.g., using terms like "Mzansi", "local is lekker" sparingly).
`;

export async function generateSocialCaption(prompt: string, platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'TikTok'): Promise<string> {
    if (!apiKey) {
        console.warn('GEMINI_API_KEY is not set. Returning mock response.');
        return `[Mock ${platform} Caption]: 🥖 Fresh out the oven! ${prompt} #SharoBakery #UlundiBakes`;
    }

    try {
        const platformSpecificInstructions = {
            Instagram: 'Focus on aesthetics, use engaging emojis, keep it visually descriptive. Limit to 3-4 strategic hashtags.',
            Facebook: 'Focus on community connection, ask a question to drive engagement. Mid-length.',
            LinkedIn: 'Professional but warm. Focus on artisanal tradition, business growth, or team culture.',
            TikTok: 'High energy, hook the reader in the first line. Short, punchy, trend-aware.'
        };

        const fullPrompt = `
      ${SHARO_BAKERY_CONTEXT}
      
      Task: Write a social media caption for ${platform}.
      Platform Rules: ${platformSpecificInstructions[platform]}
      
      User Prompt: ${prompt}
    `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating content with Gemini:', error);
        throw new Error('Failed to generate caption');
    }
}

export async function repurposeAsset(assetDescription: string): Promise<{ reels: string; tiktok: string; linkedin: string }> {
    if (!apiKey) {
        return {
            reels: 'Mock Reels script based on: ' + assetDescription,
            tiktok: 'Mock TikTok concept based on: ' + assetDescription,
            linkedin: 'Mock LinkedIn post based on: ' + assetDescription
        };
    }

    const fullPrompt = `
    ${SHARO_BAKERY_CONTEXT}
    
    Task: The Repurposing Hack. Take the following high-quality asset description and generate three pieces of content:
    1. A 15-second Reels script
    2. A high-energy TikTok concept
    3. A professional LinkedIn post about the artisanal baking tradition.
    
    Asset Description: ${assetDescription}
    
    Format the output as a JSON object with keys "reels", "tiktok", and "linkedin".
  `;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        // In a production app, we should use schema generation or carefully parse the JSON
        // Replacing backticks if the model returned markdown code block
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '');
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error('Error repurposing asset:', error);
        throw new Error('Failed to repurpose asset');
    }
}
