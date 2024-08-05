// axiosConfig.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean; // Add the _retry property
}

const axiosInstance = axios.create({
    baseURL: 'http://192.168.8.113:8000', // Replace with your API base URL
});

interface RefreshResponse {
    access_token: string;
}

// Function to refresh the token
const refreshAuthLogic = async (failedRequest: AxiosError): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token'); // Get the refresh token from storage

    if (refreshToken) {
        try {
            const response = await axios.post<RefreshResponse>('http://192.168.8.113:8000/auth/refresh', { refresh_token: refreshToken });
            const newAccessToken = response.data.access_token;

            // Store the new access token
            localStorage.setItem('access_token', newAccessToken);
            if (failedRequest.config && failedRequest.config.headers) {
                failedRequest.config.headers['Authorization'] = 'Bearer ' + newAccessToken;
            }
        } catch (error) {
            // If token refresh fails, log out the user
        }
    } else {
        // If there's no refresh token, log out the user
    }
};

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // Get the access token from storage
        if (token && config.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors and token refresh
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAuthLogic(error);
            return axiosInstance(originalRequest); // Retry the original request with new token
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
