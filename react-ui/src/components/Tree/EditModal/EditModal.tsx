import React, {useEffect, useState} from 'react';
import {Input, Spacer, Textarea} from "react-magma-dom";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {BaseModal, BaseModalProps} from '../../General/BaseModal';

interface EditModalProps extends BaseModalProps{
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
        isOpen, onClose, onSave, header,
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
        onClose();
    };

    return (
        <BaseModal header={header} isOpen={isOpen} onClose={onClose}>
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
                handleOnCLose={onClose}
                saveButtonDisabled={isInputEmpty}
                onSave={saveData}
            />
        </BaseModal>
    );
};