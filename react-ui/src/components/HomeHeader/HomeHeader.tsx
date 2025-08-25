import React from 'react';
import {AppBar, Button} from "react-magma-dom";
import {UserInterface} from "../../interfaces/UserInterface.ts";
import {useNavigate} from "react-router-dom";
import {EmailStyled, NoPhotoStyled, PhotoStyled} from "./HomeHeaderStyled.ts";
import {useDispatch} from "react-redux";
import {logOutUser} from "../../store/userProfileSlice";

export interface HomeHeaderProps {
    user: UserInterface;
}

const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logOutUser());
        navigate("/");
    };

    const noPhotoLabel =
        props.user.firstName.charAt(0).toUpperCase() + ' '
        + props.user.lastName.charAt(0).toUpperCase();

    return (
        <AppBar isInverse
                style={{display: 'flex', justifyContent: 'end', height: '80px'}}>
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