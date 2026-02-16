import {configureStore} from '@reduxjs/toolkit'
import userProfileReducer from './userProfileSlice.ts'
import {apiSlice} from "./api/apiSlice.ts";
import {combineReducers} from '@reduxjs/toolkit'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [apiSlice.reducerPath, 'userProfile'], // persist RTK Query cache and userProfile
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    userProfile: userProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Redux Toolkit will handle these actions properly during serialization, preventing any potential issues
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch