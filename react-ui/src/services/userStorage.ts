import {USER} from "../constants/constants.ts";
import {EMPTY_USER, UserInterface} from "../interfaces/UserInterface.ts";

export const getCurrentUser = (): UserInterface => {
    const currentUser = window.localStorage.getItem(USER);
    let initialUser: UserInterface = EMPTY_USER;

    if (currentUser) {
        try {
            initialUser = JSON.parse(currentUser);
        } catch (error) {
            console.error('Error parsing user data from storage:', error);
        }
    }

    return initialUser;
};