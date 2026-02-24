import { google, calendar_v3 } from 'googleapis';

export async function getCalendarService() {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    return google.calendar({ version: 'v3', auth });
}

export async function scheduleSocialPost(
    calendarId: string,
    scheduledTime: Date,
    caption: string,
    assetUrl: string,
    platform: string
) {
    try {
        const calendar = await getCalendarService();

        // Create event spanning 15 minutes as a marker
        const endTime = new Date(scheduledTime.getTime() + 15 * 60000);

        const event: calendar_v3.Schema$Event = {
            summary: `[${platform}] Scheduled Social Post`,
            description: `Caption: ${caption}\n\nAsset: ${assetUrl}`,
            start: {
                dateTime: scheduledTime.toISOString(),
            },
            end: {
                dateTime: endTime.toISOString(),
            },
            colorId: '2', // e.g. green for scheduled
            extendedProperties: {
                private: {
                    platform,
                    assetUrl,
                    type: 'SOCIAL_POST'
                }
            }
        };

        const response = await calendar.events.insert({
            calendarId,
            requestBody: event,
        });

        return response.data;
    } catch (error) {
        console.error("Error scheduling calendar event:", error);
        throw new Error('Could not schedule event');
    }
}
