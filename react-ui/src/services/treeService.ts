import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {TreeInterface} from "../interfaces/TreeInterface.ts";
import {UserInterface} from "../interfaces/UserInterface.ts";

export const getAllTreeByUsername = async (userName: string): Promise<UserInterface> => {
    try {
        const response = await axios.get(`${BACKEND_API.GET_ALL_TREE_BY_USER_NAME}/${userName}`, {
            withCredentials: true, // Send cookies for backend
        });

        return response.data;
    } catch (error) {
        console.error(`Error within getting user by name: ${userName}`, error);
        throw error;
    }
};

export const getTreeById = async (id: number): Promise<TreeInterface> => {
    try {
        const response = await axios.get(`${BACKEND_API.GET_ALL_TREE_BY_ID}/${id}`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error(`Error within getting tree by id: ${id}`, error);
        throw error;
    }
};

export const updateTree = async (tree: TreeInterface): Promise<TreeInterface> => {
    try {
        const response = await axios.put(
            `${BACKEND_API.UPDATE_TREE}`,
            tree,
            {withCredentials: true}
        );
        return response.data;

    } catch (error) {
        console.error("Error within updating tree: ", error);
        throw error;
    }
};