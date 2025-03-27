import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {User} from "../interfaces/User.ts";

export const getUserData = async (): Promise<User> => {
    const response = await axios.get<User>(BACKEND_API.USER_INFO, {
        withCredentials: true, // Send cookies for backend
    });
    return response.data;
};
