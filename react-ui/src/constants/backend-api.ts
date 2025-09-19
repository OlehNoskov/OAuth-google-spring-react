export const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const BACKEND_API = {
    // USER
    LOG_IN: `${BASE_API_URL}/auth`,
    USER_INFO: `${BASE_API_URL}/user/info`,
    GET_ALL_USERS: `${BASE_API_URL}/users/all`,

    // TREE
    GET_ALL_TREE: `${BASE_API_URL}/tree/get-all`,
    GET_TREE_BY_ID: `${BASE_API_URL}/tree/get`,
    GET_TREE_BY_TITLE: `${BASE_API_URL}/tree/get/title`,
    CREATE_TREE: `${BASE_API_URL}/tree/create`,
    UPDATE_TREE: `${BASE_API_URL}/tree/update`,
    DELETE_TREE_BY_ID: `${BASE_API_URL}/tree/delete`,

    // LABEL
    GET_ALL_LABELS: `${BASE_API_URL}/label/all`,

    //TREE NODE
    GET_ALL_NODE_TYPES: `${BASE_API_URL}/tree-node/types/all`,
}