const { validationResult } = require('express-validator');
const Itinerary = require('../models/Itinerary');
const { generateItineraryWithAI } = require('../services/openaiService');

// Generate new itinerary
exports.generateItinerary = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            destination,
            startDate,
            endDate,
            interests,
            dailyHours,
            pace,
            budget,
            budgetCurrency
        } = req.body;

        // Generate activities using AI
        const activities = await generateItineraryWithAI({
            destination,
            startDate,
            endDate,
            interests,
            dailyHours,
            pace,
            budget,
            budgetCurrency
        });

        // Create new itinerary
        const itinerary = new Itinerary({
            userId: req.user._id,
            destination,
            startDate,
            endDate,
            interests,
            dailyHours,
            pace,
            budget,
            budgetCurrency,
            activities
        });

        await itinerary.save();

        res.status(201).json(itinerary);
    } catch (error) {
        console.error('Generate itinerary error:', error);
        res.status(500).json({ message: 'Error generating itinerary' });
    }
};

// Get all itineraries for user
exports.getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (error) {
        console.error('Get itineraries error:', error);
        res.status(500).json({ message: 'Error fetching itineraries' });
    }
};

// Get single itinerary
exports.getItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.json(itinerary);
    } catch (error) {
        console.error('Get itinerary error:', error);
        res.status(500).json({ message: 'Error fetching itinerary' });
    }
};

// Update itinerary
exports.updateItinerary = async (req, res) => {
    try {
        const updates = req.body;
        const itinerary = await Itinerary.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            updates,
            { new: true, runValidators: true }
        );

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.json(itinerary);
    } catch (error) {
        console.error('Update itinerary error:', error);
        res.status(500).json({ message: 'Error updating itinerary' });
    }
};

// Delete itinerary
exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.json({ message: 'Itinerary deleted successfully' });
    } catch (error) {
        console.error('Delete itinerary error:', error);
        res.status(500).json({ message: 'Error deleting itinerary' });
    }
};