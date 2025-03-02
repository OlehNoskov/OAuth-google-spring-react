import React from 'react';
import {Button} from "react-magma-dom";
import {IS_LOGGED_IN} from "../../constants/constants.ts";

const HomeHeader = () => {

    const logOut = () => {
        window.localStorage.setItem(IS_LOGGED_IN, String(true));
    }

    return (
        <div className={"home-header"}>
            <Button onClick={logOut}>
                Log out
            </Button>
        </div>
    );
};

export default HomeHeader;