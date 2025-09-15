import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {HomeDashboard} from "../../components/HomeDashboard/HomeDashboard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {Header} from "../../components/Header/Header.tsx";

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
            <Header/>
            <HomeDashboard/>
        </>
    );
};
