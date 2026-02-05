import React, {useState} from 'react';
import {Input, Modal, Select, Spacer} from "react-magma-dom";
import {NodeTypeInterface} from "../../../interfaces/NodeTypeInterface.ts";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {SelectWrapper} from "../TreeModal/TreeModalStyled.ts";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";
import {BaseModalProps} from "../../General/BaseModal.tsx";
import {useGetAllTreeNodeTypesQuery} from "../../../store/api/apiSlice.ts";

interface CreateTreeNodeModalProps extends BaseModalProps {
    currentTreeNode?: TreeNodeInterface;
    onCreateNode?: (treeNode: TreeNodeInterface) => void;
    onUpdateNode?: (treeNode: TreeNodeInterface) => void;
}

export const TreeNodeModal = (props: CreateTreeNodeModalProps) => {
    const {isOpen, header, currentTreeNode, onClose, onCreateNode, onUpdateNode,} = props;

    const [titleTreeNode, setTitleTreeNode] = useState<string>(currentTreeNode?.title ?? '');
    const [descriptionTreeNode, setDescriptionTreeNode] = useState(currentTreeNode?.description ?? '');
    const [nodeType, setNodeType] = useState<NodeTypeInterface | null>(currentTreeNode?.type ?? null);
    const isDisabledSaveButton: boolean = titleTreeNode.length === 0 || descriptionTreeNode.length === 0 || nodeType === null;
    const { data: allNodeTypes } = useGetAllTreeNodeTypesQuery();

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
                    items={allNodeTypes ?? []}
                    onSelectedItemChange={change => {
                        const value = change.selectedItem;
                        if (value && Object.values(NodeTypeInterface).includes(value as NodeTypeInterface)) {
                            setNodeType(value as NodeTypeInterface);
                        } else {
                            setNodeType(null);
                         }
                    }}
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
