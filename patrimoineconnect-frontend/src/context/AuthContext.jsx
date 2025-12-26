import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return sessionStorage.getItem('token') || null;
    });
    const isAuthenticated = !!token;

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('token', userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };
    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

export default AuthContext;
