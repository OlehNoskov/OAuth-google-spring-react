import React, {useState, useEffect} from 'react';
import {
    AlertVariant,
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
import {initialStateTreeInterface, TreeInterface} from "../../../interfaces/TreeInterface.ts";
import {
    AddTreeNodeButtonWrapper,
    LeftSideBar,
    TreeNodeContent,
    TreeTitle,
    TreeViewComponentStyled
} from "./TreeViewComponentStyled.ts";
import {NodeTypeInterface} from "../../../interfaces/NodeTypeInterface.ts";
import {AddIcon, FlagIcon, FolderIcon, LinkIcon} from "react-magma-icons";
import {EditButton} from "../../General/EditButton.tsx";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";
import {TreeNodeCard} from "../TreeNodeCard/TreeNodeCard.tsx";
import {TreeNodeSettingsContent} from "../TreeNodeSettings/TreeNodeSettingsContent.tsx";
import {DeleteModal} from "../DeleteModal/DeleteModal.tsx";
import {TreeNodeEmptyCard} from "../TreeNodeEmptyCard/TreeNodeEmptyCard.tsx";
import {TreeHeader} from "../TreeHeader/TreeHeader.tsx";
import {deleteTreeById, getTreeById, updateTree} from "../../../services/treeService.ts";
import {ToastNotification} from "../../General/ToastNotification.tsx";
import {useNavigate} from "react-router-dom";
import {TreeNodeModal} from "../TreeNodeModal/TreeNodeModal.tsx";
import {TreeModal} from "../TreeModal/TreeModal.tsx";

import { v4 as uuidv4 } from 'uuid';

interface TreeViewComponentProps {
    treeId: string | undefined;
}

export const TreeViewComponent: React.FC<TreeViewComponentProps> = (props: TreeViewComponentProps) => {
    const navigate = useNavigate();

    const [currentTree, setCurrentTree] = useState<TreeInterface>(initialStateTreeInterface);
    const [currentNode, setCurrentNode] = useState<TreeNodeInterface | null>(null);

    const [isOpenEditNodeModal, setIsOpenEditNodeModal] = useState<boolean>(false);
    const [isOpenDeleteNodeModal, setIsOpenDeleteNodeModal] = useState<boolean>(false);

    const [isOpenCreateTreeNodeModal, setIsOpenCreateTreeNodeModal] = useState<boolean>(false);
    const [isOpenEditTreeModal, setIsOpenEditTreeModal] = useState<boolean>(false);
    const [isOpenDeleteTreeModal, setIsOpenDeleteTreeModal] = useState<boolean>(false);

    const [isShowTreeNotification, setIsShowTreeNotification] = useState<boolean>(false);
    const [isShowMaxDepthExceeded, setIsShowMaxDepthExceeded] = useState<boolean>(false);

    useEffect(() => {
        getTreeById(props.treeId).then(response => {
            setCurrentTree(response);
        });
    }, []);

    const handleCreateNode = (treeNodeData: TreeNodeInterface) => {
        setCurrentTree(prevTree => {
            if (!prevTree) return prevTree;
            const newNode = {
                title: treeNodeData.title,
                description: treeNodeData.description,
                type: treeNodeData.type,
                depth: treeNodeData.depth,
                children: [],
            };

            // Helper to insert node as a child of a matching node
            const insertAsChild = (nodes: TreeNodeInterface[], parentId: string | number): TreeNodeInterface[] => {
                return nodes.map(node => {
                    if (String(node.id) === String(parentId)) {
                        if (node.depth >= 5) {
                            setIsShowMaxDepthExceeded(true);
                            return node;
                        }
                        const childNode = {
                            ...newNode,
                            depth: node.depth + 1,
                        };

                        return {
                            ...node,
                            children: [...(node.children || []), childNode],
                        };
                    } else if (node.children) {
                        return {
                            ...node,
                            children: insertAsChild(node.children, parentId),
                        };
                    }
                    return node;
                });
            };

            if (currentNode) {
                const updatedNodes = insertAsChild(prevTree.nodes, currentNode?.id);
                return {
                    ...prevTree,
                    nodes: updatedNodes,
                };
            } else {
                return {
                    ...prevTree,
                    nodes: [...prevTree.nodes, {...newNode, depth: 1}],
                };
            }
        });
    };


    // Helper to recursively remove a node by id
    const removeNodeById = (nodes: any[], nodeId: number | undefined): any[] => {
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
                nodes: removeNodeById(prevTree.nodes, currentNode.id)
            };
        });
        setCurrentNode(null);
        setIsOpenDeleteNodeModal(false);
    };

    // Helper to recursively update a node by id
    const updateNodeById = (nodes: TreeNodeInterface[], updatedNode: TreeNodeInterface): TreeNodeInterface[] => {
        return nodes.map(node => {
            if (node.id === updatedNode.id) {
                return {...node, ...updatedNode};
            }
            return {
                ...node,
                children: node.children ? updateNodeById(node.children, updatedNode) : []
            };
        });
    };

    const getFolderIcon = (node: TreeNodeInterface) => {
        switch (node.type) {
            case NodeTypeInterface.FLAG:
                return <FlagIcon aria-hidden/>;
            case NodeTypeInterface.LINK:
                return <LinkIcon aria-hidden/>;
            default:
                return <FolderIcon aria-hidden/>;
        }
    }

    const treeItemLabel = (node: TreeNodeInterface) => {
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

    const renderTree = (node: TreeNodeInterface) => {
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
                itemId={String(node.id) || uuidv4()} // Ensure unique itemId
                icon={getFolderIcon(node)}
                label={treeItemLabel(node)}
            >
                {node.children && node.children.length > 0 &&
                    node.children.map((child: any) => renderTree(child))
                }
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
                setIsShowTreeNotification(true);
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
            {isOpenCreateTreeNodeModal && (
                <TreeNodeModal
                    header={'Add Tree node'}
                    isOpen={isOpenCreateTreeNodeModal}
                    onClose={() => setIsOpenCreateTreeNodeModal(false)}
                    onCreateNode={handleCreateNode}
                />)
            }

            {/* isOpenEditModal */}
            {isOpenEditNodeModal && (
                <TreeNodeModal
                    header={'Edit Tree node'}
                    currentTreeNode={currentNode}
                    isOpen={isOpenEditNodeModal}
                    onClose={() => setIsOpenEditNodeModal(false)}
                    onUpdateNode={(value: TreeNodeInterface) => {
                        setCurrentTree(prevTree => {
                            if (!prevTree) return prevTree;
                            return {
                                ...prevTree,
                                nodes: updateNodeById(prevTree.nodes, value)
                            };
                        });
                        setCurrentNode(value);
                        setIsOpenEditNodeModal(false);
                    }}
                />)
            }
            {isOpenEditTreeModal && (
                <TreeModal
                    header={'Edit tree'}
                    isOpen={isOpenEditTreeModal}
                    onClose={() => setIsOpenEditTreeModal(false)}
                    currentTree={currentTree}
                    onSave={(value: TreeInterface) => setCurrentTree(value)}
                />)
            }
            {/* isOpenDeleteModal */}
            {isOpenDeleteNodeModal && (
                <DeleteModal
                    header={"Are you sure that you want to delete this node?"}
                    isOpen={isOpenDeleteNodeModal}
                    onClose={() => setIsOpenDeleteNodeModal(false)}
                    onDelete={handleDeleteNode}/>)
            }
            {isOpenDeleteTreeModal && (
                <DeleteModal
                    header={"Are you sure that you want to delete this tree?"}
                    isOpen={isOpenDeleteTreeModal}
                    onClose={() => setIsOpenDeleteTreeModal(false)}
                    onDelete={() => deleteCurrentTree()}/>)
            }
            {isShowTreeNotification && (
                <ToastNotification toastVariant={AlertVariant.success} text={`Tree was updated!`}
                                   onDismiss={() => setIsShowTreeNotification(false)}/>)}

            {isShowMaxDepthExceeded && (<ToastNotification toastVariant={AlertVariant.warning}
                                                           text={`Max depth for tree node has been exceeded!`}
                                                           onDismiss={() => setIsShowMaxDepthExceeded(false)}/>)}

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