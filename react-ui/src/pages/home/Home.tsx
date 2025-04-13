import React, {useEffect} from "react";
import {USER} from "../../constants/constants.ts";
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {EMPTY_USER, UserInterface} from "../../interfaces/UserInterface.ts";
import {useNavigate} from "react-router-dom";
import {Dashboard} from "../../components/Dashboard/Dashboard.tsx";

export const Home = () => {
    const navigate = useNavigate();
    const currentUser = window.localStorage.getItem(USER);
    let initialUser: UserInterface = EMPTY_USER;

    if (currentUser) {
        try {
            initialUser = JSON.parse(currentUser);
        } catch (error) {
            console.error('Error parsing user data from storage:', error);
        }
    }

    useEffect(() => {
        if (!initialUser.isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    return initialUser && initialUser.isLoggedIn && (
        <>
            <HomeHeader user={initialUser}/>
            <Dashboard/>
        </>
    );
};
