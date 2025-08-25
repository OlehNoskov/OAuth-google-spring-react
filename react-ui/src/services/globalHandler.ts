import axios from "axios";
import {USER} from "../constants/constants.ts";

// Globally unauthenticated handler for all axios requests
 axios.interceptors.response.use(
    response => response,
     async error => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem(USER);
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);