import React from 'react';
import {AppBar, Button} from "react-magma-dom";
import {Account} from "../../interfaces/Account.ts";
import {useNavigate} from "react-router-dom";
import styled from '@emotion/styled';

export interface HomeHeaderProps {
    account: Account;
}

export const PhotoStyled = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
                <img className={"image"} src={props.account.picture} alt="account_photo"/>
            </PhotoStyled>
            <div style={{marginRight: '20px', marginLeft: '20px'}}>
                {props.account.email}
            </div>
            <Button onClick={logOut}>
                Log out
            </Button>
        </AppBar>
    );
};

export default HomeHeader;