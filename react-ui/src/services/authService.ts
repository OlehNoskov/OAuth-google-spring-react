import axios from "axios";

import {BACKEND_API} from "../constants/backend-api.ts";
import {CredentialResponse} from "@react-oauth/google";
import {USER} from "../constants/constants.ts";

export const login = async (credentialResponse: CredentialResponse) => {
        const token = {idToken: credentialResponse.credential};

        return await axios.post(BACKEND_API.LOG_IN, token, {
            withCredentials: true, // Send cookies for backend
        });
};

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