import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/authService.ts";
import {IS_LOGGED_IN, USER} from "../../constants/constants.ts";

import './Login.css';
import {Card, CardBody, Heading} from "react-magma-dom";

const Login = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    const loginUser = async (credentialResponse: CredentialResponse) => {
        const response = await login(credentialResponse);

        if (response.status === 200) {
            setIsLoggedIn(true);
            window.localStorage.setItem(IS_LOGGED_IN, String(true));
            window.localStorage.setItem(USER, JSON.stringify(response.data));
        }
    }

    useEffect(() => {
        if (!isLoggedIn) return;
        navigate('/home');
    }, [isLoggedIn]);


    return (
        <div className={"login-page"}>
            <Card className={"login-card"} width={600}>
                <CardBody>
                    <Heading className={"login-header-card"} level={5}
                             placeholder={undefined}
                             onPointerEnterCapture={undefined}
                             onPointerLeaveCapture={undefined}>Course builder app</Heading>
                    <GoogleLogin onSuccess={loginUser}/>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;