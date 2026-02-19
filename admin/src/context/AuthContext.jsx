import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            setAdmin(JSON.parse(adminInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/api/admin/login', { email, password });
            setAdmin(data);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            navigate('/');
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
