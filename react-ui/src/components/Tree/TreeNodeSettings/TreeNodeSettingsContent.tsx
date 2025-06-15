import React from 'react';

import {ButtonColor, Flex, FlexAlignItems, FlexBehavior, FlexDirection, Heading, IconButton} from "react-magma-dom";
import {DeleteIcon, DnsIcon} from "react-magma-icons";
import {TreeNodeSettings} from "./TreeNodeSettingsContentStyled.ts";

interface TreeNodeSettingsContentProps {
    onCreateNewTreeNode: () => void;
    onEditNameAndDescription: () => void;
    onDelete: () => void;
}

export const TreeNodeSettingsContent = (props: TreeNodeSettingsContentProps) => {
    const {onCreateNewTreeNode, onEditNameAndDescription, onDelete} = props;

    return (
        <TreeNodeSettings>
            <Flex direction={FlexDirection.row}
                  behavior={FlexBehavior.container}
                  style={{marginTop: '32px'}}>
                <Flex behavior={FlexBehavior.container} alignItems={FlexAlignItems.center}
                      onClick={onCreateNewTreeNode}
                      style={{cursor: 'pointer', marginBottom: '12px'}}>
                    <IconButton
                        aria-label="Create New Tree Node"
                        color={ButtonColor.secondary}
                        icon={<DnsIcon/>}
                        style={{marginRight: '12px'}}
                    />
                    <Heading level={5} style={{margin: 0}} placeholder={undefined}
                             onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Create New Tree Node
                    </Heading>
                </Flex>
                <Flex behavior={FlexBehavior.container} alignItems={FlexAlignItems.center}
                      onClick={onEditNameAndDescription}
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
                      onClick={onDelete}
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
