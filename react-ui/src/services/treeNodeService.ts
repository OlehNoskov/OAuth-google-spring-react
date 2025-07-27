import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {NodeType} from "../interfaces/NodeType.ts";

export const getAllNodeTypes = async (): Promise<NodeType[]> => {
    try {
        const response = await axios.get(BACKEND_API.GET_ALL_NODE_TYPES, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error within getting node types', error);
        throw error;
    }
};