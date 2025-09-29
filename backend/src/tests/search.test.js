const request = require('supertest');
const app = require('../index');
const { testUser, testItinerary } = require('./setup');

describe('Search Tests', () => {
  let authToken;

  beforeEach(async () => {
    // Register and login user
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    authToken = res.body.token;

    // Create multiple test itineraries
    const itineraries = [
      { ...testItinerary, destination: 'Paris' },
      { ...testItinerary, destination: 'London', pace: 'relaxed' },
      { ...testItinerary, destination: 'Tokyo', budget: 2000 }
    ];

    for (const itinerary of itineraries) {
      await request(app)
        .post('/api/itineraries/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send(itinerary);
    }
  });

  describe('GET /api/search/search', () => {
    it('should search itineraries by destination', async () => {
      const res = await request(app)
        .get('/api/search/search')
        .query({ searchQuery: 'Paris' })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.results).toBeDefined();
      expect(res.body.results.length).toBeGreaterThan(0);
      expect(res.body.results[0].destination).toBe('Paris');
    });

    it('should filter itineraries by pace', async () => {
      const res = await request(app)
        .get('/api/search/search')
        .query({
          filters: JSON.stringify({ pace: 'relaxed' })
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.results).toBeDefined();
      expect(res.body.results.length).toBeGreaterThan(0);
      expect(res.body.results[0].pace).toBe('relaxed');
    });

    it('should filter itineraries by budget range', async () => {
      const res = await request(app)
        .get('/api/search/search')
        .query({
          filters: JSON.stringify({
            budget: { min: 1500, max: 2500 }
          })
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.results).toBeDefined();
      expect(res.body.results.length).toBeGreaterThan(0);
      expect(res.body.results[0].budget).toBe(2000);
    });

    it('should paginate results', async () => {
      const res = await request(app)
        .get('/api/search/search')
        .query({ page: 1, limit: 2 })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.pagination).toBeDefined();
      expect(res.body.results.length).toBeLessThanOrEqual(2);
    });
  });

  describe('GET /api/search/stats', () => {
    it('should get itinerary statistics', async () => {
      const res = await request(app)
        .get('/api/search/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('totalItineraries');
      expect(res.body).toHaveProperty('byDestination');
      expect(res.body).toHaveProperty('byInterest');
      expect(res.body).toHaveProperty('byMonth');
    });
  });
});