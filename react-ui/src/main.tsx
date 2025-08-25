import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {persistor, store} from './store/store'
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <StrictMode>
                <App/>
            </StrictMode>
        </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
)