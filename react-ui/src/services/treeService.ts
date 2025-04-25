
import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";

export const getAllTreeByUsername = async (userName: string) => {
    // return await axios.get("http://localhost:8080/tree/getAllByUser/oleh.noskov@nixs.com", {
    return await axios.get(`${BACKEND_API.GET_ALL_TREE_BY_USER_NAME}/${userName}`, {
        withCredentials: true, // Send cookies for backend
    });
};

export const getTreeById = async (id: number) => {
    return await axios.get(`${BACKEND_API.GET_ALL_TREE_BY_ID}/${id}`, {
        withCredentials: true, // Send cookies for backend
    });
};