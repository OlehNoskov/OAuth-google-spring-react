import {BACKEND_API} from "../constants/backend-api.ts";
import {CredentialResponse} from "@react-oauth/google";

export const login = async (credentialResponse: CredentialResponse) => {
    try {
        const token = {idToken: credentialResponse.credential};
        const response = await fetch(BACKEND_API.LOG_IN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(token)
        });

        return response.ok;

    } catch (error) {
        console.error("Login Error:", error);
    }
};