import React from 'react';
import {Card, CardAlignment, CardBody, CardHeading} from "react-magma-dom";
import {TreeInterface} from "../../interfaces/TreeInterface.ts";

interface TreeCardProps {
    tree: TreeInterface
}

export const TreeCard = (props: TreeCardProps) => {
    return (
        <Card align={CardAlignment.left} hasDropShadow  style={{ minHeight: '200px'}} width={250}>
            <CardBody>
                <CardHeading>{props.tree.title}</CardHeading>
                <span style={{margin: '0'}}>{props.tree.description}</span>
            </CardBody>
        </Card>
    );
};