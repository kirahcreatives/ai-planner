import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { itineraryService } from '../services/itineraryService';
import { useError } from './ErrorContext';
import { handleApiError } from '../utils/errorHandler';
import { useAuth } from './AuthContext';

const SaveStateContext = createContext(null);

export const SaveStateProvider = ({ children }) => {
    const [savedItineraries, setSavedItineraries] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showError } = useError();
    const { user } = useAuth();

    const loadSavedItineraries = useCallback(async () => {
        try {
            setLoading(true);
            const data = await itineraryService.getItineraries();
            setSavedItineraries(data);
        } catch (error) {
            const errorMessage = handleApiError(error);
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [showError]); // showError is stable since it comes from useError context

    // Load saved itineraries when the user is authenticated
    useEffect(() => {
        if (user) {
            loadSavedItineraries();
        } else {
            setSavedItineraries([]); // Clear itineraries when user is not authenticated
        }
    }, [loadSavedItineraries, user]);

    const saveItinerary = async (itinerary) => {
        try {
            setLoading(true);
            const savedItinerary = await itineraryService.saveItinerary(itinerary);
            setSavedItineraries(prev => [...prev, savedItinerary]);
            showError('Itinerary saved successfully!', 3000);
            return savedItinerary;
        } catch (error) {
            const errorMessage = handleApiError(error);
            showError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateItinerary = async (id, updates) => {
        try {
            setLoading(true);
            const updatedItinerary = await itineraryService.updateItinerary(id, updates);
            setSavedItineraries(prev =>
                prev.map(item => item.id === id ? updatedItinerary : item)
            );
            showError('Itinerary updated successfully!', 3000);
            return updatedItinerary;
        } catch (error) {
            const errorMessage = handleApiError(error);
            showError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteItinerary = async (id) => {
        try {
            setLoading(true);
            await itineraryService.deleteItinerary(id);
            setSavedItineraries(prev =>
                prev.filter(item => item.id !== id)
            );
            showError('Itinerary deleted successfully!', 3000);
        } catch (error) {
            const errorMessage = handleApiError(error);
            showError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        savedItineraries,
        loading,
        saveItinerary,
        updateItinerary,
        deleteItinerary,
        loadSavedItineraries
    };

    return (
        <SaveStateContext.Provider value={value}>
            {children}
        </SaveStateContext.Provider>
    );
};

SaveStateProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useSaveState = () => {
    const context = useContext(SaveStateContext);
    if (!context) {
        throw new Error('useSaveState must be used within a SaveStateProvider');
    }
    return context;
};

export default SaveStateContext;
