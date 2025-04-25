const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const BACKEND_API = {
    // USER
    LOG_IN: `${BASE_API_URL}/auth`,
    USER_INFO: `${BASE_API_URL}/user/info`,

    // TREE
    GET_ALL_TREE_BY_USER_NAME: `${BASE_API_URL}/tree/getAllTreeByUserName`,
    GET_ALL_TREE_BY_ID: `${BASE_API_URL}/tree/get`,
}