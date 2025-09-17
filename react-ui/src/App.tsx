import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {Home} from "./pages/Home/Home.tsx";
import {PrivateRoute} from "./PrivateRoute.tsx";
import {GlobalStyles} from "react-magma-dom";

import "./App.css"
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {TreeDashboard} from "./pages/Tree/TreeDashboard.tsx";
import {Login} from "./pages/Login/Login.tsx";

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<PrivateRoute/>}> // Secured routes
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/tree/:id" element={<TreeDashboard/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
