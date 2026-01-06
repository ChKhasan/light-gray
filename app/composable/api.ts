import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from "axios";

import {useToken} from "@/composable/useToken";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    async (config: CustomInternalAxiosRequestConfig) => {
        const {getAccessToken} = useToken();

        if (getAccessToken() && config.headers) config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => {

        return response
    },
    async (error) => {
        const {response, config} = error;
        if (response?.status === 401) {
            await clearAll()
        }
        return Promise.reject(error);
    }
);

function clearAll() {
    const {clearTokens} = useToken();
    clearTokens();
    window.location.href = "/auth/login";
    return Promise.reject(new Error("Session expired"));
}

export default api;
