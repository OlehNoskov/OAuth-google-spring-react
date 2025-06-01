import axios from "axios";
import {BACKEND_API} from "../constants/backend-api.ts";
import {LabelInterface} from "../interfaces/TreeInterface.ts";

export const getAllLabels = async (): Promise<LabelInterface[]> => {
    try {
        const response = await axios.get(`${BACKEND_API.GET_ALL_LABELS}`, {
            withCredentials: true, // Send cookies for backend
        });

        return response.data;
    } catch (error) {
        console.error(`Error within getting labels!`, error);
        throw error;
    }
};