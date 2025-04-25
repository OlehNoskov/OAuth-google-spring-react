import React, {useEffect} from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {useNavigate} from "react-router-dom";
import {HomeDashboard} from "../../components/HomeDashboard/HomeDashboard.tsx";
import {getCurrentUser} from "../../services/userStorage.ts";

export const Home = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    return currentUser && currentUser.isLoggedIn && (
        <>
            <HomeHeader user={currentUser}/>
            <HomeDashboard/>
        </>
    );
};
