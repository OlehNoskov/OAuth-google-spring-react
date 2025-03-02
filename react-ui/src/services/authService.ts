import axios from "axios";

import {BACKEND_API} from "../constants/backend-api.ts";
import {CredentialResponse} from "@react-oauth/google";

export const login = async (credentialResponse: CredentialResponse) => {
    try {
        const token = {idToken: credentialResponse.credential};
        const response = await axios.post(BACKEND_API.LOG_IN, token, {
            withCredentials: true, // Send cookies for backend
        });
        return response.status === 200;

    } catch (error) {
        console.error("Login Error:", error);
        return false;
    }
};