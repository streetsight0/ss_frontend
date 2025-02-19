import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the AuthContext
interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
}

// Create context with proper default values
export const AuthContext = createContext<AuthContextType>({
    token: localStorage.getItem('token'), // Get token from localStorage
    setToken: () => {}, // Placeholder function
});

// Define props type for AuthProvider
interface AuthProviderProps {
    children: ReactNode; // ✅ Correctly type children prop
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const handleSetToken = (newToken: string) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token'); // Remove token if null
        }
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};
