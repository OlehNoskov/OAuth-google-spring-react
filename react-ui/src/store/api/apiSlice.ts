import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BACKEND_API, BASE_API_URL} from "../../constants/backend-api.ts";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {CredentialResponse} from "@react-oauth/google";
import {logInUser} from "../userProfileSlice.ts";
import {LabelInterface} from "../../interfaces/LabelInterface.ts";
import {NodeTypeInterface} from "../../interfaces/NodeTypeInterface.ts";

// RTK Query - fetching and caching tool.
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
                body: {token: credentialResponse.credential},
                keepUnusedDataFor: 60 * 60, // Cache for 1 hour, default value
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled;
                // Store user data in Redux store
                dispatch(logInUser(data));
            },
        }),

        // I do not need to manually store or dispatch the data—RTK Query handles it for me.
        getAllLabels: builder.query<LabelInterface[], void>({
            query: () => ({
                url: BACKEND_API.GET_ALL_LABELS,
                method: 'GET',
                keepUnusedDataFor: 60 * 60, // Default value
            }),
        }),

        getAllUsers: builder.query<UserInterface[], void>({
            query: () => ({
                url: BACKEND_API.GET_ALL_USERS,
                method: 'GET',
                keepUnusedDataFor: 60 * 60, // Default value
            }),
        }),

        getAllTreeNodeTypes: builder.query<NodeTypeInterface[], void>({
            query: () => ({
                url: BACKEND_API.GET_ALL_NODE_TYPES,
                method: 'GET',
                keepUnusedDataFor: 60 * 60, // Default value
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useGetAllLabelsQuery,
    useGetAllUsersQuery,
    useGetAllTreeNodeTypesQuery
} = apiSlice;
