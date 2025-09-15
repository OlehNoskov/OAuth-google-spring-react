import React from 'react';
import {AppBar, Button} from "react-magma-dom";
import {useNavigate} from "react-router-dom";
import {EmailStyled, ImageStyled, NoPhotoStyled, PhotoStyled} from "./HeaderStyled.ts";
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../store/userProfileSlice";
import {RootState} from "../../store/store.ts";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userProfile);

    const logOut = () => {
        dispatch(logOutUser());
        navigate("/");
    };

    const noPhotoLabel =
        user.firstName.charAt(0).toUpperCase() + ' ' + user.lastName.charAt(0).toUpperCase();

    return (
        <AppBar isInverse
                style={{display: 'flex', justifyContent: 'end', height: '80px'}}>
            <PhotoStyled>
                {user.picture ? (
                    <ImageStyled className="image" src={user.picture} alt={noPhotoLabel}
                    />
                ) : (
                    <NoPhotoStyled className="image-placeholder">{noPhotoLabel}</NoPhotoStyled>
                )}
            </PhotoStyled>
            <EmailStyled>
                {user.email}
            </EmailStyled>
            <Button onClick={logOut}>
                Log out
            </Button>
        </AppBar>
    );
};