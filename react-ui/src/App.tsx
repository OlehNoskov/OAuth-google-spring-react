import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Login from "./pages/login/Login.tsx";
import Home from "./pages/home/Home.tsx";
import {GlobalStyles} from "react-magma-dom";

import "./App.css"

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
