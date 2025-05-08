import React, {useState} from 'react';
import {
    ButtonColor,
    Card,
    CardBody,
    Flex,
    FlexAlignItems,
    FlexBehavior,
    FlexDirection,
    FlexJustify,
    FlexWrap,
    Heading,
    IconButton,
    Paragraph,
    TreeItem,
    TreeView,
    TypographyColor,
    TypographyVisualStyle
} from 'react-magma-dom';
import {TreeInterface} from "../../../interfaces/TreeInterface.ts";
import {
    LeftSideBar,
    TreeHeader,
    TreeNodeContent,
    TreeNodeSettings,
    TreeTitle,
    TreeViewComponentStyled
} from "./TreeViewComponentStyled.ts";
import {NodeType} from "../../../interfaces/NodeType.ts";
import {DeleteIcon, DnsIcon, FlagIcon, FolderIcon, LinkIcon} from "react-magma-icons";
import {RenameButton} from "../../General/RenameButton.tsx";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";

interface TreeViewComponentProps {
    tree: TreeInterface;
}

export const TreeViewComponent: React.FC<TreeViewComponentProps> = (props: TreeViewComponentProps) => {

    const [currentTree, setCurrentTree] = useState<TreeInterface | null>(props.tree);
    const [currentNode, setCurrentNode] = useState<TreeNodeInterface | null>(null);

    const getFolderIcon = (node: any) => {
        switch (node.type) {
            case NodeType.FLAG:
                return <FlagIcon aria-hidden/>;
            case NodeType.LINK:
                return <LinkIcon aria-hidden/>;
            default:
                return <FolderIcon aria-hidden/>;
        }
    }

    const treeItemLabel = (node: any) => {
        return (
            <Flex
                behavior={FlexBehavior.container}
                justify={FlexJustify.spaceBetween}
                wrap={FlexWrap.nowrap}
            >
                <Flex behavior={FlexBehavior.item}>{node.title}</Flex>
                <Flex behavior={FlexBehavior.item}>
                    <Paragraph
                        visualStyle={TypographyVisualStyle.bodySmall}
                        noMargins
                        color={TypographyColor.subdued}
                    />
                    <RenameButton/>
                </Flex>
            </Flex>
        )
    };

    const renderTree = (node: any) => (
        <TreeItem
            style={{
                marginBottom: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                marginInlineStart: '0',
                paddingLeft: `12px`,
                height: '50px',
                alignItems: 'center',
            }}
            onClick={() => setCurrentNode(node)}
            key={node.id}
            itemId={String(node.id)}
            icon={getFolderIcon(node)}
            label={treeItemLabel(node)}
            isDisabled={node.disabled}
        >
            {node.children && node.children.length > 0 &&
                node.children.map((child: any) => renderTree(child))}
        </TreeItem>
    );

    const treeTitle = () => {
        return (
            <Flex
                behavior={FlexBehavior.container}
                justify={FlexJustify.spaceBetween}
                wrap={FlexWrap.nowrap}
                style={{marginLeft: '16px'}}
            >
                <Flex behavior={FlexBehavior.item}>{currentTree?.title}</Flex>
                <Flex behavior={FlexBehavior.item}>
                    <Paragraph
                        visualStyle={TypographyVisualStyle.bodySmall}
                        noMargins
                        color={TypographyColor.subdued}
                    />
                </Flex>
                <RenameButton marginRight={'32px'} background={'#F5F5F5'}/>
            </Flex>
        )
    }

    return (
        <>
            <TreeHeader>

            </TreeHeader>
            <TreeViewComponentStyled>
                <LeftSideBar>
                    <TreeTitle id="tree-title">{treeTitle()}</TreeTitle>
                    <TreeView ariaLabelledBy="tree-title">
                        {currentTree?.children.map(child => renderTree(child))}
                    </TreeView>
                </LeftSideBar>
                <TreeNodeContent>
                    {currentNode && (
                        <>
                            <Card hasDropShadow style={{maxWidth: '700px'}}>
                                <CardBody>
                                    <Paragraph visualStyle={TypographyVisualStyle.bodyLarge}>
                                        Title: {currentNode.title}
                                    </Paragraph>
                                    <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                                        Description: {currentNode.description}
                                    </Paragraph>
                                    <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                                        Type: {currentNode.type}
                                    </Paragraph>
                                    <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                                        Has children: {currentNode.children.length > 0 ? 'Yes' : 'No'}
                                    </Paragraph>
                                </CardBody>
                            </Card>

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
                        </>
                    )}
                </TreeNodeContent>
            </TreeViewComponentStyled>
        </>
    );
};