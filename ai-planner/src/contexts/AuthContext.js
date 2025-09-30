import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

// Create context
const AuthContext = createContext(null);

// Create the hook first
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Then create the provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on component mount
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            console.log('AuthContext: Starting login...');
            const response = await authService.login(credentials);
            console.log('AuthContext: Received login response:', response);

            if (!response || !response.token) {
                console.error('AuthContext: Invalid login response structure:', response);
                throw new Error('Invalid response from server');
            }

            // Store the authentication data
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user || { email: credentials.email }));
            setUser(response.user || { email: credentials.email });

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            console.log('AuthContext: Starting registration...');
            const response = await authService.register(userData);
            console.log('AuthContext: Received response:', response);

            if (!response || !response.token) {
                console.error('AuthContext: Invalid response structure:', response);
                throw new Error('Invalid response from server');
            }

            // Don't store auth data after registration, let user login explicitly
            console.log('AuthContext: Registration successful');
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};