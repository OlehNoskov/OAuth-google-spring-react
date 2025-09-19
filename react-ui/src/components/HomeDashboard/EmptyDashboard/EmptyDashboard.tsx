import React from 'react';
import {Paragraph, TypographyVisualStyle} from "react-magma-dom";
import styled from "@emotion/styled";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {hasEditPermissions} from "../../../utils/getTreeSelectData.ts";

const EmptyDashboardWrapper = styled.div`
    margin-top: 100px;
    text-align: center;
`;

export const EmptyDashboard = () => {
    const user = useSelector((state: RootState) => state.userProfile);
    const hasPermissions = hasEditPermissions(user.role);

    return (
        <EmptyDashboardWrapper>
            {hasPermissions ? (
                <>
                    <Paragraph visualStyle={TypographyVisualStyle.headingSmall}>
                        You haven't created trees.
                    </Paragraph>
                    <Paragraph visualStyle={TypographyVisualStyle.headingSmall}>
                        Create a new tree to get started.
                    </Paragraph>
                </>
            ) : (
                <>
                    <Paragraph visualStyle={TypographyVisualStyle.headingSmall}>
                        You don't have any trees shared with you.
                    </Paragraph>
                    <Paragraph visualStyle={TypographyVisualStyle.headingSmall}>
                        Please, contact your administrator.
                    </Paragraph>
                </>
            )}
        </EmptyDashboardWrapper>
    );
};
