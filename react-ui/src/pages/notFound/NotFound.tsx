import React from 'react';
import {NotFoundStyled} from "./NotFoundStyled.ts";
import {Paragraph, TypographyVisualStyle} from "react-magma-dom";
import {Link} from "react-router-dom";

export const NotFound = () => {

    return (
        <NotFoundStyled>
            <Paragraph visualStyle={TypographyVisualStyle.headingXLarge} style={{color: 'white', marginTop: '250px'}}>
                Ooops, Page Not Found!
            </Paragraph>
            <Paragraph visualStyle={TypographyVisualStyle.headingXLarge} style={{color: 'white'}}>
                404
            </Paragraph>
            <Link to="/home">Home</Link>
        </NotFoundStyled>
    );
};