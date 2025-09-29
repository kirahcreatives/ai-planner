const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duration_mins: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: String,
    location: {
        name: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    }
});

const itinerarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    interests: [{
        type: String
    }],
    dailyHours: {
        type: Number,
        required: true
    },
    pace: {
        type: String,
        enum: ['relaxed', 'moderate', 'busy'],
        default: 'moderate'
    },
    budget: {
        type: Number
    },
    budgetCurrency: {
        type: String,
        default: 'USD'
    },
    activities: [activitySchema]
}, {
    timestamps: true
});

// Add index for faster querying by user
itinerarySchema.index({ userId: 1 });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;