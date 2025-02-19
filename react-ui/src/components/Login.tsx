import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../service/authService.ts";

interface UserLoginProps {
    setIsLogin: (isLoggedIn: boolean) => void;
    isLoggedIn: boolean;
}

const Login: FC<UserLoginProps> = (props: UserLoginProps) => {

    const navigate = useNavigate();

    const verifyUser = async (credentialResponse: CredentialResponse) => {
        if (await login(credentialResponse)) {
            props.setIsLogin(true)
        }
    }

    useEffect(() => {
        if (!props.isLoggedIn) return;
        navigate('/mypage');
    }, [props.isLoggedIn]);


    return (
        <div>
            <h2>React Google Login Page</h2>
            <GoogleLogin onSuccess={verifyUser}/>
        </div>
    );
};

export default Login;