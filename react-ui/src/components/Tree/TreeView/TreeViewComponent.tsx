import React, {useState} from 'react';
import {
    Flex,
    FlexBehavior,
    FlexJustify,
    FlexWrap,
    IconButton,
    Paragraph,
    TreeItem,
    TreeView,
    TypographyColor,
    TypographyVisualStyle
} from 'react-magma-dom';
import {TreeInterface} from "../../../interfaces/TreeInterface.ts";
import {
    AddTreeNodeButtonWrapper,
    LeftSideBar,
    TreeNodeContent,
    TreeTitle,
    TreeViewComponentStyled
} from "./TreeViewComponentStyled.ts";
import {NodeType} from "../../../interfaces/NodeType.ts";
import {AddIcon, FlagIcon, FolderIcon, LinkIcon} from "react-magma-icons";
import {EditButton} from "../../General/EditButton.tsx";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";
import {TreeNodeCard} from "../TreeNodeCard/TreeNodeCard.tsx";
import {TreeNodeSettingsContent} from "../TreeNodeSettings/TreeNodeSettingsContent.tsx";
import {DeleteModal} from "../DeleteModal/DeleteModal.tsx";
import {EditModal} from "../EditModal/EditModal.tsx";
import {TreeNodeEmptyCard} from "../TreeNodeEmptyCard/TreeNodeEmptyCard.tsx";
import {TreeHeader} from "../TreeHeader/TreeHeader.tsx";
import {deleteTreeById, updateTree} from "../../../services/treeService.ts";
import {ToastNotification} from "../../General/ToastNotification.tsx";
import {useNavigate} from "react-router-dom";
import {CreateTreeNodeModal} from "../CreateTreeNodeModal/CreateTreeNodeModal.tsx";

interface TreeViewComponentProps {
    tree: TreeInterface;
}

