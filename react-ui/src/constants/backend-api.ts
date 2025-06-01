const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const BACKEND_API = {
    // USER
    LOG_IN: `${BASE_API_URL}/auth`,
    USER_INFO: `${BASE_API_URL}/user/info`,
    GET_ALL_USERS: `${BASE_API_URL}/users/all`,

    // TREE
    GET_ALL_TREE_BY_USER_NAME: `${BASE_API_URL}/tree/getAllTreeByUserName`,
    GET_ALL_TREE_BY_ID: `${BASE_API_URL}/tree/get`,
    CREATE_TREE_BY_ID: `${BASE_API_URL}/tree/create`,
    UPDATE_TREE: `${BASE_API_URL}/tree/update`,
    DELETE_TREE_BY_ID: `${BASE_API_URL}/tree/delete`,

    // LABEL
    GET_ALL_LABELS: `${BASE_API_URL}/label/all`,
}