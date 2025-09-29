// Mock OpenAI responses for testing
const mockGenerateItinerary = async ({
  destination,
  startDate,
  endDate,
  interests,
  dailyHours,
  pace
}) => {
  return [
    {
      name: 'Test Activity 1',
      category: 'Sightseeing',
      duration_mins: 120,
      date: new Date(startDate),
      description: 'A test activity description',
      location: {
        name: destination,
        coordinates: {
          lat: 48.8566,
          lng: 2.3522
        }
      }
    },
    {
      name: 'Test Activity 2',
      category: 'Food',
      duration_mins: 90,
      date: new Date(startDate),
      description: 'Another test activity description',
      location: {
        name: destination,
        coordinates: {
          lat: 48.8566,
          lng: 2.3522
        }
      }
    }
  ];
};

module.exports = {
  generateItineraryWithAI: mockGenerateItinerary
};