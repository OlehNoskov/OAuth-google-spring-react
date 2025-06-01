import React, {useEffect, useState} from 'react';
import {Input, Modal, Spacer, Textarea} from "react-magma-dom";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";

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

    const isNodeEdit =
        typeof nameNode !== undefined &&
        typeof editNameNode === 'function' &&
        typeof editDescriptionNode === 'function';

    const [isInputEmpty, setIsInputEmpty] = useState(false);

    useEffect(() => {
        if (isNodeEdit) {
            setIsInputEmpty(!nameNode || !descriptionNode);
        } else {
            setIsInputEmpty(!titleTree || !descriptionTree);
        }
    }, [isNodeEdit, nameNode, descriptionNode, titleTree, descriptionTree]);

    const saveData = () => {
        onSave();
        handleOnCLose();
    };

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
            <ModalFooterButtons
                handleOnCLose={handleOnCLose}
                saveButtonDisabled={isInputEmpty}
                onSave={saveData}
            />
        </Modal>
    );
};