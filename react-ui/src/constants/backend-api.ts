const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const BACKEND_API = {
    LOG_IN: `${BASE_API_URL}/auth`,
    USER_INFO: `${BASE_API_URL}/user/info`
}