import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the AuthContext
interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void; // The function should accept string or null
}

// Create context with proper default values
export const AuthContext = createContext<AuthContextType>({
    token: localStorage.getItem('token'), // Get token from localStorage
    setToken: () => {}, // Placeholder function
});

// Define props type for AuthProvider
interface AuthProviderProps {
    children: ReactNode; // Correctly type children prop
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));

    const handleSetToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem('token', newToken); // Set token in localStorage
        } else {
            localStorage.removeItem('token'); // Remove token from localStorage
        }
        setTokenState(newToken); // Update context token state
    };

    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};
