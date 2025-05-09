import React from 'react';
import {Card, CardBody, Paragraph, TypographyVisualStyle} from "react-magma-dom";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";

interface TreeNodeCardProps {
    treeNode: TreeNodeInterface;
}

export const TreeNodeCard: React.FC<TreeNodeCardProps> = (props: TreeNodeCardProps) => {
    return (
        <Card hasDropShadow style={{maxWidth: '700px'}}>
            <CardBody>
                <Paragraph visualStyle={TypographyVisualStyle.bodyLarge}>
                    Title: {props.treeNode.title}
                </Paragraph>
                <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                    Description: {props.treeNode.description}
                </Paragraph>
                <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                    Type: {props.treeNode.type}
                </Paragraph>
                <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                    Has children: {props.treeNode.children.length > 0 ? 'Yes' : 'No'}
                </Paragraph>
            </CardBody>
        </Card>
    );
}