export const TreeViewComponent: React.FC<TreeViewComponentProps> = (props: TreeViewComponentProps) => {
    const {tree} = props;
    const navigate = useNavigate();

    const [currentTree, setCurrentTree] = useState<TreeInterface>(tree);
    const [currentNode, setCurrentNode] = useState<TreeNodeInterface | null>();

    const [isOpenEditNodeModal, setIsOpenEditNodeModal] = useState<boolean>(false);
    const [isOpenDeleteNodeModal, setIsOpenDeleteNodeModal] = useState<boolean>(false);

    const [isOpenCreateTreeNodeModal, setIsOpenCreateTreeNodeModal] = useState<boolean>(false);
    const [isOpenEditTreeModal, setIsOpenEditTreeModal] = useState<boolean>(false);
    const [isOpenDeleteTreeModal, setIsOpenDeleteTreeModal] = useState<boolean>(false);

    const [nameCurrentNode, setNameCurrentNode] = useState<string>('');
    const [descriptionCurrentNode, setDescriptionCurrentNode] = useState<string>('');

    const [titleCurrentTree, setTitleCurrentTree] = useState<string>(tree?.title ? tree?.title : '');
    const [descriptionCurrentTree, setDescriptionCurrentTree] = useState<string>(tree?.description ? tree?.description : '');

    const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

    const editCurrentNode = () => {
        setCurrentTree((prevTree) => {
            if (!prevTree) {
                return prevTree;
            }
            return {
                ...prevTree,
                nodes: prevTree.nodes.map((node) =>
                    node.id === currentNode?.id
                        ? {...node, title: nameCurrentNode, description: descriptionCurrentNode}
                        : node
                ),
            };
        });
    };

    const editCurrentTree = () => {
        setCurrentTree((prevTree) => {
            if (!prevTree) {
                return prevTree;
            }
            return {
                ...prevTree,
                title: titleCurrentTree,
                description: descriptionCurrentTree,
            };
        });
    };

    // Helper to add a node at the same level as a target node (by id), or at root if no target
    const handleCreateNode = (treeNodeData: TreeNodeInterface) => {
        setCurrentTree(prevTree => {
            if (!prevTree) return prevTree;
            const newNode = {
                title: treeNodeData.title,
                description: treeNodeData.description,
                type: treeNodeData.type,
                depth: treeNodeData.depth,
                children: treeNodeData.children,
            };
            return {
                ...prevTree,
                nodes: [...prevTree.nodes, newNode],
            };
        });
    };

    // Helper to recursively remove a node by id
    const removeNodeById = (nodes: any[], nodeId: number): any[] => {
        return nodes
            .filter(node => node.id !== nodeId)
            .map(node => ({
                ...node,
                children: node.children ? removeNodeById(node.children, nodeId) : []
            }));
    };

    const handleDeleteNode = () => {
        if (!currentNode) return;
        setCurrentTree(prevTree => {
            if (!prevTree) return prevTree;
            return {
                ...prevTree,
                nodes: removeNodeById(prevTree.nodes, currentNode?.id)
            };
        });
        setCurrentNode(null);
        setIsOpenDeleteNodeModal(false);
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
                    <EditButton
                        onClickAdd={() => setIsOpenCreateTreeNodeModal(true)}
                        onClickEdit={() => setIsOpenEditNodeModal(true)}
                        onClickDelete={() => setIsOpenDeleteNodeModal(true)}
                    />
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
                    setNameCurrentNode(node?.title)
                    setDescriptionCurrentNode(node?.description)
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
                <EditButton
                    onClickAdd={() => setIsOpenCreateTreeNodeModal(true)}
                    onClickEdit={() => setIsOpenEditTreeModal(true)}
                    onClickDelete={() => setIsOpenDeleteTreeModal(true)}
                    marginRight={'32px'} background={'#F5F5F5'}/>
            </Flex>
        )
    }

    const getLeftSideBar = () => {
        return <LeftSideBar>
            <TreeTitle id="tree-title">{treeTitle()}</TreeTitle>
            {currentTree?.nodes.length !== 0 ?
                <TreeView ariaLabelledBy="tree-title">
                    {currentTree?.nodes.map(child => renderTree(child))}
                </TreeView>
                :
                <AddTreeNodeButtonWrapper>
                    <IconButton
                        className={'add-tree-node-button'}
                        icon={<AddIcon/>}
                        onClick={() => setIsOpenCreateTreeNodeModal(true)}>
                        Add Tree Node
                    </IconButton>
                </AddTreeNodeButtonWrapper>
            }
        </LeftSideBar>
    }

    const updateCurrentTree: () => void = () => {
        updateTree(currentTree).then(response => {
                setCurrentTree(response)
                setIsShowNotification(true);
            }
        );
    }

    const deleteCurrentTree: () => void = () => {
        deleteTreeById(currentTree?.id).then(() => {
            navigate('/home');
        })
    }

    return (
        <>
            {/* isOpenEditModal */}
            {isOpenEditNodeModal && (
                <EditModal isOpen={isOpenEditNodeModal}
                           handleOnCLose={() => setIsOpenEditNodeModal(false)}
                           onSave={editCurrentNode}
                           nameNode={nameCurrentNode}
                           editNameNode={(value: string) => setNameCurrentNode(value)}
                           descriptionNode={descriptionCurrentNode}
                           editDescriptionNode={(value: string) => setDescriptionCurrentNode(value)}
                />)
            }
            {isOpenEditTreeModal && (
                <EditModal isOpen={isOpenEditTreeModal}
                           handleOnCLose={() => setIsOpenEditTreeModal(false)}
                           onSave={editCurrentTree}
                           titleTree={titleCurrentTree}
                           editTitleTree={(value: string) => setTitleCurrentTree(value)}
                           descriptionTree={descriptionCurrentTree}
                           editDescriptionTree={(value: string) => setDescriptionCurrentTree(value)}
                />)
            }
            {isOpenDeleteNodeModal && (
                <DeleteModal isOpen={isOpenDeleteNodeModal}
                             handleOnCLose={() => setIsOpenDeleteNodeModal(false)}
                             onDelete={handleDeleteNode}/>)
            }

            {/* isOpenDeleteModal */}
            {isOpenDeleteTreeModal && (
                <DeleteModal isNodeDelete={false}
                             isOpen={isOpenDeleteTreeModal}
                             handleOnCLose={() => setIsOpenDeleteTreeModal(false)}
                             onDelete={() => deleteCurrentTree()}/>)
            }

            {/* isOpenCreateModal */}
            {isOpenCreateTreeNodeModal && (
                <CreateTreeNodeModal
                    isOpen={isOpenCreateTreeNodeModal}
                    handleOnCLose={() => setIsOpenCreateTreeNodeModal(false)}
                    onCreateNode={handleCreateNode}
                />)
            }
            {isShowNotification && (<ToastNotification isSuccess text={'Tree was updated!'}
                                                       onDismiss={() => setIsShowNotification(false)}/>)}
            <TreeHeader onSave={() => updateCurrentTree()} isDisabledSaveButton={false}/>
            <TreeViewComponentStyled>
                {getLeftSideBar()}
                <TreeNodeContent>
                    {!!currentNode
                        ?
                        <>
                            <TreeNodeCard treeNode={currentNode}/>
                            <TreeNodeSettingsContent
                                onCreateNewTreeNode={() => setIsOpenCreateTreeNodeModal(true)}
                                onEditNameAndDescription={() => setIsOpenEditNodeModal(true)}
                                onDelete={() => setIsOpenDeleteNodeModal(true)}/>
                        </>
                        : <TreeNodeEmptyCard/>}
                </TreeNodeContent>
            </TreeViewComponentStyled>
        </>
    );
};