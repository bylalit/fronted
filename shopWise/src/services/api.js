import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// 1. Request Interceptor: Har request me access token automatic add karne ke liye
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Response Interceptor: Agar 401 (Expired) error aaye toh refresh token use karna
API.interceptors.response.use(
    (response) => response, // Agar response sahi hai toh direct return karo
    async (error) => {
        const originalRequest = error.config;

        // Agar error 401 hai aur humne is request ko pehle retry nahi kiya hai (_retry flag)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                
                if (!refreshToken) {
                    // Agar refresh token hi nahi hai, toh seedha logout kar do
                    handleLogout();
                    return Promise.reject(error);
                }

                // Django ke token refresh endpoint par POST request bhejein
                // Note: Endpoint aapke urls.py ke mutabik badal sakta hai (e.g., /token/refresh/)
                const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                if (res.status === 200) {
                    const newAccessToken = res.data.access;
                    
                    // LocalStorage me naya access token save karein
                    localStorage.setItem('accessToken', newAccessToken);
                    
                    // Original request ke header ko naye token se update karein
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    
                    // Fail hui request ko phir se run karein
                    return API(originalRequest);
                }
            } catch (refreshError) {
                // Agar refresh token bhi expire ho gaya hai, toh user ko logout kar do
                console.error("Refresh token expire ho gaya hai. Dobara login karein.");
                handleLogout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login'; // User ko login page par bhej dein
};

export default API;