import React, {useEffect} from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {useNavigate} from "react-router-dom";
import {HomeDashboard} from "../../components/HomeDashboard/HomeDashboard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userProfile);

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    return  (
        <>
            <HomeHeader user={user}/>
            <HomeDashboard/>
        </>
    );
};
