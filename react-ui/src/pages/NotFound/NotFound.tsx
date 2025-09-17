import React from 'react';
import {NotFoundStyled} from "./NotFoundStyled.ts";
import {Paragraph, TypographyVisualStyle} from "react-magma-dom";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const NotFound = () => {
    const user = useSelector((state: RootState) => state.userProfile);
    const routeLink = user.isLoggedIn ? "/home" : "/login";

    return (
        <NotFoundStyled>
            <Paragraph visualStyle={TypographyVisualStyle.headingXLarge} style={{color: 'white', marginTop: '250px'}}>
                Ooops, Page Not Found!
            </Paragraph>
            <Paragraph visualStyle={TypographyVisualStyle.headingXLarge} style={{color: 'white'}}>
                404
            </Paragraph>
            <Link to={routeLink}>Home</Link>
        </NotFoundStyled>
    );
};