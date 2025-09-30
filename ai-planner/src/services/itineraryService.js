import api from './api';

export const itineraryService = {
    generateItinerary: async (params) => {
        const response = await api.post('/itineraries/generate', params);
        return response.data;
    },

    getItineraries: async () => {
        const response = await api.get('/itineraries');
        return response.data;
    },

    getItinerary: async (id) => {
        const response = await api.get(`/itineraries/${id}`);
        return response.data;
    },

    saveItinerary: async (itinerary) => {
        const response = await api.post('/itineraries', itinerary);
        return response.data;
    },

    updateItinerary: async (id, updates) => {
        const response = await api.put(`/itineraries/${id}`, updates);
        return response.data;
    },

    deleteItinerary: async (id) => {
        const response = await api.delete(`/itineraries/${id}`);
        return response.data;
    }
};