import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {UserInterface} from "../interfaces/UserInterface.ts";

export const getUserData = async (): Promise<UserInterface> => {
    const response = await axios.get<UserInterface>(BACKEND_API.USER_INFO, {
        withCredentials: true, // Send cookies for backend
    });
    return response.data;
};

export const getAllUsers = async (): Promise<UserInterface[]> => {
    const response = await axios.get<UserInterface[]>(BACKEND_API.GET_ALL_USERS, {
        withCredentials: true, // Send cookies for backend
    });
    return response.data;
};
