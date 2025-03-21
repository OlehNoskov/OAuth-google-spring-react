import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {Account} from "../interfaces/Account.ts";

export const getUserData = async (): Promise<Account> => {
    const response = await axios.get<Account>(BACKEND_API.USER_INFO, {
        withCredentials: true, // Send cookies for backend
    });
    return response.data;
};
