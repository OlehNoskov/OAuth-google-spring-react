import React from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment} from "react-magma-dom";
import {BaseModal, BaseModalProps} from '../../General/BaseModal';

interface DeleteModalProps extends BaseModalProps {
    onDelete: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
    const {isOpen, onClose, onDelete, header} = props;

    return (
        <BaseModal
            header={header}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ButtonGroup alignment={ButtonGroupAlignment.right}>
                <Button onClick={onClose} color={ButtonColor.secondary}>Cancel</Button>
                <Button onClick={onDelete} color={ButtonColor.primary}>Delete</Button>
            </ButtonGroup>
        </BaseModal>
    );
};