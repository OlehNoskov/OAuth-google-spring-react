import React from 'react';
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {getCurrentUser} from "../../services/userStorage.ts";

const TreeDashboard = () => {
    return (
        <>
            <HomeHeader user={getCurrentUser()}/>
        </>
    );
};

export default TreeDashboard;