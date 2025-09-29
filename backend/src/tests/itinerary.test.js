const request = require('supertest');
const app = require('../index');
const { testUser, testItinerary } = require('./setup');

describe('Itinerary Tests', () => {
  let authToken;
  let itineraryId;

  beforeEach(async () => {
    // Register and login user before each test
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    authToken = res.body.token;
  });

  describe('POST /api/itineraries/generate', () => {
    it('should generate a new itinerary', async () => {
      const res = await request(app)
        .post('/api/itineraries/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testItinerary)
        .expect(201);

      expect(res.body).toHaveProperty('destination', testItinerary.destination);
      expect(res.body.activities).toBeDefined();
      expect(Array.isArray(res.body.activities)).toBeTruthy();
      itineraryId = res.body._id;
    });

    it('should not generate itinerary without auth', async () => {
      await request(app)
        .post('/api/itineraries/generate')
        .send(testItinerary)
        .expect(401);
    });
  });

  describe('GET /api/itineraries', () => {
    beforeEach(async () => {
      // Create test itinerary
      const res = await request(app)
        .post('/api/itineraries/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testItinerary);
      itineraryId = res.body._id;
    });

    it('should get all user itineraries', async () => {
      const res = await request(app)
        .get('/api/itineraries')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get specific itinerary by id', async () => {
      const res = await request(app)
        .get(`/api/itineraries/${itineraryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('_id', itineraryId);
      expect(res.body.destination).toBe(testItinerary.destination);
    });
  });

  describe('PUT /api/itineraries/:id', () => {
    beforeEach(async () => {
      const res = await request(app)
        .post('/api/itineraries/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testItinerary);
      itineraryId = res.body._id;
    });

    it('should update itinerary', async () => {
      const updates = {
        destination: 'Updated Destination',
        pace: 'relaxed'
      };

      const res = await request(app)
        .put(`/api/itineraries/${itineraryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(200);

      expect(res.body.destination).toBe(updates.destination);
      expect(res.body.pace).toBe(updates.pace);
    });
  });

  describe('DELETE /api/itineraries/:id', () => {
    beforeEach(async () => {
      const res = await request(app)
        .post('/api/itineraries/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testItinerary);
      itineraryId = res.body._id;
    });

    it('should delete itinerary', async () => {
      await request(app)
        .delete(`/api/itineraries/${itineraryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Verify itinerary is deleted
      await request(app)
        .get(`/api/itineraries/${itineraryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});