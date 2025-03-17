import React from "react";
import {USER} from "../../constants/constants.ts";
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {Account} from "../../interfaces/Account.ts";

const Home = () => {

    let user = window.localStorage.getItem(USER);
    const account: Account = JSON.parse(user);

    return (
        <>
            <HomeHeader account={account}/>
        </>
    );
};

export default Home;
