import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, register as registerApi, LoginData, RegisterData } from '../services/authService';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    updateUserData: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    // Load user data from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error parsing stored user data:", err);
                localStorage.removeItem('user');
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    }, [token]);

    // Store user data whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const login = async (data: LoginData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await loginApi(data);
            setToken(response.token);

            if (response.user) {
                setUser({
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email
                });
            }
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await registerApi(data);
            setToken(response.token);

            if (response.user) {
                setUser({
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email
                });
            }

            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        navigate('/login');
    };

    // New function to update user data after profile updates
    const updateUserData = (userData: Partial<User>) => {
        if (user) {
            setUser({
                ...user,
                ...userData
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isAuthenticated,
            loading,
            error,
            login,
            register,
            logout,
            updateUserData
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
