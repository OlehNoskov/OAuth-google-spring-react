import {GoogleLogin} from "@react-oauth/google";
import React, {useEffect} from "react";
import {Card, CardBody, Paragraph, TypographyVisualStyle} from "react-magma-dom";
import {StyledLoginFooter, StyledLoginPage} from "./LoginStyled.ts";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useLoginMutation} from "../../store/api/apiSlice.ts";
import {RootState} from "../../store/store.ts";

export const Login = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userProfile);
    const [login] = useLoginMutation();

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <>
            <StyledLoginPage>
                <Card style={{padding: '30px'}} width={600}>
                    <CardBody>
                        <Paragraph
                            visualStyle={TypographyVisualStyle.bodyLarge}
                            style={{textAlign: 'center', marginBottom: '50px'}}
                        >Course builder app</Paragraph>
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => await login(credentialResponse).unwrap()}/>
                    </CardBody>
                </Card>
            </StyledLoginPage>
            <StyledLoginFooter>
                <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    style={{
                        textAlign: 'right',
                        marginTop: '50px',
                        marginRight: '50px',
                        color: '#fff',
                        fontWeight: '600'
                    }}>
                    Author: Noskov Oleh
                </Paragraph>

            </StyledLoginFooter>
        </>
    );
};