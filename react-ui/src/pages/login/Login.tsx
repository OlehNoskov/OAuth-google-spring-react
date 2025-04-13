import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/authService.ts";
import {USER} from "../../constants/constants.ts";

import {Card, CardBody, Heading} from "react-magma-dom";
import {StyledLoginPage} from "./LoginStyled.ts";
import {UserInterface} from "../../interfaces/UserInterface.ts";

export const Login = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    let currentUser = window.localStorage.getItem(USER);
    const user: UserInterface = JSON.parse(currentUser ?? "{}");

    const loginUser = async (credentialResponse: CredentialResponse) => {
        const response = await login(credentialResponse);

        if (response.status === 200) {
            const user: UserInterface = {...response.data, isLoggedIn: true};
            window.localStorage.setItem(USER, JSON.stringify(user));

            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        if (!user.isLoggedIn) return;
        navigate('/home');
    }, [isLoggedIn]);

    return (
        <StyledLoginPage>
            <Card style={{padding: '30px'}} width={600}>
                <CardBody>
                    <Heading style={{textAlign: 'center', marginBottom: '50px'}} level={5}
                             placeholder={undefined}
                             onPointerEnterCapture={undefined}
                             onPointerLeaveCapture={undefined}>Course builder app</Heading>
                    <GoogleLogin onSuccess={loginUser}/>
                </CardBody>
            </Card>
        </StyledLoginPage>
    );
};