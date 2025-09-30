const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const itineraryController = require('../controllers/itineraryController');

const router = express.Router();

// Validation middleware
const itineraryValidation = [
    body('model').notEmpty().isString(),
    body('messages').isArray({ min: 2 }),
    body('messages.*.role').isString().isIn(['system', 'user']),
    body('messages.*.content').isString().notEmpty(),
    body('parameters.temperature').optional().isFloat({ min: 0, max: 2 }),
    body('parameters.max_tokens').optional().isInt({ min: 1, max: 4000 })]

// Protect all routes with authentication
router.use(auth);

// Routes
router.post('/generate', itineraryValidation, itineraryController.generateItinerary);
router.get('/', itineraryController.getItineraries);
router.get('/:id', itineraryController.getItinerary);
router.put('/:id', itineraryValidation, itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;