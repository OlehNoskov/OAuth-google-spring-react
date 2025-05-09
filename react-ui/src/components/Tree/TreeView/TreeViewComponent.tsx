import React, {useState} from 'react';
import {
    Flex,
    FlexBehavior,
    FlexJustify,
    FlexWrap,
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
    TreeTitle,
    TreeViewComponentStyled
} from "./TreeViewComponentStyled.ts";
import {NodeType} from "../../../interfaces/NodeType.ts";
import {FlagIcon, FolderIcon, LinkIcon} from "react-magma-icons";
import {RenameAndDeleteButton} from "../../General/RenameAndDeleteButton.tsx";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";
import {TreeNodeCard} from "../TreeNodeCard/TreeNodeCard.tsx";
import {TreeNodeSettingsContent} from "../TreeNodeSettings/TreeNodeSettingsContent.tsx";
import {TreeEditModal} from "../TreeEditModal/TreeEditModal.tsx";

interface TreeViewComponentProps {
    tree: TreeInterface;
}

export const TreeViewComponent: React.FC<TreeViewComponentProps> = (props: TreeViewComponentProps) => {

    const [currentTree, setCurrentTree] = useState<TreeInterface | null>(props.tree);
    const [currentNode, setCurrentNode] = useState<TreeNodeInterface | null>(null);
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(true);

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
                    <RenameAndDeleteButton/>
                </Flex>
            </Flex>
        )
    };

    const renderTree = (node: any) => {
        return (

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
                onClick={(event: any) => {
                    event.stopPropagation(); // Prevent parent nodes from being triggered
                    setCurrentNode(node);

                }}
                key={node.id}
                itemId={String(node.id)}
                icon={getFolderIcon(node)}
                label={treeItemLabel(node)}
                isDisabled={node.disabled}
            >
                {node.children && node.children.length > 0 &&
                    node.children.map((child: any) => renderTree(child))}
            </TreeItem>

        )
    };

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
                <RenameAndDeleteButton marginRight={'32px'} background={'#F5F5F5'}/>
            </Flex>
        )
    }

    return (
        <>
            {isOpenEditModal && (
                <TreeEditModal isOpen={isOpenEditModal} handleOnCLose={() => setIsOpenEditModal(false)}
                               save={() => (console.log('save'))}/>)
            }
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
                            <TreeNodeCard treeNode={currentNode}/>
                            <TreeNodeSettingsContent/>
                        </>
                    )}
                </TreeNodeContent>
            </TreeViewComponentStyled>
        </>
    );
};