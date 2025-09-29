const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Simple test endpoint for OpenAI integration
router.post('/test-openai', async (req, res) => {
    try {
        console.log('Starting simple OpenAI test');

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: "Say 'Hello, this is a test of the OpenAI integration!'"
                }
            ]
        });
        
        console.log('OpenAI response received:', response);
        
        res.json({
            success: true,
            message: 'OpenAI integration test successful',
            response: response.choices[0].message
        });
    } catch (error) {
        console.error('OpenAI test error:', error);
        res.status(500).json({
            success: false,
            message: 'OpenAI integration test failed',
            error: error.message
        });
    }
});

module.exports = router;