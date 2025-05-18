import React from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment, Input, Modal, Spacer, Textarea} from "react-magma-dom";

interface EditModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
    onSave: () => void;

    // Node editing
    nameNode?: string;
    editNameNode?: (nameNode: string) => void;
    descriptionNode?: string;
    editDescriptionNode?: (descriptionNode: string) => void;

    // Tree editing
    titleTree?: string;
    editTitleTree?: (titleTree: string) => void;
    descriptionTree?: string;
    editDescriptionTree?: (descriptionTree: string) => void;
}

export const EditModal = (props: EditModalProps) => {
    const {
        isOpen, handleOnCLose, onSave,
        nameNode, editNameNode, descriptionNode, editDescriptionNode,
        titleTree, editTitleTree, descriptionTree, editDescriptionTree
    } = props;

    const saveData = () => {
        onSave();
        handleOnCLose();
    };

    const isNodeEdit =
        typeof nameNode !== undefined &&
        typeof nameNode !== undefined &&
        typeof editNameNode === 'function' &&
        typeof editDescriptionNode === 'function';

    return (
        <Modal header={isNodeEdit ? "Edit node" : "Edit tree"} isOpen={isOpen} onClose={handleOnCLose}>
            <Input
                labelText={isNodeEdit ? "Name" : "Title"}
                required
                value={isNodeEdit ? nameNode : titleTree}
                onChange={e => isNodeEdit
                    ? editNameNode && editNameNode(e.target.value)
                    : editTitleTree && editTitleTree(e.target.value)
                }
                maxCount={255}
            />
            <Spacer size={20}/>
            <Textarea
                labelText={"Description"}
                value={isNodeEdit ? descriptionNode : descriptionTree}
                onChange={e => isNodeEdit
                    ? editDescriptionNode && editDescriptionNode(e.target.value)
                    : editDescriptionTree && editDescriptionTree(e.target.value)
                }
                maxCount={1000}
            />
            <ButtonGroup alignment={ButtonGroupAlignment.right}>
                <Button onClick={handleOnCLose} color={ButtonColor.secondary}>Cancel</Button>
                <Button onClick={saveData} color={ButtonColor.primary}>Save</Button>
            </ButtonGroup>
        </Modal>
    );
};