const express = require('express');
const { query } = require('express-validator');
const auth = require('../middleware/auth');
const searchController = require('../controllers/searchController');

const router = express.Router();

// Validation middleware
const searchValidation = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sort').optional().isIn(['dateAsc', 'dateDesc', 'budgetAsc', 'budgetDesc']),
    query('filters').optional().custom(value => {
        try {
            const filters = JSON.parse(value);
            // Validate filter structure
            if (filters.dateRange) {
                if (filters.dateRange.start) new Date(filters.dateRange.start);
                if (filters.dateRange.end) new Date(filters.dateRange.end);
            }
            if (filters.budget) {
                if (filters.budget.min) Number(filters.budget.min);
                if (filters.budget.max) Number(filters.budget.max);
            }
            if (filters.pace) {
                if (!['relaxed', 'moderate', 'busy'].includes(filters.pace)) {
                    throw new Error('Invalid pace value');
                }
            }
            return true;
        } catch (error) {
            throw new Error('Invalid filters format');
        }
    })
];

// Protect all routes with authentication
router.use(auth);

// Routes
router.get('/search', searchValidation, searchController.searchItineraries);
router.get('/stats', searchController.getStats);

module.exports = router;