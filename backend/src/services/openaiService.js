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

        const messages = [
            {
                role: "system",
                content: `You are an expert travel planner who creates detailed, personalized itineraries. 
Format your response as a structured JSON with day-by-day activities, considering:
- Opening hours and seasonal availability
- Travel time between locations
- Local customs and cultural considerations
- Weather patterns and best times to visit attractions
- Meal times and local dining customs
Response should be a JSON object with a 'days' array, where each day contains:
{
  "date": "YYYY-MM-DD",
  "activities": [
    {
      "name": "Activity name",
      "category": "Category (e.g., Sightseeing, Food, Cultural, Adventure)",
      "startTime": "HH:MM",
      "duration": number (in minutes),
      "description": "Detailed description",
      "location": "Location name",
      "cost": {"amount": number, "currency": "string"},
      "tips": ["array of helpful tips"]
    }
  ]
}`
            },
            {
                role: "user",
                content: `Create a detailed travel itinerary for ${destination} with the following requirements:
- Trip dates: ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}
- Interests: ${interests.join(', ')}
- Available hours per day: ${dailyHours}
- Pace preference: ${pace}
${budget ? `- Budget: ${budget} ${budgetCurrency}` : ''}

Please provide a comprehensive day-by-day itinerary that includes:
1. Well-paced activities matching the ${pace} preference
2. Focus on these interests: ${interests.join(', ')}
3. Local authentic experiences
4. Practical transportation between locations
5. Restaurant recommendations for each day
6. Cultural tips and local customs to be aware of
7. Estimated costs for activities and meals`
            }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
            response_format: { type: "json_object" }
        });

        // Parse the response and handle any JSON parsing errors
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response.choices[0].message.content);
        } catch (parseError) {
            console.error('Failed to parse OpenAI response:', response.choices[0].message.content);
            throw new Error('Failed to generate a properly structured itinerary. Please try again.');
        }

        // Validate the response structure
        if (!parsedResponse.days || !Array.isArray(parsedResponse.days)) {
            throw new Error('Invalid itinerary format received from AI');
        }

        // Create the formatted itinerary
        const formattedItinerary = {
            destination,
            startDate,
            endDate,
            interests,
            dailyHours,
            pace,
            budget: budget ? { amount: budget, currency: budgetCurrency } : null,
            days: parsedResponse.days,
            created: new Date()
        };

        return formattedItinerary;
    } catch (error) {
        console.error('OpenAI API Error:', error);

        if (error.response?.status === 429) {
            throw new Error('Rate limit exceeded. Please try again in a few minutes.');
        }

        if (error.response?.status === 401) {
            console.error('OpenAI API Authentication Error');
            throw new Error('Server configuration error. Please contact support.');
        }

        // Log additional details for quota errors
        if (error.code === 'insufficient_quota') {
            console.error('OpenAI API Quota Error Details:', {
                status: error.status,
                type: error.type,
                request_id: error.request_id
            });
            throw new Error('Service temporarily unavailable. Please try again later.');
        }

        throw error;
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