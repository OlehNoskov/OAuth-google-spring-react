import React from 'react';
import {AppBar, Button} from "react-magma-dom";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {useNavigate} from "react-router-dom";
import {EmailStyled, PhotoStyled} from "./HomeHeaderStyled.ts";

export interface HomeHeaderProps {
    user: UserInterface;
}

const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
    const navigate = useNavigate();

    const logOut = () => {
        window.localStorage.clear();
        navigate("/")
    };

    return (
        <AppBar isInverse
                style={{display: 'flex', justifyContent: 'end'}}>
            <PhotoStyled>
                <img className={"image"} src={props.user.picture} alt="account_photo"/>
            </PhotoStyled>
            <EmailStyled>
                {props.user.email}
            </EmailStyled>
            <Button onClick={logOut}>
                Log out
            </Button>
        </AppBar>
    );
};

export default HomeHeader;