import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {TreeInterface} from "../interfaces/TreeInterface.ts";

export const getAllTreeByUsername = async (userName: string): Promise<TreeInterface[]> => {
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

export const getTreeById = async (id: string): Promise<TreeInterface> => {
    try {
        const response = await axios.get(`${BACKEND_API.GET_TREE_BY_ID}/${id}`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error(`Error within getting tree by id: ${id}`, error);
        throw error;
    }
};

export const getTreeByTitle = async (title: string): Promise<TreeInterface[]> => {
    try {
        const response = await axios.get(`${BACKEND_API.GET_TREE_BY_TITLE}/${title}`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error(`Error within getting tree by title: ${title}`, error);
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

export const createTree = async (tree: TreeInterface): Promise<TreeInterface> => {
    try {
        const response = await axios.post(
            `${BACKEND_API.CREATE_TREE}`,
            tree,
            {withCredentials: true}
        );
        return response.data;

    } catch (error) {
        console.error("Error within creating tree: ", error);
        throw error;
    }
};

export const deleteTreeById = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete(
            `${BACKEND_API.DELETE_TREE_BY_ID}/${id}`,
            {withCredentials: true}
        );
        return response.data;

    } catch (error) {
        console.error("Error within deleting tree: ", error);
        throw error;
    }
};