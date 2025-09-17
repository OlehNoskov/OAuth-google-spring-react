import React from "react";
import {HomeDashboard} from "../../components/HomeDashboard/HomeDashboard.tsx";
import {Header} from "../../components/Header/Header.tsx";

export const Home = () => {
    return (
        <>
            <Header/>
            <HomeDashboard/>
        </>
    );
};
