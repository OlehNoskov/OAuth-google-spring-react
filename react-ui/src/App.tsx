import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import Login from "./components/Login.tsx";
import Home from "./components/Home.tsx";

function App() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login isLoggedIn={isLogin} setIsLogin={setIsLogin}/>}/>
                <Route
                    path="/mypage"
                    element={isLogin ? <Home/> : <Navigate to="/"/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
