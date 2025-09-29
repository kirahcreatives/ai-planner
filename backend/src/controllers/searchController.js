const { validationResult } = require('express-validator');
const Itinerary = require('../models/Itinerary');
const SearchService = require('../services/searchService');
const { generateItineraryWithAI } = require('../services/openaiService');

// Search itineraries
exports.searchItineraries = async (req, res) => {
    try {
        const {
            searchQuery,
            filters,
            sort,
            page,
            limit
        } = req.query;

        const results = await SearchService.searchItineraries({
            userId: req.user._id,
            searchQuery,
            filters: filters ? JSON.parse(filters) : undefined,
            sort,
            page: parseInt(page),
            limit: parseInt(limit)
        });

        res.json(results);
    } catch (error) {
        console.error('Search itineraries error:', error);
        res.status(500).json({ message: 'Error searching itineraries' });
    }
};

// Get itinerary statistics
exports.getStats = async (req, res) => {
    try {
        const stats = await SearchService.getStats(req.user._id);
        res.json(stats);
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Error getting itinerary statistics' });
    }
};