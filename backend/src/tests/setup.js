const mongoose = require('mongoose');
const path = require('path');

// Load test environment variables
require('dotenv').config({
  path: path.join(__dirname, '../../.env.test')
});

// Mock OpenAI service
jest.mock('../services/openaiService', () => require('./mocks/openaiService.mock'));

// Connect to MongoDB before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

let mongoServer;

// Connect to the in-memory database before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Clear test data after each test
afterEach(async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;
    await Promise.all(
      Object.values(collections).map(collection => collection.deleteMany({}))
    );
  }
});

// Disconnect from MongoDB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

// Test user data
const testUser = {
  email: 'test@example.com',
  password: 'Test123!',
  firstName: 'Test',
  lastName: 'User'
};

// Test itinerary data
const testItinerary = {
  destination: 'Paris',
  startDate: '2025-10-01',
  endDate: '2025-10-05',
  interests: ['culture', 'food', 'history'],
  dailyHours: 8,
  pace: 'moderate',
  budget: 1000,
  budgetCurrency: 'USD'
};

module.exports = {
  testUser,
  testItinerary
};