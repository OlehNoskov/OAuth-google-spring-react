import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {StrictMode} from "react";
import Login from "./pages/login/Login.tsx";
import Home from "./pages/home/Home.tsx";
import {GlobalStyles} from "react-magma-dom";

import "./App.css"

function App() {

    return (
        <StrictMode>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;
