import axios from "axios";

import {BACKEND_API} from "../constants/backend-api.ts";
import {CredentialResponse} from "@react-oauth/google";

export const login = async (credentialResponse: CredentialResponse) => {
        const token = {idToken: credentialResponse.credential};

        return await axios.post(BACKEND_API.LOG_IN, token, {
            withCredentials: true, // Send cookies for backend
        });
};