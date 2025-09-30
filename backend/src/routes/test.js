const express = require('express');
const { generateItineraryWithAI } = require('../services/openaiService');

const router = express.Router();

// Test endpoint for OpenAI integration
router.post('/test-openai', async (req, res) => {
    try {
        const testData = {
            destination: 'Paris',
            startDate: '2025-10-01',
            endDate: '2025-10-03',
            interests: ['art', 'food'],
            dailyHours: 8,
            pace: 'moderate'
        };

        const result = await generateItineraryWithAI(testData);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('OpenAI Test Error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.response?.data || 'No additional details available'
        });
    }
});

module.exports = router;