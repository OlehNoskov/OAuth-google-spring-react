import React from 'react';
import {AppBar, Button} from "react-magma-dom";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {useNavigate} from "react-router-dom";
import {EmailStyled, NoPhotoStyled, PhotoStyled} from "./HomeHeaderStyled.ts";

export interface HomeHeaderProps {
    user: UserInterface;
}

const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
    const navigate = useNavigate();

    const logOut = () => {
        window.localStorage.clear();
        navigate("/")
    };

    const noPhotoLabel =
        props.user.firstName.charAt(0).toUpperCase() + ' '
        + props.user.lastName.charAt(0).toUpperCase();

    return (
        <AppBar isInverse
                style={{display: 'flex', justifyContent: 'end'}}>
            <PhotoStyled>
                {props.user.picture ? (
                    <img className="image" src={props.user.picture} alt={noPhotoLabel}/>
                ) : (
                <NoPhotoStyled className="image-placeholder">{noPhotoLabel}</NoPhotoStyled>
                )}
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