import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BACKEND_API, BASE_API_URL} from "../../constants/backend-api.ts";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {CredentialResponse} from "@react-oauth/google";
import {logInUser} from "../userProfileSlice.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include', // Send token with every request
    }),
    endpoints: builder => ({
        login: builder.mutation<UserInterface, CredentialResponse>({
            query: (credentialResponse: CredentialResponse) => ({
                url: BACKEND_API.LOG_IN,
                method: 'POST',
                body: {idToken: credentialResponse.credential},
                keepUnusedDataFor: 60 * 60, // Cache for 1 hour
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled;
                // Store user data in Redux
                dispatch(logInUser(data));
            },
        })
    })
})

export const {useLoginMutation} = apiSlice;
