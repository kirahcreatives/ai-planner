export const formValidationRules = {
    destination: {
        tooltip: 'Enter a city, region, or country you want to visit',
        validation: (value) => value.length > 0,
        error: 'Destination is required'
    },
    startDate: {
        tooltip: 'Select the first day of your trip',
        validation: (value) => value && new Date(value) >= new Date().setHours(0, 0, 0, 0),
        error: 'Start date must not be in the past'
    },
    endDate: {
        tooltip: 'Select the last day of your trip',
        validation: (value, formData) => value && new Date(value) >= new Date(formData.startDate),
        error: 'End date must be after start date'
    },
    interests: {
        tooltip: 'Add interests like "art", "history", "food", separated by commas',
        validation: (value) => value.length > 0,
        error: 'At least one interest is required'
    },
    dailyHours: {
        tooltip: 'How many hours per day you want to spend exploring (1-24)',
        validation: (value) => value > 0 && value <= 24,
        error: 'Daily hours must be between 1 and 24'
    },
    pace: {
        tooltip: 'Choose how fast you want to move through activities',
        options: {
            relaxed: 'Take your time, with breaks between activities',
            moderate: 'Balanced pace with some rest time',
            intense: 'Pack in as many activities as possible'
        }
    },
    budget: {
        tooltip: 'Set your total trip budget (excluding flights)',
        validation: (value) => value > 0,
        error: 'Budget must be greater than 0'
    }
};

export const pageHelpContent = {
    welcome: "Welcome to AI Travel Planner! Our platform uses artificial intelligence to create personalized travel itineraries tailored to your preferences and needs. This guide will help you get started with our features.",
    createItinerary: "Creating an itinerary is easy! Simply enter your destination, dates, and preferences, and our AI will generate a customized travel plan for you. You can then modify and fine-tune the suggestions to create your perfect trip.",
    aiRecommendations: "Our AI analyzes thousands of data points to provide recommendations based on your interests, budget, and travel style. Learn how to make the most of these smart suggestions.",
    commonIssues: "Find solutions to common problems and learn how to troubleshoot issues with your travel plans.",
    support: "Need help? Our support team is available 24/7 to assist you with any questions or concerns.",
    faqs: "Browse our frequently asked questions to find quick answers to common queries about using AI Travel Planner.",
    home: {
        title: 'Create Your Plan',
        description: 'Fill in your preferences and let AI craft your perfect itinerary.',
        tips: [
            'Start with your destination and dates',
            'Add specific interests for better recommendations',
            'Adjust daily hours and pace to your travel style',
            'Set a realistic budget for better planning'
        ]
    },
    results: {
        title: 'Your Itinerary',
        description: 'Review and customize your AI-generated travel plan.',
        tips: [
            'Review each day\'s activities',
            'Check suggested extras for more options',
            'Use the print button to save offline',
            'Share your plan with travel companions'
        ]
    }
};

export const componentHelp = {
    header: {
        newPlan: 'Start planning a new trip',
        viewItinerary: 'See your generated travel plan',
        themeToggle: 'Switch between light and dark mode'
    },
    itineraryCard: {
        duration: 'Estimated time for this activity',
        category: 'Type of activity',
        rating: 'Average visitor rating'
    },
    searchBar: {
        searchInput: 'Search through your itinerary',
        categoryFilter: 'Filter activities by type',
        sortOptions: 'Change how activities are ordered'
    }
};