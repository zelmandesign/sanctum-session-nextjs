
"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import AuthService from '@/app/services/AuthService'

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state to avoid premature redirects


    // Check authentication status on initial load
    useEffect(() => {
        const initializeAuth = async () => {
            const user = await AuthService.checkAuthStatus();
            if (user) {
                setAuthUser(user);            // Set the authenticated user
                setIsAuthenticated(true);      // Set authenticated status
            } else {
                setAuthUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false); // Loading complete
        };
        initializeAuth();
    }, []); // Empty dependency array means this runs once on mount

    // The login function inside AuthContext
    const login = async (email, password) => {
        try {
            // Call AuthService.login to perform the actual API request
            const user = await AuthService.login(email, password);

            // Update context state based on successful login
            setAuthUser(user);               // Set the user in context
            setIsAuthenticated(true);         // Set authentication to true
            return user;
        } catch (error) {
            setIsAuthenticated(false);
            setAuthUser(null);
            throw error;                      // Throw the error if login fails
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();        // Call logout from AuthService
            setAuthUser(null);                 // Clear user from context
            setIsAuthenticated(false);         // Set authentication to false
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const value = {
        authUser,
        isAuthenticated,
        login,
        logout, // Provide login function to be used by other components
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;