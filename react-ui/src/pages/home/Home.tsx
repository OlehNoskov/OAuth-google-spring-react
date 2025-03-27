import React from "react";
import {USER} from "../../constants/constants.ts";
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {User} from "../../interfaces/User.ts";

const Home = () => {

    let currentUser = window.localStorage.getItem(USER);
    const user: User = JSON.parse(currentUser ?? "{}");

    return (
        <>
            <HomeHeader user={user}/>
        </>
    );
};

export default Home;
