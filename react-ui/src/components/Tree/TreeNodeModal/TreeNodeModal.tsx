import React, {useEffect, useState} from 'react';
import {Input, Modal, Select, Spacer} from "react-magma-dom";
import {NodeType} from "../../../interfaces/NodeType.ts";
import {getAllNodeTypes} from "../../../services/treeNodeService.ts";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {SelectWrapper} from "../TreeModal/TreeModalStyled.ts";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";
import {BaseModalProps} from "../../General/BaseModal.tsx";

interface CreateTreeNodeModalProps extends BaseModalProps {
    currentTreeNode?: TreeNodeInterface | null;
    onCreateNode?: (treeNode: TreeNodeInterface) => void;
    onUpdateNode?: (treeNode: TreeNodeInterface) => void;
}

export const TreeNodeModal = (props: CreateTreeNodeModalProps) => {
    const {isOpen, header, currentTreeNode, onClose, onCreateNode, onUpdateNode,} = props;

    const [titleTreeNode, setTitleTreeNode] = useState<string>(currentTreeNode?.title ?? '');
    const [descriptionTreeNode, setDescriptionTreeNode] = useState(currentTreeNode?.description ?? '');
    const [nodeType, setNodeType] = useState<NodeType | null>(currentTreeNode?.type ?? null);

    const [allNodeTypes, setAllNodeTypes] = useState<NodeType[]>([]);
    const isDisabledSaveButton: boolean = titleTreeNode.length === 0 || descriptionTreeNode.length === 0 || nodeType === null;

    useEffect(() => {
        getAllNodeTypes().then((response => setAllNodeTypes(response)));
    }, []);

    const createNewTreeNode = () => {
        if (!isDisabledSaveButton && nodeType && onCreateNode) {
            onCreateNode({
                title: titleTreeNode,
                description: descriptionTreeNode,
                type: nodeType,
                depth: 1,
                children: []
            });

            onClose();
        }
    };

    const updateTreeNode = () => {
        if (!currentTreeNode || !onUpdateNode || !nodeType) return;

        const updatedTreeNode: TreeNodeInterface = {
            ...currentTreeNode,
            title: titleTreeNode,
            description: descriptionTreeNode,
            type: nodeType,
        };

        onUpdateNode(updatedTreeNode);
        onClose();
    };

    return (
        <Modal header={header} isOpen={isOpen} onClose={onClose}>
            <Input
                labelText={'Title*'}
                required
                value={titleTreeNode}
                onChange={e => setTitleTreeNode(e.target.value)}
                maxCount={255}
            />
            <Spacer size={20}/>
            <Input
                labelText={'Description*'}
                required
                value={descriptionTreeNode}
                onChange={e => setDescriptionTreeNode(e.target.value)}
                maxCount={255}
            />
            <SelectWrapper>
                <Select
                    labelText={'Node Type*'}
                    selectedItem={nodeType}
                    items={allNodeTypes}
                    onSelectedItemChange={change => setNodeType(change.selectedItem ?? {} as NodeType)}
                />
            </SelectWrapper>
            <ModalFooterButtons
                handleOnCLose={onClose}
                saveButtonDisabled={isDisabledSaveButton}
                onSave={onCreateNode ? createNewTreeNode : updateTreeNode}
            />
        </Modal>
    );
};
