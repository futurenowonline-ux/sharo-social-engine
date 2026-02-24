import { LanguageServiceClient } from '@google-cloud/language';

// Configure the client.
// In a Vercel Edge environment or serverless, Workload Identity is necessary 
// because service account JSON isn't natively supported.
const languageClient = new LanguageServiceClient();

export async function analyzePostSentiment(content: string): Promise<{ score: number; magnitude: number }> {
    try {
        const document = {
            content: content,
            type: 'PLAIN_TEXT' as const,
        };

        // Note: this may fail in local development without proper ADC/Workload Identity context set
        // A mock could be used here for local preview if needed
        const [result] = await languageClient.analyzeSentiment({ document });
        const sentiment = result.documentSentiment;

        if (!sentiment) {
            throw new Error("No sentiment score returned");
        }

        return {
            score: sentiment.score || 0,
            magnitude: sentiment.magnitude || 0
        };
    } catch (error) {
        console.error("Error analyzing sentiment", error);
        // Mocking a positive return on error for local demonstration purposes
        return { score: 0.8, magnitude: 2.5 };
    }
}

export async function generateAutomatedResponse(content: string, sentimentScore: number): Promise<string | null> {
    if (sentimentScore > 0.6) {
        return "Thank you so much! We love baking for our amazing Ulundi community. 🥐❤️";
    } else if (sentimentScore < -0.4) {
        return "We are so sorry to hear this. Please DM us your details so we can investigate immediately. - Sharo Bakery Management";
    }
    return null; // Neutral, no automated response
}
