import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const PlanningSteps = [
    {
        title: 'Basics',
        description: 'Enter your basic travel preferences and requirements'
    },
    {
        title: 'Destinations',
        description: 'Select and prioritize your desired destinations'
    },
    {
        title: 'Activities',
        description: 'Choose activities and experiences for your trip'
    },
    {
        title: 'Schedule',
        description: 'Review and customize your daily itinerary'
    },
    {
        title: 'Finalize',
        description: 'Review and finalize your travel plan'
    }
];

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [savedProgress, setSavedProgress] = useState({});

    const goToStep = useCallback((step) => {
        if (step >= 0 && step < PlanningSteps.length) {
            setCurrentStep(step);
        }
    }, []);

    const markStepComplete = useCallback((step) => {
        setCompletedSteps(prev => new Set([...prev, step]));
    }, []);

    const saveProgress = useCallback((stepData) => {
        setSavedProgress(prev => ({
            ...prev,
            [currentStep]: stepData
        }));
    }, [currentStep]);

    const resetProgress = useCallback(() => {
        setCurrentStep(0);
        setCompletedSteps(new Set());
        setSavedProgress({});
    }, []);

    const value = {
        currentStep,
        completedSteps,
        savedProgress,
        steps: PlanningSteps,
        goToStep,
        markStepComplete,
        saveProgress,
        resetProgress,
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

ProgressProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

export default ProgressContext;