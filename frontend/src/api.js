import axios from 'axios';

const API_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const api = {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    register: (userData) => axiosInstance.post('/auth/register', userData),
    bookRide: (rideData) => axiosInstance.post('/rides/book', rideData),
    getUserRides: (userId) => axiosInstance.get(`/rides/user/${userId}`),
};

export default api;
