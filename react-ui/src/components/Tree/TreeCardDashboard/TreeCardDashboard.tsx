import React from 'react';
import {Card, CardAlignment, CardBody, Hyperlink, Paragraph, TypographyColor} from "react-magma-dom";
import {TreeInterface} from "../../../interfaces/TreeInterface.ts";
import styled from "@emotion/styled";

interface TreeCardProps {
    tree: TreeInterface
}

const LabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 4px;
    background-color: #3e3b3b;
    align-content: flex-start;
    color: white;
    padding: 0 8px;
    border-radius: 16px;
    width: fit-content;
    height: fit-content;
`;

const LabelsWrapper = styled.div`
    margin-top: 12px;
`;

export const TreeCardDashboard = (props: TreeCardProps) => {
    const labels = props.tree.labels;

    return (
        <Card align={CardAlignment.left} hasDropShadow style={{minHeight: '180px'}} width={250}>
            <CardBody style={{display: 'flex', flexDirection: 'column'}}>
                <Hyperlink style={{color: 'black', fontWeight: '600', textDecoration: 'none'}}
                           to={`/tree/${props.tree.id}`}>
                    {props.tree.title}
                </Hyperlink>
                <Paragraph noBottomMargin noTopMargin color={TypographyColor.subdued}>
                    {props.tree.createdBy}
                </Paragraph>
                <LabelsWrapper>
                    {
                        labels.map(label => (
                            <LabelWrapper key={label.value}>{label.value}</LabelWrapper>
                        ))
                    }
                </LabelsWrapper>
            </CardBody>
        </Card>
    );
};