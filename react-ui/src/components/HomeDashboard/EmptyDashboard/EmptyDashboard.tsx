import React from 'react';
import {Paragraph, TypographyVisualStyle} from "react-magma-dom";
import styled from "@emotion/styled";

 const EmptyDashboardWrapper = styled.div`
    margin-top: 100px;
    text-align: center;
`;

export const EmptyDashboard = () => {
    return (
        <EmptyDashboardWrapper>
            <Paragraph  visualStyle={TypographyVisualStyle.headingSmall}>
                You haven't created trees.
            </Paragraph >
            <Paragraph  visualStyle={TypographyVisualStyle.headingSmall}>
                Create a new tree to get started.
            </Paragraph>
        </EmptyDashboardWrapper>
    );
};
