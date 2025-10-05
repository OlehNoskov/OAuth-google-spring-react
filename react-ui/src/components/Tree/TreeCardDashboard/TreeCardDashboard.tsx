import React from 'react';
import {Card, CardAlignment, CardBody, Hyperlink, Paragraph, TypographyColor} from "react-magma-dom";
import {DocumentTreeInterface} from "../../../interfaces/DocumentTreeInterface.ts";
import styled from "@emotion/styled";

interface TreeCardProps {
    tree: DocumentTreeInterface;
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
    const tree = props.tree;

    return (
        <Card align={CardAlignment.left} hasDropShadow style={{minHeight: '180px'}} width={250}>
            <CardBody style={{display: 'flex', flexDirection: 'column'}}>
                <Hyperlink style={{color: 'black', fontWeight: '600', textDecoration: 'none'}}
                           to={`/tree/${props.tree.id}`}>
                    {tree.title}
                </Hyperlink>
                <Paragraph noBottomMargin noTopMargin color={TypographyColor.subdued}>
                    {tree.createdBy}
                </Paragraph>
                <LabelsWrapper>
                    {
                        tree.labels.map(label => (
                            <LabelWrapper key={label}>{label}</LabelWrapper>
                        ))
                    }
                </LabelsWrapper>
            </CardBody>
        </Card>
    );
};