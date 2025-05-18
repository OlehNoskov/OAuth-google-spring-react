import React from 'react';
import {Card, CardBody, Paragraph, TypographyVisualStyle} from "react-magma-dom";

export const TreeNodeEmptyCard = () => {
    return (
        <Card style={{marginTop: '50px', width: 'fit-content', margin: '150px auto'}} hasDropShadow>
            <CardBody>
                <Paragraph style={{textAlign: 'center'}} visualStyle={TypographyVisualStyle.bodyMedium}>
                    You have not selected any tree node yet.
                </Paragraph>
                <Paragraph style={{textAlign: 'center'}} noTopMargin visualStyle={TypographyVisualStyle.bodyMedium}>
                    Please select a tree node from the left panel to view its details.
                </Paragraph>
            </CardBody>
        </Card>
    );
};