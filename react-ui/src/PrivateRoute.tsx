import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";

export const PrivateRoute = () => {
    const user = useSelector((state: RootState) => state.userProfile);

    if (!user.isLoggedIn) return <Navigate to="/"/>;
    return <Outlet/>;
};
