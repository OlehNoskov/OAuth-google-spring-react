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
import {TreeDeleteModal} from "../TreeDeleteModal/TreeDeleteModal.tsx";
import {TreeEditModal} from "../TreeEditModal/TreeEditModal.tsx";
import {TreeNodeEmptyCard} from "../TreeNodeEmptyCard/TreeNodeEmptyCard.tsx";

interface TreeViewComponentProps {
    tree: TreeInterface | undefined;
}

export const TreeViewComponent: React.FC<TreeViewComponentProps> = (props: TreeViewComponentProps) => {

    const [currentTree, setCurrentTree] = useState<TreeInterface | undefined>(props.tree);
    const [currentNode, setCurrentNode] = useState<TreeNodeInterface | null>();

    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    const [nameNode, setNameNode] = useState<string>('');
    const [descriptionNode, setDescriptionNode] = useState<string>('');

    const editNameAndDescriptionNode = () => {
        setCurrentTree((prevTree) => {
            if (!prevTree) {
                return prevTree;
            }
            return {
                ...prevTree,
                nodes: prevTree.nodes.map((node) =>
                    node.id === currentNode?.id
                        ? {...node, title: nameNode, description: descriptionNode}
                        : node
                ),
            };
        });
    };

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
                    <RenameAndDeleteButton onClickEdit={() => setIsOpenEditModal(true)}
                                           onClickDelete={() => setIsOpenDeleteModal(true)}/>
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
                    setNameNode(node?.title)
                    setDescriptionNode(node?.description)
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
                <RenameAndDeleteButton onClickEdit={() => setIsOpenEditModal(true)}
                                       onClickDelete={() => setIsOpenDeleteModal(true)}
                                       marginRight={'32px'} background={'#F5F5F5'}/>
            </Flex>
        )
    }

    return (
        <>
            {isOpenEditModal && (
                <TreeEditModal isOpen={isOpenEditModal}
                               handleOnCLose={() => setIsOpenEditModal(false)}
                               onSave={editNameAndDescriptionNode}
                               nameNode={nameNode}
                               editNameNode={(value: string) => setNameNode(value)}
                               descriptionNode={descriptionNode}
                               editDescriptionNode={(value: string) => setDescriptionNode(value)}
                />)
            }
            {isOpenDeleteModal && (
                <TreeDeleteModal isOpen={isOpenDeleteModal} handleOnCLose={() => setIsOpenDeleteModal(false)}
                                 onDelete={() => (console.log('delete'))}/>)
            }
            <TreeHeader></TreeHeader>
            <TreeViewComponentStyled>
                <LeftSideBar>
                    <TreeTitle id="tree-title">{treeTitle()}</TreeTitle>
                    <TreeView ariaLabelledBy="tree-title">
                        {currentTree?.nodes.map(child => renderTree(child))}
                    </TreeView>
                </LeftSideBar>
                <TreeNodeContent>
                    {!!currentNode
                        ?
                        <>
                            <TreeNodeCard treeNode={currentNode}/>
                            <TreeNodeSettingsContent onEditNameAndDescription={() => setIsOpenEditModal(true)}
                                                     onDelete={() => setIsOpenDeleteModal(true)}/>
                        </>
                        : <TreeNodeEmptyCard/>}
                </TreeNodeContent>
            </TreeViewComponentStyled>
        </>
    );
};