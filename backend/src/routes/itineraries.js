const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const itineraryController = require('../controllers/itineraryController');

const router = express.Router();

// Validation middleware
const itineraryValidation = [
    body('destination').trim().notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('interests').isArray(),
    body('dailyHours').isFloat({ min: 1, max: 24 }),
    body('pace').isIn(['relaxed', 'moderate', 'busy']),
    body('budget').optional().isNumeric(),
    body('budgetCurrency').optional().isLength({ min: 3, max: 3 })
];

// Protect all routes with authentication
router.use(auth);

// Routes
router.post('/generate', itineraryValidation, itineraryController.generateItinerary);
router.get('/', itineraryController.getItineraries);
router.get('/:id', itineraryController.getItinerary);
router.put('/:id', itineraryValidation, itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;