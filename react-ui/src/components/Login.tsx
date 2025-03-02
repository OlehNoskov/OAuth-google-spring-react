import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../services/authService.ts";

interface UserLoginProps {
    setIsLogin: (isLoggedIn: boolean) => void;
    isLoggedIn: boolean;
}

const Login: FC<UserLoginProps> = (props: UserLoginProps) => {

    const navigate = useNavigate();
    const loginUser = async (credentialResponse: CredentialResponse) => {
        const response = await login(credentialResponse);

        if (response) {
            props.setIsLogin(true)
        }
    }

    useEffect(() => {
        if (!props.isLoggedIn) return;
        navigate('/home');
    }, [props.isLoggedIn]);


    return (
        <div>
            <h2>React Google Login Page</h2>
            <GoogleLogin onSuccess={loginUser}/>
        </div>
    );
};

export default Login;