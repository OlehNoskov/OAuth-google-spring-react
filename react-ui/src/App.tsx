import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./components/Login.tsx";
import Home from "./components/Home.tsx";

function App() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        console.log(isLogin);
    }, [isLogin])

    // useEffect(() => {
    //     sessionStorage.setItem("isTrue", isLogin);
    // }, [isLogin]);

    // useEffect(() => {
    //     const initLogin = async () => {
    //         const name = await getUserData();
    //         setIsLogin(!!name);
    //     };
    //     initLogin();
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login isLoggedIn={isLogin} setIsLogin={setIsLogin}/>}/>
                <Route
                    path="/home"
                    element={isLogin ? <Home/> : <Navigate to="/"/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
