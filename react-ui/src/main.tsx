import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="770441558625-ubdk713kutrm5rehkvlbg5hadv508lpv.apps.googleusercontent.com">
        <StrictMode>
            <App/>
        </StrictMode>
    </GoogleOAuthProvider>
)
