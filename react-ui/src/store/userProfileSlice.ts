import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInterface} from "../interfaces/UserInterface";

export const initialState: UserInterface = {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    isLoggedIn: false,
    role: null,
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        logInUser: (state, action: PayloadAction<UserInterface>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.picture = action.payload.picture;
            state.isLoggedIn = true;
            state.role = action.payload.role;
        },
        logOutUser: (state) => {
            state.firstName = initialState.firstName;
            state.lastName = initialState.lastName;
            state.email = initialState.email;
            state.picture = initialState.picture;
            state.isLoggedIn = initialState.isLoggedIn;
            state.role = initialState.role;
        },
    },
})

export const {logInUser, logOutUser} = userProfileSlice.actions
export default userProfileSlice.reducer