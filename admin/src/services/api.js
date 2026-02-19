import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    (config) => {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        if (adminInfo && adminInfo.token) {
            config.headers.Authorization = `Bearer ${adminInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
