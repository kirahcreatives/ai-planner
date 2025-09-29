const OpenAI = require('openai');
const { handleOpenAIError } = require('../utils/openaiErrors');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateItineraryWithAI = async ({
    destination,
    startDate,
    endDate,
    interests,
    dailyHours,
    pace,
    budget,
    budgetCurrency
}) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not configured');
        }
        
        const prompt = `Create a detailed travel itinerary for ${destination} with the following requirements:
- Trip dates: ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}
- Interests: ${interests.join(', ')}
- Available hours per day: ${dailyHours}
- Pace preference: ${pace}
${budget ? `- Budget: ${budget} ${budgetCurrency}` : ''}

Please provide a day-by-day itinerary with activities that match these preferences. For each activity, include:
- Name of the activity/place
- Category (e.g., Sightseeing, Food, Cultural, Adventure)
- Duration in minutes
- Brief description`;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable travel planner. Create detailed, realistic itineraries that consider opening hours, travel time between locations, and local customs. Format the response as a structured JSON array of daily activities."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        // Parse and structure the AI response
        const rawItinerary = JSON.parse(response.choices[0].message.content);

        // Transform the AI response into our activity schema format
        const activities = transformAIResponseToActivities(rawItinerary, startDate);

        return activities;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        const handledError = handleOpenAIError(error);
        
        // Log additional details for quota errors
        if (error.code === 'insufficient_quota') {
            console.error('OpenAI API Quota Error Details:', {
                status: error.status,
                type: error.type,
                request_id: error.request_id
            });
        }
        
        throw handledError;
    }
};

const transformAIResponseToActivities = (rawItinerary, startDate) => {
    // Ensure we have a valid date to start from
    const tripStart = new Date(startDate);

    // Transform the raw AI response into our activity schema
    const activities = rawItinerary.days.flatMap((day, index) => {
        const currentDate = new Date(tripStart);
        currentDate.setDate(tripStart.getDate() + index);

        return day.activities.map(activity => ({
            name: activity.name,
            category: activity.category,
            duration_mins: activity.duration,
            date: new Date(currentDate),
            description: activity.description,
            location: {
                name: activity.location || '',
                coordinates: activity.coordinates || { lat: null, lng: null }
            }
        }));
    });

    return activities;
};

module.exports = {
    generateItineraryWithAI
};