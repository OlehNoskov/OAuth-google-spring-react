export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    isLoggedIn?: boolean;
}

export const EMPTY_USER: UserInterface = {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    isLoggedIn: false,
}