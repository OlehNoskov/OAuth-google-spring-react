import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {Login} from "./pages/login/Login.tsx";
import {Home} from "./pages/home/Home.tsx";
import {GlobalStyles} from "react-magma-dom";

import "./App.css"
import {NotFound} from "./pages/notFound/NotFound.tsx";

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
