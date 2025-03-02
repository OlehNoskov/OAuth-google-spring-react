export interface Account {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}

export const EMPTY_ACCOUNT: Account = {
    email: "",
    firstName: "",
    lastName: "",
    picture: ""
}