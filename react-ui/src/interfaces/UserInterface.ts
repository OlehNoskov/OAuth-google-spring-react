import {UserRole} from "./UserRole.ts";

export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    isLoggedIn?: boolean;
    role: UserRole | null;
}