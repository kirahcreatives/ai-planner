import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
});

export const registerValidationSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required')
});

export const itineraryFormValidationSchema = Yup.object({
    destination: Yup.string()
        .required('Destination is required')
        .min(2, 'Destination must be at least 2 characters'),
    startDate: Yup.date()
        .required('Start date is required')
        .min(new Date(), 'Start date cannot be in the past'),
    endDate: Yup.date()
        .required('End date is required')
        .min(Yup.ref('startDate'), 'End date cannot be before start date'),
    interests: Yup.array()
        .of(Yup.string())
        .min(1, 'Select at least one interest')
        .required('Interests are required'),
    dailyHours: Yup.number()
        .required('Daily hours are required')
        .min(1, 'Must be at least 1 hour')
        .max(24, 'Cannot exceed 24 hours'),
    pace: Yup.string()
        .oneOf(['relaxed', 'moderate', 'busy'], 'Invalid pace selection')
        .required('Pace is required'),
    budget: Yup.number()
        .nullable()
        .min(0, 'Budget cannot be negative'),
    budgetCurrency: Yup.string()
        .when('budget', {
            is: (val) => val !== null && val !== undefined,
            then: (schema) => schema.required('Currency is required when budget is specified'),
            otherwise: (schema) => schema.nullable()
        })
});