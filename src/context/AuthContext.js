"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for persisted user on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            // Call API with identifier instead of email
            const response = await api.login({
                identifier: credentials.identifier,
                password: credentials.password
            });
            const userData = response.data;

            // Validate response
            if (!userData || !userData.id) {
                throw new Error("Invalid response from server");
            }

            // Save to state and storage
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));

            // Navigate
            router.push('/');
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);

            // Extract error message
            let errorMessage = "Login failed. Please try again.";
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.register(userData);
            // After register, user needs to login
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);

            // Extract error message
            let errorMessage = "Registration failed. Please try again.";
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
