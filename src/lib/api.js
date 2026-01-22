import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token if available
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

const api = {
    // Auth endpoints
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    register: (userData) => axiosInstance.post('/auth/register', userData),

    // Driver endpoints
    registerDriver: (driverData) => axiosInstance.post('/drivers/register', driverData),
    getAvailableDrivers: () => axiosInstance.get('/drivers/available'),

    // Ride endpoints
    bookRide: (rideData) => axiosInstance.post('/rides/book', rideData),
    getUserRides: (userId) => axiosInstance.get(`/rides/user/${userId}`),
};

export default api;
