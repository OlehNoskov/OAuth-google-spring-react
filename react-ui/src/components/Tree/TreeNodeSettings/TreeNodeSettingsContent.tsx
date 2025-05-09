import React from 'react';

import {ButtonColor, Flex, FlexAlignItems, FlexBehavior, FlexDirection, Heading, IconButton} from "react-magma-dom";
import {DeleteIcon, DnsIcon} from "react-magma-icons";
import {TreeNodeSettings} from "./TreeNodeSettingsContentStyled.ts";

export const TreeNodeSettingsContent = () => {
    return (
        <TreeNodeSettings>
            <Flex direction={FlexDirection.row}
                  behavior={FlexBehavior.container}
                  style={{marginTop: '32px', marginBottom: '16px'}}>
                <Flex behavior={FlexBehavior.container} alignItems={FlexAlignItems.center}
                      onClick={() => console.log('Edit Name and Description clicked!')}
                      style={{cursor: 'pointer'}}>
                    <IconButton
                        aria-label="Edit Name and Description"
                        color={ButtonColor.secondary}
                        icon={<DnsIcon/>}
                        style={{marginRight: '12px'}}
                    />
                    <Heading level={5} style={{margin: 0}} placeholder={undefined}
                             onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Edit Name and Description
                    </Heading>
                </Flex>
                <Flex behavior={FlexBehavior.container} alignItems={FlexAlignItems.center}
                      onClick={() => console.log('Delete clicked!')}
                      style={{cursor: 'pointer'}}>
                    <IconButton
                        aria-label="Delete"
                        color={ButtonColor.secondary}
                        icon={<DeleteIcon/>}
                        style={{marginRight: '12px'}}
                    />
                    <Heading level={5} placeholder={undefined}
                             onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Delete
                    </Heading>
                </Flex>
            </Flex>
        </TreeNodeSettings>
    );
};
