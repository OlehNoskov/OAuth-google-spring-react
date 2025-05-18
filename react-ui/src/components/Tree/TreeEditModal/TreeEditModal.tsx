import React, {useState} from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment, Input, Modal, Spacer, Textarea} from "react-magma-dom";

interface TreeEditModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
    onSave: () => void;

    nameNode: string;
    editNameNode: (nameNode: string) => void;
    descriptionNode: string;
    editDescriptionNode: (descriptionNode: string) => void;
}

export const TreeEditModal = (props: TreeEditModalProps) => {
    const {isOpen, handleOnCLose, onSave, nameNode, descriptionNode, editNameNode, editDescriptionNode} = props;

    const saveData = () => {
        onSave();
        handleOnCLose();
    }

    return (
        <Modal header="Edit name and description" isOpen={isOpen} onClose={handleOnCLose}>
            <Input
                labelText="Name"
                required
                value={nameNode}
                onChange={(e) => editNameNode(e.target.value)}
                maxCount={255}
            />
            <Spacer size={20}/>
            <Textarea
                labelText="Description"
                value={descriptionNode}
                onChange={(e) => editDescriptionNode(e.target.value)}
                maxCount={1000}
            />
            <ButtonGroup alignment={ButtonGroupAlignment.right}>
                <Button onClick={handleOnCLose} color={ButtonColor.secondary}>Cancel</Button>
                <Button onClick={saveData} color={ButtonColor.primary}>Save</Button>
            </ButtonGroup>
        </Modal>
    );
};
