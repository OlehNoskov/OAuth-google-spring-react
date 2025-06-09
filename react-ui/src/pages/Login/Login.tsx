import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import React, {useEffect, useState} from "react";
import {login} from "../../services/authService.ts";
import {USER} from "../../constants/constants.ts";

import {Card, CardBody, Paragraph, TypographyVisualStyle} from "react-magma-dom";
import {StyledLoginFooter, StyledLoginPage} from "./LoginStyled.ts";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {useNavigate} from "react-router-dom";

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
        <>
            <StyledLoginPage>
                <Card style={{padding: '30px'}} width={600}>
                    <CardBody>
                        <Paragraph
                            visualStyle={TypographyVisualStyle.bodyLarge}
                            style={{textAlign: 'center', marginBottom: '50px'}}
                        >Course builder app</Paragraph>
                        <GoogleLogin onSuccess={loginUser}/>
                    </CardBody>
                </Card>
            </StyledLoginPage>
            <StyledLoginFooter>
                <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    style={{textAlign: 'center', marginTop: '25px', color: '#fff', fontWeight: '600'}}
                >
                    This app is built with React, TypeScript, and React Magma Library.
                </Paragraph>
                <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    style={{textAlign: 'right', marginTop: '20px', marginRight: '50px', color: '#fff',  fontWeight: '600'}}>
                    Author: Noskov Oleh
                </Paragraph>

            </StyledLoginFooter>
        </>
    );
};