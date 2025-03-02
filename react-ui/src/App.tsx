import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./pages/login/Login.tsx";
import Home from "./pages/home/Home.tsx";
import {IS_LOGGED_IN} from "./constants/constants.ts";
import {GlobalStyles} from "react-magma-dom";

import "./App.css"

function App() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem(IS_LOGGED_IN);
        setIsLogin(isLoggedIn === "true");
    }, [])

    return (
        <div className="App">
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login isLoggedIn={isLogin} setIsLogin={setIsLogin}/>}/>
                    <Route
                        path="/home"
                        element={isLogin ? <Home/> : <Navigate to="/"/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
