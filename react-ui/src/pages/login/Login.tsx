import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/authService.ts";
import {IS_LOGGED_IN} from "../../constants/constants.ts";

import './Login.css';
import {Card, CardBody, Heading} from "react-magma-dom";

interface UserLoginProps {
    isLoggedIn: boolean;
    setIsLogin: (isLoggedIn: boolean) => void;
}

const Login: FC<UserLoginProps> = (props: UserLoginProps) => {

    const navigate = useNavigate();
    const loginUser = async (credentialResponse: CredentialResponse) => {
        const response = await login(credentialResponse);

        if (response) {
            props.setIsLogin(true)
            window.localStorage.setItem(IS_LOGGED_IN, String(true));
        }
    }

    useEffect(() => {
        if (!props.isLoggedIn) return;
        navigate('/home');
    }, [props.isLoggedIn]);


    return (
        <div className={"login-page"}>
            <Card className={"login-card"} width={600}>
                <CardBody>
                    <Heading className={"login-header-card"} level={5}>Course builder app</Heading>
                    <GoogleLogin onSuccess={loginUser}/>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;