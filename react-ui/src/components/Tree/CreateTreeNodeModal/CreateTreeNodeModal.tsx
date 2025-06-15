import React, {useEffect, useState} from 'react';
import {Input, Modal, Select, Spacer} from "react-magma-dom";
import {NodeType} from "../../../interfaces/NodeType.ts";
import {getAllNodeTypes} from "../../../services/treeNodeService.ts";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {SelectWrapper} from "../CreateTreeModal/CreateTreeModalStyled.ts";
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";

interface CreateTreeNodeModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
    onCreateNode: (treeNode: TreeNodeInterface) => void;
}

export const CreateTreeNodeModal = (props: CreateTreeNodeModalProps) => {
    const {isOpen, handleOnCLose, onCreateNode} = props;

    const [titleTreeNode, setTitleTreeNode] = React.useState('');
    const [descriptionTreeNode, setDescriptionTreeNode] = React.useState('');

    const [allNodeTypes, setAllNodeTypes] = useState<NodeType[]>([]);
    const [selectedNodeType, setSelectedNodeType] = useState<NodeType | null>(null);

    const isDisabledSaveButton: boolean = titleTreeNode.length === 0 || descriptionTreeNode.length === 0 || selectedNodeType === null;

    useEffect(() => {
        getAllNodeTypes().then((response => setAllNodeTypes(response)));
    }, []);

    const handleSave = () => {
        if (!isDisabledSaveButton && selectedNodeType) {
            onCreateNode({
                title: titleTreeNode,
                description: descriptionTreeNode,
                type: selectedNodeType,
                depth: 1,
                children: []
            });
            setTitleTreeNode('');
            setDescriptionTreeNode('');
            setSelectedNodeType(null);
            handleOnCLose();
        }
    };

    return (
        <Modal header={'Create new Tree node'} isOpen={isOpen} onClose={handleOnCLose}>
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
                    items={allNodeTypes}
                    onSelectedItemChange={change => setSelectedNodeType(change.selectedItem ?? {} as NodeType)}
                />
            </SelectWrapper>
            <ModalFooterButtons
                handleOnCLose={handleOnCLose}
                saveButtonDisabled={isDisabledSaveButton}
                onSave={handleSave}
            />
        </Modal>
    );
};

