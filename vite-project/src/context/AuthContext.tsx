import React, { createContext, useState, useEffect } from 'react';

// AuthContext to hold JWT Token
export const AuthContext = createContext({
    token: localStorage.getItem('token'),
    setToken: (token: string) => {},
});

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleSetToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};
