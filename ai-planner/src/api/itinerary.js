const API_BASE_URL = process.env.REACT_APP_API_URL;

export const generateItinerary = async ({
    startDate,
    endDate,
    interests,
    dailyHours,
    pace,
}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start_date: startDate,
                end_date: endDate,
                interests: Array.isArray(interests) ? interests : interests.split(',').map(i => i.trim()),
                daily_hours: parseFloat(dailyHours),
                pace,
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'An unexpected error occurred',
            }));
            throw new Error(error.message || 'Failed to generate itinerary');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Failed to generate itinerary');
    }
};