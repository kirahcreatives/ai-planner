import api from './api';

export const authService = {
    login: async (credentials) => {
        try {
            // Ensure email is lowercase
            const normalizedCredentials = {
                ...credentials,
                email: credentials.email.toLowerCase().trim()
            };
            
            console.log('Sending login data:', normalizedCredentials);
            const response = await api.post('/auth/login', normalizedCredentials);
            console.log('Login response:', response);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Re-throw the error with the message from handleResponse
        }
    },

    register: async (userData) => {
        try {
            // Normalize the email
            const normalizedUserData = {
                ...userData,
                email: userData.email.toLowerCase().trim()
            };
            
            console.log('Sending registration data:', normalizedUserData);
            const response = await api.post('/auth/register', normalizedUserData);
            console.log('Registration response:', response);
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error; // Re-throw the error with the message from handleResponse
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};