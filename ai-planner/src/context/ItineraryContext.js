import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const ItineraryContext = createContext();

const initialState = {
    itinerary: null,
    loading: false,
    error: null,
    formData: {
        destination: '',
        startDate: '',
        endDate: '',
        interests: '',
        dailyHours: '',
        pace: 'moderate',
        budget: '',
        budgetCurrency: 'USD'
    }
};

const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    SET_ITINERARY: 'SET_ITINERARY',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ITINERARY: 'CLEAR_ITINERARY',
    UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
    RESET_FORM: 'RESET_FORM'
};

const itineraryReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload, error: null };
        case actionTypes.SET_ITINERARY:
            return { ...state, itinerary: action.payload, loading: false, error: null };
        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        case actionTypes.CLEAR_ITINERARY:
            return { ...state, itinerary: null, error: null };
        case actionTypes.UPDATE_FORM_DATA:
            return {
                ...state,
                formData: { ...state.formData, ...action.payload }
            };
        case actionTypes.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData
            };
        default:
            return state;
    }
};

export const ItineraryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itineraryReducer, initialState);

    const setLoading = (isLoading) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: isLoading });
    };

    const setItinerary = (itinerary) => {
        dispatch({ type: actionTypes.SET_ITINERARY, payload: itinerary });
    };

    const setError = (error) => {
        dispatch({ type: actionTypes.SET_ERROR, payload: error });
    };

    const clearItinerary = () => {
        dispatch({ type: actionTypes.CLEAR_ITINERARY });
    };

    const updateFormData = (data) => {
        dispatch({ type: actionTypes.UPDATE_FORM_DATA, payload: data });
    };

    const resetForm = () => {
        dispatch({ type: actionTypes.RESET_FORM });
    };

    const value = {
        ...state,
        setLoading,
        setItinerary,
        setError,
        clearItinerary,
        updateFormData,
        resetForm,
    };

    return (
        <ItineraryContext.Provider value={value}>
            {children}
        </ItineraryContext.Provider>
    );
};

ItineraryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useItinerary = () => {
    const context = useContext(ItineraryContext);
    if (context === undefined) {
        throw new Error('useItinerary must be used within an ItineraryProvider');
    }
    return context;
};

export default ItineraryContext;