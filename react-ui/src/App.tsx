import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {Login} from "./pages/Login/Login.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {GlobalStyles} from "react-magma-dom";

import "./App.css"
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {TreeDashboard} from "./pages/Tree/TreeDashboard.tsx";

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/tree/:id" element={<TreeDashboard/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
